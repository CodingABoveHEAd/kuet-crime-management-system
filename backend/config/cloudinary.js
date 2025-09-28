import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,

  // cloud_name: "dmnfdlzy1",
  // api_key: "255832235615975",
  // api_secret:"ZZDiOM-KiBUmaVvtZTALFJavLwY"
});

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "Loaded ✅" : "Missing ❌",
});


export default cloudinary;
