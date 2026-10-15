
import Phaser from "phaser";

const ENEMY = {
  radius: 12,
  patrolSpeed: 65,
  chaseSpeed: 115,
  detectionRange: 280,
  gravity: 1200,
};

export default class Enemy {
  constructor(scene, player, x, patrolDistance = 120) {
    this.scene = scene;
    this.player = player;

    this.startX = x;
    this.minX = x - patrolDistance;
    this.maxX = x + patrolDistance;

    this.direction = 1;
    this.state = "patrol";

    // Create the enemy.
    this.sprite = scene.add.circle(
      x,
      620,
      ENEMY.radius,
      0x101012
    );

    this.sprite.setStrokeStyle(2, 0xe5e5e5);
    this.sprite.setDepth(2);

    scene.physics.add.existing(this.sprite);

    this.body = this.sprite.body;
    this.body.setCircle(ENEMY.radius);
    this.body.setCollideWorldBounds(true);
    this.body.setGravityY(ENEMY.gravity);
    this.body.setMaxVelocity(ENEMY.chaseSpeed, 900);
    this.body.setDragX(500);
  }

  update() {
    if (!this.sprite.active) return;

    const distanceX = this.player.x - this.sprite.x;
    const distanceY = Math.abs(this.player.y - this.sprite.y);

    // Chase only when the player is nearby and roughly
    // at the same height.
    if (
      Math.abs(distanceX) <= ENEMY.detectionRange &&
      distanceY < 100
    ) {
      this.state = "chase";
      this.direction = Math.sign(distanceX) || this.direction;

      this.body.setVelocityX(
        this.direction * ENEMY.chaseSpeed
      );
    } else {
      this.state = "patrol";

      if (this.sprite.x <= this.minX) {
        this.direction = 1;
      } else if (this.sprite.x >= this.maxX) {
        this.direction = -1;
      }

      this.body.setVelocityX(
        this.direction * ENEMY.patrolSpeed
      );
    }

    // Face the direction of movement.
    this.sprite.setScale(this.direction, 1);
  }

  destroy() {
    this.sprite.destroy();
  }
}
