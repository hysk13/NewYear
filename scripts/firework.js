const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.velocity = Math.random() * 3 + 3;
        this.angle = Math.random() * Math.PI / 2 - Math.PI / 4;
        this.velX = Math.cos(this.angle) * this.velocity;
        this.velY = Math.sin(this.angle) * this.velocity;
        this.gravity = 0.05;
        this.sparks = [];
        this.exploded = false;
        this.size = 1;
    }

    update() {
        if (!this.exploded) {
            this.velY += this.gravity;
            this.x += this.velX;
            this.y += this.velY;

            if (this.velY >= 0) this.explode();
        } else {
            this.sparks.forEach(spark => spark.update());
            this.sparks = this.sparks.filter(spark => spark.alpha > 0);
        }
    }

    explode() {
        this.exploded = true;
        const numSparks = Math.random() * 50 + 50;
        const sparks = Array.from({ length: numSparks }, () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            return new Spark(this.x, this.y, angle, speed, color);
        });
        this.sparks.push(...sparks);
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        } else {
            this.sparks.forEach(spark => spark.draw());
        }
    }

    isDead() {
        return this.exploded && !this.sparks.length;
    }
}

class Spark {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.size = Math.random() * 0.7 + 0.3;
        this.velX = Math.cos(angle) * speed;
        this.velY = Math.sin(angle) * speed;
        this.color = color;
        this.gravity = 0.1;
    }

    update() {
        this.velY += this.gravity;
        this.x += this.velX;
        this.y += this.velY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }
}

const fireworks = [];

function createFirework() {
    fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
}

function updateAndDrawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.isDead()) fireworks.splice(index, 1);
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (Math.random() < 0.1) createFirework();
    updateAndDrawFireworks();
}