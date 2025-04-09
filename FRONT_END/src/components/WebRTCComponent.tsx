// import TopBar from "./TopBar";
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client"
// import Peer from "peerjs";

// const socket = io("http://localhost:8000");

// const WebRTCComponent = () => {

//     const [peerId, setPeerId] = useState("");
//     const myVideoRef: any = useRef();
//     const peerVideoRef: any = useRef();
//     const peerInstance: any = useRef();

//     useEffect(() => {

//         const peer = new Peer();

//         peer.on("open", (id) => {
//             console.log(id, 'this is for the open id for video');
//             setPeerId(id);
//             socket.emit("join-room", "room1", id);
//         });

//         peer.on("call", (call) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//                 myVideoRef.current.srcObject = stream
//                 call.answer();
//                 call.on("stream", (useVideoStream) => {
//                     peerVideoRef.current.srcObject = useVideoStream
//                 });
//             });
//         });

//         socket.on("user-connected", (userId) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//                 myVideoRef.current.srcObject = stream
//                 const call = peer.call(userId, stream);
//                 call.on("stream", (userVideoStream) => {
//                     peerVideoRef.current.srcObject = userVideoStream
//                 });
//             });
//         });

//         peerInstance.current = peer;


//         // cancel process
//         // ====================
//         return () => {
//             if (peerInstance.current) {
//                 peerInstance.current.destroy();  // Close PeerJS connection
//             }

//             socket.off("user-connected"); // Remove event listeners
//             socket.disconnect(); // Disconnect from WebSocket

//             // Stop the user's video stream
//             if (myVideoRef.current?.srcObject) {
//                 let tracks = myVideoRef.current.srcObject.getTracks();
//                 tracks.forEach((track: any) => track.stop());
//             }

//             if (peerVideoRef.current?.srcObject) {
//                 let tracks = peerVideoRef.current.srcObject.getTracks();
//                 tracks.forEach((track: any) => track.stop());
//             }

//             console.log("WebRTC connection closed.");
//         }

//     }, [])

//     return (
//         <>
//             <TopBar />
//             <div className="p-4">
//                 <div className="bg-[#181A22] h-[480px] w-[1230px] rounded-lg">
//                     <h3 className="text-white">Your Peer ID: {peerId}</h3>
//                     <video ref={myVideoRef} autoPlay muted className="w-56 bg-white" ></video>
//                     <video ref={peerVideoRef} autoPlay className="w-56 bg-white"></video>

//                     <button
//                         onClick={() => {
//                             if (peerInstance.current) {
//                                 peerInstance.current.destroy();
//                             }
//                             socket.disconnect();

//                             if (myVideoRef.current?.srcObject) {
//                                 myVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop());
//                             }
//                             if (peerVideoRef.current?.srcObject) {
//                                 peerVideoRef.current.srcObject.getTracks().forEach((track: any)=> track.stop());
//                             }

//                             console.log("Manually disconnected WebRTC");
//                         }}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//                     >
//                         Disconnect
//                     </button>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default WebRTCComponent;


import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
    transports: ["websocket"],
});

const WebRTCComponent = () => {
    const localVideoRef: any = useRef(null);
    const remoteVideoRef: any = useRef(null);
    const peerConnection: any = useRef<RTCPeerConnection | null>(null);

    // const [isInRoom, setIsInRoom] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const { scheduleId } = useParams<{ scheduleId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!scheduleId) return;

        socket.emit("join-room", { scheduleId });

        socket.on("waiting", (message) => {
            console.log("Waiting for another participant...", message);
            setIsWaiting(true);
        });

        socket.on("ready", () => {
            console.log("Both users are in the room. Ready to start call.");
            setIsWaiting(false);
            initializePeerConnection();
        });

        socket.on("offer", async (data: any) => {
            console.log("Received offer:", data);
            if (!peerConnection.current) initializePeerConnection();

            await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.current!.createAnswer();
            await peerConnection.current!.setLocalDescription(answer);

            socket.emit("answer", { answer, scheduleId });
        });

        socket.on("answer", (data) => {
            console.log("Received Answer", data);
            if (peerConnection.current) {
                peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
        });

        socket.on("ice-candidate", (data) => {
            console.log("Received ICE Candidate", data);
            if (peerConnection.current) {
                peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        });

        return () => {
            console.log("Disconnecting user...");
            socket.emit("leave-room", { scheduleId });

            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
            }

            socket.off("waiting");
            socket.off("ready");
            socket.off("offer");
            socket.off("answer");
            socket.off("ice-candidate");
        };
    }, [scheduleId]);

    const initializePeerConnection = () => {
        if (peerConnection.current) return; // Prevent multiple initializations

        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach(track => peerConnection.current!.addTrack(track, stream));
            })
            .catch(error => console.error("Error accessing media devices.", error));

        peerConnection.current.onicecandidate = (event: any) => {
            if (event.candidate) {
                socket.emit("ice-candidate", { candidate: event.candidate, scheduleId });
            }
        };

        peerConnection.current.ontrack = (event: any) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };
    };

    const createOffer = async () => {
        if (!peerConnection.current) initializePeerConnection();
        const offer = await peerConnection.current!.createOffer();
        await peerConnection.current!.setLocalDescription(offer);
        console.log("Sending Offer for Schedule ID:", scheduleId);
        socket.emit("offer", { offer, scheduleId });
        setIsConnected(true);
    };

    const handleToDisconnect = async () => {
        socket.emit("leave-room", { scheduleId });
        setIsConnected(false);
        // setIsInRoom(false);

        if (localVideoRef.current) {
            localVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop());
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop());
        }

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        if (location.pathname.includes("/interviewer")) {
            navigate(`/interviewer/scheduled`);
        } else if (location.pathname.includes("/candidate")) {
            navigate(`/candidate/outsourced-interviews`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* <h2 className="text-2xl font-bold mb-4">WebRTC Video Call</h2> */}
            {isWaiting && <p className="text-gray-600">Waiting for another user...</p>}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4 bg-white shadow-lg rounded-lg">
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    className="w-full md:w-1/2 max-w-xs border-2 border-black rounded-lg"
                />
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full md:w-1/2 max-w-xs border-2 border-black rounded-lg"
                />
            </div>
            <div className="mt-6 flex gap-4">
                <button
                    onClick={createOffer}
                    disabled={isConnected || isWaiting}
                    className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                    Start Call
                </button>
                <button
                    onClick={handleToDisconnect}
                    className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                    Disconnect
                </button>
            </div>
        </div>
    );
};

export default WebRTCComponent;
