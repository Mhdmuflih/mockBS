
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
// import path from "path";
  

const ProtoPath = path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../proto/premium.proto" : "../../src/proto/premium.proto");

const packageDefinition = protoLoader.loadSync(ProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const premiumProto: any = grpc.loadPackageDefinition(packageDefinition).premium;

const client: any = new premiumProto.PremiumService('0.0.0.0:50051', grpc.credentials.createInsecure());

export const sendPremiumData = (candidateId: string): Promise<{ success: boolean, message: string }> => {
    return new Promise((resolve, reject) => {
        if (!client.CreatePremium) {
            console.error("CreatePremium method not found!");
            return reject(new Error("gRPC method CreatePremium not found on client"));
        }

        console.log("Sending request to gRPC with candidateId:", candidateId);

        // Fix: Send the correct object format
        client.CreatePremium({ candidateId }, (error: any, response: any) => {
            if (error) {
                console.error("Error in gRPC premium client:", error);
                reject(error);
            } else {
                console.log(candidateId, 'this is candidateId');
                console.log("Premium data sent successfully.", response);
                resolve(response);
            }
        });
    });
};
