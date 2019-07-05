import {
  getIndex,
  uploadMiddleWare,
  unZip,
  getWorkspace
} from "../controller/homeController";

const router = require("express").Router();

router.get("", getIndex);

router.post("", uploadMiddleWare.single("file"), unZip, getWorkspace);

export default router;
