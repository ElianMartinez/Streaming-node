const fs = require("fs");
const robot = require("robotjs");
const Jimp = require("jimp");
const screenshot = require("screenshot-desktop");

// function screenCaptureToFile2(robotScreenPic, path) {
//   return new Promise((resolve, reject) => {
//     try {
//       const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
//       let pos = 0;
//       image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
//         image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
//         image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
//         image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
//         image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
//       });
//       image.write(path, resolve);
//     } catch (e) {
//       console.error(e);
//       reject(e);
//     }
//   });
// }

// let buffer = robot.screen.capture(0, 0, 500, 500);
// // //screenCaptureToFile2(pic, `img/img.png`);

// var mime = "image/png";
// var encoding = "base64";

// var uri = "data:" + mime + ";" + encoding + "," + data;

// fs.appendFile("server.log", uri, function (err) {
//   if (err) return console.log(err);
//   console.log("Appended!");
// });

// });

var mime = "image/png";
var encoding = "base64";
let data = Capturar();
var uri = "data:" + mime + ";" + encoding + "," + data;
fs.appendFile("server.log", uri, function (err) {
  if (err) return console.log(err);
  console.log("Appended!");
});

function Capturar() {
  let image = robot.screen.capture();
  for (let i = 0; i < image.image.length; i++) {
    if (i % 4 == 0) {
      [image.image[i], image.image[i + 2]] = [
        image.image[i + 2],
        image.image[i],
      ];
    }
  }
  let data;
  var jimg = new Jimp(image.width, image.height);
  jimg.bitmap.data = image.image;
  jimg.getBuffer(Jimp.MIME_PNG, (err, result) => {
    data = result.toString("base64");
  });

  return data;
}
