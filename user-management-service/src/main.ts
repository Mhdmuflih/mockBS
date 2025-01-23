import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

async function server() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  });

  const configService = app.get(ConfigService);  //   // Get ConfigService from AppModule

  const mongoURL = configService.get<string>("mongoURL");
  const connectDB = async () => {           // MongoDB connection function
    try {
      const connect = await mongoose.connect(mongoURL as string, { dbName: 'Auth' });
      console.log(`✅ MongoDB connected successfully at host: ${connect.connection.host}`);
    } catch (error: any) {
      console.error('❌ Failed to connect to MongoDB:', error.message);
      process.exit(1);
    }
  };
  await connectDB();  // Call the connection function

  const PORT = configService.get<number>("PORT") || 2020;   //   // Fetch PORT from environment variables
  app.listen(PORT, () => {
    console.log(`Server running on Ports: http://localhost:${PORT}`);
  });
}
server();