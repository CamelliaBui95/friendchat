/*const parseDataUrl = require("parse-data-url");
const fs = require("fs");
const sharp = require('sharp');

const createFile = payload => {
    const buffer = parseDataUrl(payload.data).toBuffer();

    const fileName = payload.type.match(/\w+/g)[0];
    const format = payload.type.match(/\w+/g)[1];
    const file = `${fileName}.${format}`;

    console.log("creating file...")
    
    return new Promise((resolve, reject) => {
      fs.writeFile(file, buffer, (err) => {
        if (err) reject(err);
        resolve("./" + file); // return the path to image
      });
    })
}

const removeFile = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) reject(err);
            resolve("file has been removed");
        })
    })
}

const resizeImage = async imgFile => {
    const {format: imgFormat} = await sharp(imgFile).metadata();
    const resizedFilePath = "./userImage-resized." + imgFormat;

    return new Promise((resolve, reject) => {
        sharp(imgFile)
            .resize({ width: 400 })
            .toFile(resizedFilePath)
            .then(data => {
                resolve(resizedFilePath);
            })
    })
}

const readFileAsDataUrl = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "base64", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const imageResizingProcess = async payload => {
    let newDataUrl;
    try {
        const imgFilePath = await createFile(payload);
        const resizedImgPath = await resizeImage(imgFilePath);
        newDataUrl = await readFileAsDataUrl(resizedImgPath);
    } catch (err) {
        if (err)
            return err;
    }
    return `data:${payload.type};base64,${newDataUrl}`;
}

module.exports = { imageResizingProcess, removeFile };*/

const fs = require('fs');
const path = require('path');

const getSslConfigObj = (dir) => {
     return {
       key: fs.readFileSync(path.join(dir, "sslCert", "key.pem")),
       cert: fs.readFileSync(path.join(dir, "sslCert", "cert.pem")),
     };
}


module.exports = {getSslConfigObj}
