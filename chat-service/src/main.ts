import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import { IoAdapter } from '@nestjs/platform-socket.io';

dotenv.config();

async function server() {
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


  // const grpcOptions = AppModule.grpcOptions();

  // ivide ath connect cheyyum
  // app.connectMicroservice(grpcOptions);

  // athine ivide start cheyyum ipo gRPC server running ayirikkum 
  // await app.startAllMicroservices();
  // console.log('NestJS gRPC server running...');


  const mongoURL = configService.get<string>("mongoURL");
  if (!mongoURL) {
    console.error("❌ MongoDB URL not found in environment variables.");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(mongoURL, { dbName: 'Auth' });
    console.log(`✅ MongoDB connected successfully at host: ${connect.connection.host}`);
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }

  const PORT = configService.get<number>("PORT") || 6006;
  await app.listen(PORT);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
}

server();
