import multer, {StorageEngine, Multer} from "multer"
import path from "path"
import { v4 as uuidv4 } from 'uuid';

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = file.originalname.split('.')[0] + '_' + uuidv4() + path.extname(file.originalname);
      cb(null, filename)
    }
  })
  
  const upload: Multer = multer({ storage: storage })

  export default upload