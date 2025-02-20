import cloudinary from "../Config/cloudinary";

export const imageUpload = async (filePath: any): Promise<string | undefined> => {
    try {


        return new Promise((resolve, reject) => {
            const imageFile = filePath.buffer;

            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: "User_Profile" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result?.secure_url);
                    }
                }
            );

            uploadStream.end(imageFile);
        });


    } catch (error: any) {
        console.log(`error imageupload cloudinary ${error}`);
        return "Failed to upload image"
    }
}