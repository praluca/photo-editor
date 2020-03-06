window.onload = function() {
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  var flag = false;
  var imgLoad;

  var circleCanvas = document.getElementById("lines");
  circleCanvas.addEventListener("click", function() {
    canvas.removeEventListener("click", drawSquare);
    canvas.removeEventListener("click", drawCircle);
    canvas.removeEventListener("mousemove", deleteFunction);
    canvas.addEventListener("click", drawLines);
  });
  function drawLines(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    let dx = 150;
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y);
    ctx.strokeStyle = "#ffd271";
    ctx.stroke();
  }

  var squareCanvas = document.getElementById("square");
  squareCanvas.addEventListener("click", function() {
    canvas.removeEventListener("click", drawCircle);
    canvas.removeEventListener("click", drawLines);
    canvas.removeEventListener("mousemove", deleteFunction);
    canvas.addEventListener("click", drawSquare);
  });
  function drawSquare(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let dx = 100;
    let dy = 100;

    ctx.lineTo(x + dx, y);
    ctx.lineTo(x + dx, y - dy);
    ctx.lineTo(x, y - dy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#f65c78";
    ctx.stroke();
  }

  var circleCanvas = document.getElementById("circle");
  circleCanvas.addEventListener("click", function() {
    canvas.removeEventListener("click", drawSquare);
    canvas.removeEventListener("click", drawLines);
    canvas.removeEventListener("mousemove", deleteFunction);
    canvas.addEventListener("click", drawCircle);
  });
  function drawCircle(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "#3fc5f0";
  }

  var imgDrag = document.getElementById("drag");
  imgDrag.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text", e.target.id);
  });

  canvas.addEventListener("drop", function(e) {
    var data = e.dataTransfer.getData("text");
    imgLoad = new Image();
    imgLoad.src = data;
    ctx.drawImage(imgLoad, 0, 0);
    flag = true;
  });

  canvas.addEventListener("dragover", function(e) {
    e.preventDefault();
  });

  var cropImg = document.getElementById("crop");
  cropImg.addEventListener("click", function(e) {
    canvas.removeEventListener("click", drawLines);
    canvas.removeEventListener("click", drawSquare);
    canvas.removeEventListener("click", drawCircle);
    canvas.removeEventListener("mousemove", deleteFunction);
    canvas.addEventListener("mousedown", function(e) {
      let x = e.clientX - canvas.offsetLeft;
      let y = e.clientY - canvas.offsetTop;
      let dx, dy;
      canvas.addEventListener("mousemove", drawArea);
      function drawArea(e) {
        dx = e.offsetX;
        dy = e.offsetY;
        ctx.fillStyle = "#D0D0D0";
        ctx.fillRect(x, y, dx, dy);
      }
      canvas.addEventListener("mouseup", function(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgLoad, x, y, dx, dy, 50, 50, dx, dy);
        canvas.removeEventListener("mousemove", drawArea);
      });
    });
    canvas.addEventListener("mousedown", function(e) {});
  });

  var deletePixels = document.getElementById("delete");
  deletePixels.addEventListener("click", function() {
    canvas.addEventListener("mousemove", deleteFunction);
  });
  function deleteFunction(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    var image = ctx.getImageData(x, y, 20, 20);
    var pixels = image.data;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] - pixels[i];
      pixels[i + 1] = pixels[i + 1] - pixels[i + 1];
      pixels[i + 2] = pixels[i + 2] - pixels[i + 2];
      pixels[i + 3] = pixels[i + 3] - pixels[i + 3];
    }
    ctx.putImageData(image, x, y);
  }

  var zoomPixels = document.getElementById("zoom");
  zoomPixels.addEventListener("click", function() {
    canvas.removeEventListener("mousemove", deleteFunction);
    ctx.scale(2, 2);
    ctx.drawImage(imgLoad, 0, 0);
  });

  var zoomOutPixels = document.getElementById("zoomout");
  zoomOutPixels.addEventListener("click", function() {
    canvas.removeEventListener("mousemove", deleteFunction);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(0.5, 0.5);
    ctx.drawImage(imgLoad, 0, 0);
  });

  var drawLinesWithMouse = this.document.getElementById("linesMouse");
  drawLinesWithMouse.addEventListener("click", function() {
    let x, y;
    canvas.addEventListener("mousedown", getMousePosition);
    function getMousePosition(e) {
      x = e.clientX - canvas.offsetLeft;
      y = e.clientY - canvas.offsetTop;
    }
    canvas.addEventListener("mousemove", drawArea);
    function drawArea(e) {
      dx = e.offsetX;
      dy = e.offsetY;
      ctx.strokeStyle = "#f0134d";
    }
    canvas.addEventListener("mouseup", drawLineMouse);
    function drawLineMouse(e) {
      let x1 = e.clientX - canvas.offsetLeft;
      let y1 = e.clientY - canvas.offsetTop;
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      canvas.removeEventListener("mousemove", drawArea);
    }
  });

  var drawSquareWithMouse = this.document.getElementById("squareMouse");
  drawSquareWithMouse.addEventListener("click", function() {
    let x, y;
    canvas.addEventListener("mousedown", getMouse);
    function getMouse(e) {
      x = e.clientX - canvas.offsetLeft;
      y = e.clientY - canvas.offsetTop;
    }
    canvas.addEventListener("mousemove", drawArea);
    function drawArea(e) {
      ctx.fillStyle = "#f0134d";
    }
    canvas.addEventListener("mouseup", function(e) {
      let x1 = e.clientX - canvas.offsetLeft;
      let y1 = e.clientY - canvas.offsetTop;
      ctx.beginPath();
      ctx.fillRect(x, y, x1 - x, y1 - y);
      ctx.beginPath();
      canvas.removeEventListener("mousemove", drawArea);
    });
  });
};
