
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
// import path from "path";
  

const ProtoPath = path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../proto/booking.proto" : "../../src/proto/booking.proto");

const packageDefinition = protoLoader.loadSync(ProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const bookingProto: any = grpc.loadPackageDefinition(packageDefinition).booking;

const client: any = new bookingProto.BookingService('0.0.0.0:50052', grpc.credentials.createInsecure());

export const sendBookingData = (bookingData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!client.CreateBooking) {
            console.error("CreateBooking method not found!");
            return reject(new Error("gRPC method CreateBooking not found on client"));
        }

        // console.log("Sending request to gRPC:", bookingData);


        client.CreateBooking(bookingData, (error: any, response: any) => {
            if (error) {
                // console.error("Error in gRPC booking client:", error);
                reject(error);
            } else {
                // console.log("Booking data sent successfully.", response);
                resolve(response);
            }
        });
    });
};
