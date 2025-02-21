import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";


const ProtoPath = path.resolve(__dirname, "../../src/proto/candidate.proto");

const packageDefinition = protoLoader.loadSync(ProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const candidateProto: any = grpc.loadPackageDefinition(packageDefinition).candidate;

const client: any = new candidateProto.CandidateService('0.0.0.0:50051', grpc.credentials.createInsecure());

export const sendCandidate = (ids: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const request = {ids};

        console.log(request, 'this is request for the candidate client data');

        client.sendCandidate(request, (error:any, response: any) => {
            if(error) {
                console.log('error of reject part in client gRPC');
                reject(error);
            }else {
                console.log("resolved for the response for the gRPC");
                resolve(response);
            }
        })
    })
}
