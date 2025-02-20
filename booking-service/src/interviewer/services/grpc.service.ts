// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import path from "path";

// // proto file ntte file directry edkkan
// const ProtoPath = path.resolve(__dirname, "../proto/interviewer.proto");

// // Load the proto file using protoLoader
// const packageDefinition = protoLoader.loadSync(ProtoPath, {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
// });

// // notification proto last .notification is that package name;
// const notificationProto: any = grpc.loadPackageDefinition(packageDefinition).notification;

// // this is gRPC servicer set cheyyan ith notification nere mukalil lla varibale ann athill proto file edthe davum
// // athille gRPC service aann NotificationService...
// // docker running notification_service
// // minikube running notification-service.default.svc.cluster.local:50051
// const client: any = new notificationProto.NotificationService('interviewer_service:50051', grpc.credentials.createInsecure());


// // ith ann client ntte edth nammal eyutha ayakande sathanam . userManagement ll call cheyyum.
// export const sendNotification = (email: string, message: string): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         const request = { email };

//         // console.log("This is the request of the notification service:", request);

//         client.SendNotification(request, (error: any, response: any) => {
//             if (error) {
//                 console.log("Error in gRPC notification in client side: ", error);
//                 reject(error); // Reject the promise with the error
//             } else {
//                 console.log('Notification sent successfully: ', response);
//                 resolve(response); // Resolve with the response
//             }
//         });

//     });
// };