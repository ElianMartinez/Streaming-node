const app = require("express")(),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  port = process.env.port || 8000,
  publicDir = `${__dirname}/public`;
const robot = require("robotjs");
const Jimp = require("jimp");

http.listen(port, () => {
  console.log("Iniciado Express y Socket en " + port);
});

app.get("/", (req, res) => {
  res.sendFile(`${publicDir}/client.html`);
});

setInterval(() => {
  var mime = "image/png";
  var encoding = "base64";
  let data = Capturar();
  var uri = "data:" + mime + ";" + encoding + "," + data;
  io.emit("stream", uri);
  console.log("transmitiendo");
}, 120);

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
  var jimg = new Jimp(image.width, image.height)
  jimg.bitmap.data = image.image;
  
  console.log(jimg.bitmap.data.length)
  jimg.getBuffer(Jimp.MIME_PNG, (err, result) => {
   result.
  });

  return data;
}
