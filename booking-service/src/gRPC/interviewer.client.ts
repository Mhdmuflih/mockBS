
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
// import path from "path";
  

const ProtoPath = path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../proto/interviewer.proto" : "../../src/proto/interviewer.proto");
// const ProtoPath = path.resolve(__dirname, "../proto/interviewer.proto");
// console.log(ProtoPath, 'this is the proto path')

const packageDefinition = protoLoader.loadSync(ProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const interviewerProto: any = grpc.loadPackageDefinition(packageDefinition).interviewer;

const client: any = new interviewerProto.InterviewerService('0.0.0.0:50051', grpc.credentials.createInsecure());

export const sendInterviewer = (ids: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const request = { ids };
        // console.log(request, 'this is requested data in client');

        client.sendInterviewer(request, (error: any, response: any) => {
            if(error) {
                // console.log("Error in gRPC interviewer in client side: ");
                reject(error);
            }else {
                // console.log("Interviewer Data send success fully.", response);
                resolve(response);
            }
        })
    })
}