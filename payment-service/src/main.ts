import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as morgan from 'morgan';

async function Server() {
  const app = await NestFactory.create(AppModule);
 
  app.use(morgan("tiny"));
  
  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('FRONTEND'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });


  // MongoDB Connection
  const mongoURL = configService.get<string>("mongoURL");
  if (!mongoURL) {
    console.error("❌ MongoDB URL not found in environment variables.");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(mongoURL, { dbName: 'Payment' });
    console.log(`✅ MongoDB connected successfully at host: ${connect.connection.host}`);
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }

  // Start HTTP Server
  const PORT = configService.get<number>("PORT") || 4040;
  await app.listen(PORT);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
}
Server();
