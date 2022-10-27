import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,"images");
  },
  filename: (req,file,cb)=>{
      cb(null,"abxc.png");
  },
});

const upload = multer({storage:storage});
upload.single("file",(req: Request,res: Response)=>{
  res.status(200).json("File has been uploaded");
})