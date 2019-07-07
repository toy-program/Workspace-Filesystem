import multer from "multer";
import path from "path";
import fs from "fs";
import unzip from "unzipper";
import { Directory, readInDir } from "./util";

const inputFilePath = "public/";
const workspace = "workspace";

export const uploadMiddleWare = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, inputFilePath);
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, originalname);
      const ext = originalname.slice(originalname.length - 3);
      req.ext = ext;
    }
  })
});

export const getIndex = (req, res, next) => {
  res.render("index");
};

export const unZip = (req, res, next) => {
  const { ext, file } = req;
  if (ext === "zip") {
    fs.createReadStream(path.join(inputFilePath, file.originalname)).pipe(
      unzip.Extract({
        path: workspace
      })
    );
  }

  if (ext === "tar") {
  }

  next();
};

export const getWorkspace = (req, res, next) => {
  fs.unlinkSync(req.file.path);
  const dir = new Directory(workspace, "");
  readInDir(dir);

  res.render("home", { dir });
};
