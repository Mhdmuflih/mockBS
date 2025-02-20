import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(folder, 'this is folder name');
      cloudinary.uploader.upload(
        file.path,
        {
          folder: folder,
          public_id: file.filename, // optional: you can add a custom public id for your file
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result?.secure_url);
        }
      );
    });
  }
}
