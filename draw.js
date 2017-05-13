
window.onload = function() {

  function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  var args = getUrlVars();
  console.log(args);

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2*Math.PI);
  ctx.stroke();

  ctx.rect(188, 40, 200, 100);
  ctx.fillStyle = args.color;
  ctx.shadowColor = '#222';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 15;
  ctx.shadowOffsetY = 15;
  ctx.fill();
}