import SideBar from "../../../components/Candidate/SideBar";
import toast, { Toaster } from "react-hot-toast";
import { fetchCandidateProfileData, TakeThePremium } from "../../../Services/candidateService";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaCheck, FaCheckDouble, FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import { ICandidatePremiumApiResponse, ICandidateProfileApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";
import { ICandidate, IGroup, IGroupMessage } from "../../../Interface/candidateInterfaces/interface";

// const socket = io('ws://localhost:6060', { transports: ['websocket'] }); // Use correct server URL
// const socket = io('ws://api.muflih.online:6060', { transports: ['websocket'] });


const socket = io("wss://api.muflih.online:6060/chat", {
    transports: ['websocket'],
    withCredentials: true,
  });
  
  
const CandidateChooseCommunity = () => {

    const [candidateData, setCandidateData] = useState<ICandidate | null>(null)

    const [groupName, setGroupName] = useState<string>("")
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>("")
    const [messages, setMessages] = useState<IGroupMessage[]>([])
    const [message, setMessage] = useState<string>("");
    const [isModal, setIsModal] = useState<boolean>(false);
    const [chat, setChat] = useState<boolean>(false);

    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {
        const takeProfileData = async () => {
            try {
                const response: ICandidateProfileApiResponse = await fetchCandidateProfileData();
                if (response.success) {
                    setCandidateData(response.candidateData);
                } else {
                    console.log("Failed to fetch candidate profile data.");
                }
            } catch (error: unknown) {
                error instanceof Error ? toast.error(error.message) : toast.error("An unknown error occurred.");
            }
        };
        takeProfileData();


        socket.emit("getGroups");

        socket.on("groupList", (group: IGroup[]) => {
            setGroups(group);
        });

        socket.on('groupCreated', (group: IGroup) => {
            setGroups((prev: IGroup[]) => [...prev, group]);
        });

        socket.on("groupCreated", (newGroup: IGroup) => {
            console.log(`New Group Created: ${newGroup.name}`);
            // setGroups((prevGroups: any) => [...prevGroups, newGroup]);
        });

        socket.on("joinedGroup", (updatedGroup: IGroup) => {
            console.log("User joined group:", updatedGroup);
            setGroups((prevGroups: IGroup[]) => {
                return prevGroups.map((group: IGroup) =>
                    group.name === updatedGroup.name ? updatedGroup : group
                );
            });
        });

        socket.on("messageHistory", (data: IGroupMessage[]) => {
            console.log(data);
            setMessages(data);
        })

        socket.on("receiveMessage", (newMessage: IGroupMessage) => {
            console.log(message, 'this is that message')
            setMessages((prevMessages: IGroupMessage[]) => [...prevMessages, newMessage]);
        });


        return () => {
            socket.off("groupList");
            socket.off("groupCreated");
            socket.off("messageHistory");
            socket.off("receiveMessage");
            socket.off("joinedGroup");
        };


    }, []);


    const handleToSubscibe = async (amount: number, duration: string): Promise<void> => {
        try {
            const premiumData = {
                amount: amount,
                duration: duration
            }
            const paymentResponse: ICandidatePremiumApiResponse = await TakeThePremium(premiumData);
            if (paymentResponse.success) {
                if (paymentResponse?.session?.url) {
                    window.location.href = paymentResponse.session.url;
                } else {
                    toast.error(paymentResponse.message);
                }
            } else {
                toast.error("Payemnt is not woriking");
            }
        } catch (error: unknown) {
            error instanceof Error ? toast.error(error.message) : toast.error("An unknown error occurred.");
        }
    }


    const handleToCreateCommunity = (): void => {
        setIsModal(true);
    }

    const createGroup = (): void => {
        if (groupName) {
            if (groupName.trim() === "") {
                toast.error("Please Enter GroupName");
                return;
            };
            console.log(groupName, 'this is group name')
            socket.emit("createGroup", candidateData?._id, groupName); // Send group name to backend
            toast.success("group created");
            setGroupName("");
            setIsModal(false);
        }
    };

    const joinGroup = (groupName: string): void => {
        console.log(candidateData?._id, 'this is caniddate id');
        console.log(groupName, 'this is join group name');
        socket.emit("joinMember", { candidateId: candidateData?._id?.toString(), groupName: groupName })
    }

    const chooseToCommunity = (groupName: string): void => {
        console.log(groupName, 'choose');
        setSelectedGroup(groupName);
        socket.emit("messageHistory", groupName);
        setChat(true);
    }

    const handleToSendMessage = (): void => {
        if (message.trim() === "") {
            toast.error("Please please type anything");
            return;
        };

        if (!selectedGroup) {
            toast.error("Please select a group first.");
            return;
        }
        console.log(message, selectedGroup, candidateData?._id, 'this is  send message');

        socket.emit("sendMessage", {
            candidateId: candidateData?._id,
            candidateName: candidateData?.name,
            message: message,
            groupName: selectedGroup
        });
        setMessage("");
    }


    return (
        <>
            <SideBar heading="Community">
                <Toaster position="top-right" reverseOrder={false} />

                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    {candidateData?.premium == false ? (
                        <div className="ml-7 w-[990px]">
                            <div>
                                <h1 className="text-center font-bold text-3xl">Choose Your Perfect Plan</h1>
                                <h3 className="text-center text-sm">Unlock your potential with our tailored subscription options.</h3>
                            </div>

                            <div className="flex justify-evenly mt-10">
                                <div className="bg-[#93d1ff] w-96 h-80">
                                    <div className="ml-5">
                                        <h1>min-pro</h1>
                                        <h1>299 / month</h1>
                                    </div>

                                    <div className="mt-14 ml-5">
                                        <h2>Perfect for getting started</h2>
                                        <ul className="mt-5">
                                            <li>Allow free users to book a certain number of mock interview slots per month.</li>
                                            <li>Receive basic feedback from interviewers without detailed analysis.</li>
                                            <li>Basic email support for technical issues.</li>
                                        </ul>
                                    </div>
                                    <div className="mt-5 flex justify-center">
                                        <button onClick={() => handleToSubscibe(299, "1 month")}>Subscribe</button>
                                    </div>
                                </div>


                                <div className="bg-[#93d1ff] w-96 h-80">
                                    <div className="ml-5">
                                        <h1>Pro</h1>
                                        <h1>499 / year</h1>
                                    </div>

                                    <div className="mt-14 ml-5">
                                        <h2>For serious learners and professionals</h2>
                                        <ul className="mt-5">
                                            <li>Access to dedicated chat rooms where premium members can discuss interview experiences and share tips</li>
                                            <li>Connect with other candidates who have attended similar interviews.</li>
                                            <li>Receive faster responses from customer support</li>
                                        </ul>
                                    </div>
                                    <div className="flex justify-center ">
                                        <button onClick={() => handleToSubscibe(499, "1 year")}>Subscribe</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex h-screen bg-gray-100">

                                <div className="w-1/4 bg-white p-4 shadow-md">
                                    <h2 className="text-lg font-bold mb-4">Community Chat</h2>
                                    <button className="bg-black text-white p-2 rounded-md mb-4" onClick={handleToCreateCommunity}>
                                        Create Community
                                    </button>

                                    <h3 className="text-md font-semibold mb-2">Available Groups</h3>
                                    <div className="space-y-3">
                                        {groups.map((group: any, index: number) => {
                                            const isMember = group.members.some(
                                                (member: any) => member.candidateId === candidateData?._id?.toString()
                                            );
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 ${isMember && "cursor-pointer"}`}
                                                    onClick={() => isMember && chooseToCommunity(group.name)}
                                                >
                                                    <FaUserCircle className={`text-2xl text-gray-600 ${!isMember && 'cursor-default opacity-50'}`} />
                                                    <span className={`${!isMember && 'cursor-default opacity-50'}`}>{group.name}</span>
                                                    {!isMember && (
                                                        <div className="ml-auto">
                                                            <button
                                                                className="bg-blue-500 text-white p-1 rounded-md"
                                                                onClick={(e) => { e.stopPropagation(); joinGroup(group.name); }}
                                                            >
                                                                Join
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Chat Section */}
                                {chat && (
                                    <div className="flex-1 flex flex-col">
                                        {/* Chat Header */}
                                        <div className="bg-white p-4 shadow-md flex items-center justify-between">
                                            <h2 className="text-lg font-bold">{selectedGroup}</h2>
                                            {/* <button className="text-sm text-gray-500">Logout</button> */}
                                        </div>

                                        {/* Chat Messages */}
                                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                            {messages.length > 0 ? (
                                                messages.map((msg: any, index: number) => {

                                                    const messageDate = moment(msg.timestamp);
                                                    const today = moment().startOf("day");
                                                    const yesterday = moment().subtract(1, "days").startOf("day");

                                                    let displayDate = "";
                                                    if (messageDate.isSame(today, "day")) {
                                                        displayDate = "Today";
                                                    } else if (messageDate.isSame(yesterday, "day")) {
                                                        displayDate = "Yesterday";
                                                    } else {
                                                        displayDate = messageDate.format("MMMM D, YYYY");
                                                    }
                                                    const formattedTime = messageDate.format("h:mm A");

                                                    return (
                                                        <div key={index} className="flex flex-col items-center">
                                                            {/* Show Date Separator */}
                                                            {(index === 0 || !moment(messages[index - 1].timestamp).isSame(messageDate, "day")) && (
                                                                <div className="text-xs text-gray-500 my-2 bg-gray-300 px-3 py-1 rounded-md">
                                                                    {displayDate}
                                                                </div>
                                                            )}

                                                            {/* Message Bubble */}
                                                            <div
                                                                className={`flex w-full ${msg.userName === candidateData?.name ? "justify-end" : "justify-start"}`}
                                                            >
                                                                <div
                                                                    className={`relative p-3 rounded-lg max-w-xs ${msg.userName === candidateData?.name ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                                                    onMouseEnter={() => setHovered(true)}
                                                                    onMouseLeave={() => setHovered(false)}
                                                                >
                                                                    <p className="text-sm font-semibold">
                                                                        {msg.userName === candidateData?.name ? "You" : msg.userName}
                                                                    </p>
                                                                    <p>{msg.text}</p>

                                                                    {/* Message Time & Tick Status */}
                                                                    <div className="flex items-center justify-end space-x-1 mt-1">
                                                                        <p className="text-xs text-gray-400">{formattedTime}</p>

                                                                        {/* Message Status Icons */}
                                                                        {msg.userName === candidateData?.name && (
                                                                            <>
                                                                                {msg.status === "sent" && <FaCheck className="text-gray-400 text-xs" />}
                                                                                {msg.status === "delivered" && <FaCheckDouble className="text-gray-500 text-xs" />}
                                                                                {msg.status === "read" && <FaCheckDouble className="text-blue-500 text-xs" />}
                                                                            </>
                                                                        )}
                                                                    </div>

                                                                    {/* Edit Button - Shown on Hover */}
                                                                    {hovered && msg.userName === candidateData?.name && (
                                                                        <button
                                                                            className="absolute top-2 right-2  text-black px-2 py-1 rounded "
                                                                        // onClick={() => setIsEdit(true)}
                                                                        >
                                                                            <MdModeEditOutline />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-gray-500 text-center">No messages yet.</p>
                                            )}
                                        </div>


                                        {/* Chat Input */}
                                        <div className="bg-white p-4 shadow-md flex items-center">
                                            <input
                                                type="text"
                                                name="message"
                                                placeholder="Send message"
                                                value={message}
                                                onChange={(event) => setMessage(event.target.value)}
                                                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleToSendMessage}
                                                className="ml-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                <IoSend className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}




                    {isModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                                <h2 className="text-lg font-bold mb-4 text-center">Create a New Group</h2>
                                <input
                                    type="text"
                                    placeholder="Enter your group name"
                                    name="groupName"
                                    value={groupName}
                                    onChange={(event) => setGroupName(event.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex justify-between mt-6">
                                    <button
                                        className="bg-yellow-700 text-white px-4 py-2 rounded-full hover:bg-yellow-800 transition"
                                        onClick={() => setIsModal(false)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                                        onClick={createGroup}
                                    >
                                        Create Group
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                </div>



            </SideBar >

        </>
    )
}

export default CandidateChooseCommunity;
