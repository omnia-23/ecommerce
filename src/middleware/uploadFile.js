import multer from "multer";
export const customValidation = {
  images: ["image/png", "image/gif", "image/jpeg"],
};

const uploadFile = (validation, folderName) => {
  // if (!fs.existsSync(`./uploads/${folderName}`)) {
  //   fs.mkdirSync(`./uploads/${folderName}`);
  // }
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, `uploads/${folderName}`);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, nanoid(30) + "-" + file.originalname);
  //   },
  // });
  const fileFilter = (req, file, cb) => {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid format"));
    }
  };
  const upload = multer({ fileFilter });
  return upload;
};

export default uploadFile;
