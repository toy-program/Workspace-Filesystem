import fs from "fs";
import path from "path";
import "@babel/polyfill";

class System {
  constructor(name, beforePath) {
    this._name = name;
    this._path = path.join(beforePath, name);
  }

  get name() {
    return this._name;
  }

  get path() {
    return this._path;
  }

  set name(name) {
    this._name = name;
  }

  set path(path) {
    this._path = path;
  }
}

export class File extends System {}

export class Directory extends System {
  constructor(name, beforePath) {
    super(name, beforePath);
    this._inside = {};
  }

  get inside() {
    return this._inside;
  }

  setInside(something) {
    this._inside[something] = something;
  }

  delInside(something) {
    delete this._inside[something];
  }
}

export const readInDir = dir => {
  const data = fs.readdirSync(dir.path, { withFileTypes: true });
  data.map(dirent => {
    if (dirent.isDirectory()) {
      const newDir = new Directory(dirent.name, dir.path);
      dir.setInside(newDir);
      readInDir(newDir);
    } else {
      const newFile = new File(dirent.name, dir.path);
      dir.setInside(newFile);
    }
  });
};
