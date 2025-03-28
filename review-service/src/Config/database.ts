import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongoURL as string, { dbName: "review" });
        console.log(`MongoDB connected successfully.: ${connect.connection.host}`);
    } catch (error: any) {
        console.log("Failed to Connect the Monogdb", error.message);
        process.exit(1);
    }
}

export default connectDB;