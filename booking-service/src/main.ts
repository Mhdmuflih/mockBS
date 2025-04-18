import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from '@nestjs/config';
import mongoose from "mongoose";
import { IoAdapter } from "@nestjs/platform-socket.io";
import * as morgan from 'morgan';

async function Server() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan("tiny"));
  
  app.useWebSocketAdapter(new IoAdapter(app));

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: process.env.FRONTEND, // Ensure the variable is correctly named
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });


  // microservice gRPC connection
  // ===============================================================================
  const grpcOptions = AppModule.grpcOptions();

  // ivide ath connect cheyyum
  app.connectMicroservice(grpcOptions);

  // athine ivide start cheyyum ipo gRPC server running ayirikkum 
  await app.startAllMicroservices();
  console.log('NestJS gRPC server running...');
  // ===============================================================================


  // mongodb Connection
  // ===============================================================================
  const mongoURL = configService.get<string>("mongoURL");
  if (!mongoURL) {
    console.error("❌ MongoDB URL not found in environment variables.");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(mongoURL, { dbName: 'Booking' });
    console.log(`✅ MongoDB connected successfully at host: ${connect.connection.host}`);
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
  // ===============================================================================
  
  
  // Server connection
  // ===============================================================================
  const PORT = configService.get<number>("PORT") || 3030;
  await app.listen(PORT);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);

}

Server();