import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
const router = express.Router();

let nowDate:any
const newFileName = (extension:any) => {
  nowDate = `${Date.now()}.${extension}`
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './uploads/')
},
filename: function (req: any, file: any, cb: any) {
  switch (file.mimetype) {
    case 'image/jpg':
      newFileName('jpg')
      cb(null, nowDate)
      break
    case 'image/jpeg':
      newFileName('jpeg')
      cb(null, nowDate)
      break
    case 'image/png':
      newFileName('png')
      cb(null, nowDate)
      break
    default:
      cb(null, null)
  }
}
});
const fileFilter = (req: any,file: any,cb: any) => {
if(file.mimetype === "image/jpg"  || 
 file.mimetype ==="image/jpeg"  || 
 file.mimetype ===  "image/png"){

cb(null, true);
}else{
cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);}}
const upload = multer({storage: storage, fileFilter : fileFilter});
router.post('/img',upload.array('images',5),async(req: Request, res:Response, next :NextFunction)=>{

 res.status(200).json({"message": "Uploaded", imgLink: nowDate})
})
 export {router as UploadRoutes};