import fs from "fs";
import path from "path";

export const isDir = source => fs.lstatSync(source).isDirectory();
