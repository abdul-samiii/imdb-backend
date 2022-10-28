import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
const router = express.Router();

let nowDate:any
const newFileName = (extension:any) => {
  nowDate = `${Date.now()}.${extension}`
}
const ImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './uploads/images')
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

const VideosStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './uploads/videos')
},
filename: function (req: any, file: any, cb: any) {
  switch (file.mimetype) {
    case 'video/mp4':
      newFileName('mp4')
      cb(null, nowDate)
      break
    default:
      cb(null, null)
  }
}
});


const ImageFileFilter = (req: any,file: any,cb: any) => {
  if(file.mimetype === "image/jpg"  || 
    file.mimetype ==="image/jpeg"  || 
    file.mimetype ===  "image/png"){
    cb(null, true);
  } else  {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false)
  }
}

const VideoFileFilter = (req: any,file: any,cb: any) => {
  if(file.mimetype === "video/mp4"){
    cb(null, true);
  } else  {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false)
  }
}

const uploadImages = multer({storage: ImagesStorage, fileFilter : ImageFileFilter});
const uploadVideos = multer({storage: VideosStorage});

router.post('/img',uploadImages.array('images',5),async(req: Request, res:Response, next :NextFunction)=>{
 res.status(200).json({"message": "Uploaded", imgLink: nowDate})
})
router.post('/video',uploadVideos.array('videos',5),async(req: Request, res:Response, next :NextFunction)=>{
  res.status(200).json({"message": "Uploaded", videoLink: nowDate})
 })

 export {router as UploadRoutes};