document.addEventListener("DOMContentLoaded", function () {
  const collectionContainer = document.querySelector(".collection");
  const containerStyles = window.getComputedStyle(collectionContainer);
  const containerWidth = parseInt(containerStyles.width, 10);
  const gridColumnWidth = containerWidth / 3;

  const gridheight = 600;

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = gridColumnWidth;
  canvas.height = gridheight;

  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  canvas2.width = gridColumnWidth;
  canvas2.height = gridheight;

  const canvas3 = document.getElementById("canvas3");
  const ctx3 = canvas3.getContext("2d");
  canvas3.width = gridColumnWidth;
  canvas3.height = gridheight;

  class Line {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.history = [{ x: this.x, y: this.y }];
      this.lineWidth = Math.floor(Math.random() * 15 + 1);
      this.hue = Math.floor(Math.random() * 360);
      this.maxLenght = Math.floor(Math.random() * 150 + 10);
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = 7;
      this.lifeSpan = this.maxLenght * 2;
      this.timer = 0;
      this.angle = 0;
      this.curve = 0.1;
      if (canvas == canvas3) {
        this.vc = Math.random() * 0.4 - 0.2;
      } else {
        this.vc = 0.1;
      }
      this.va = Math.random() * 0.5 - 0.25;
    }

    draw(context) {
      context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%";
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.stroke();
    }
    update(context) {
      this.timer++;
      if (context == canvas3) {
        this.angle += this.va;
      } else {
        this.angle += 0.1;
      }
      this.curve += this.vc;
      if (this.timer < this.lifeSpan) {
        if (this.timer > this.lifeSpan * 0.9) {
          this.va *= -1.12;
        }
        this.x += Math.sin(this.angle) * this.curve;
        if (context == ctx) {
          this.y += this.speedY;
        } else if (context == ctx2) {
          this.y += Math.sin(this.angle) * this.curve;
        } else {
          this.y += Math.cos(this.angle) * this.curve;
        }

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLenght) {
          this.history.shift();
        }
      } else if (this.history.length <= 1) {
        this.reset();
      } else {
        this.history.shift();
      }
    }
    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.history = [{ x: this.x, y: this.y }];
      this.timer = 0;
      this.angle = 0;
      this.curve = 0;
      this.va = Math.random() * 0.5 - 0.25;
    }
  }

  const linesArray = [];
  const linesArray2 = [];
  const linesArray3 = [];
  const numberOfLines = 20;
  for (let i = 0; i < numberOfLines; i++) {
    linesArray.push(new Line(canvas));
    linesArray2.push(new Line(canvas2));
    linesArray3.push(new Line(canvas3));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesArray.forEach((line) => {
      line.draw(ctx);
      line.update(ctx);
    });
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    linesArray2.forEach((line) => {
      line.draw(ctx2);
      line.update(ctx2);
    });
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    linesArray3.forEach((line) => {
      line.draw(ctx3);
      line.update(ctx3);
    });

    requestAnimationFrame(animate);
  }
  animate();
});
