class Particle {
  constructor(canvas, ctx, colors) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.colors = colors;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    /* Wrap around effect */
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;

    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    this.draw();
  }
}

export default Particle;
