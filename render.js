var fs = require('fs');

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function getFileUrl(str) {
  var pathName = fs.absolute(str).replace(/\\/g, '/');
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
};

var fileBase = getFileUrl("render.html");

var resX = 200;
var resY = 200;

var maxFrames = 200;

var counter = 0;

for (frame = 0; frame < maxFrames; frame++) {
  var page = require("webpage").create();
  page.viewportSize = { width: resX, height: resY };
  page.clipRect = { top: 0, left: 0, width: resX, height: resY };

  file = fileBase + "?" +
    "color=green&" +
    "resX=" + resX + "&" +
    "resY=" + resY + "&" +
    "frame=" + frame + "&" +
    "maxFrames=" + maxFrames;

  var outFileName = "renders/test_" + pad(frame+1, 3) + ".png";
  console.log("Rendering frame " + (frame+1) + " / " + maxFrames + " => " + outFileName);
  console.log(file);

  page.open(file, function(status) {
    if (status !== "success") {
      console.log("Unable to load the address!");
      phantom.exit(1);
    } else {
      window.setTimeout(function () {
        page.render(outFileName);
        //phantom.exit();
        counter += 1;
        if (counter == maxFrames) {
          console.log("Done");
          //phantom.exit();
        }
      }, 200);
    }
  });

}
