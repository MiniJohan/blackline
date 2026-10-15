// Movement.js
import Phaser from "phaser";

const MOVEMENT = {
  walkSpeed: 400,
  acceleration: 2000,
  airAcceleration: 2400,

  jumpPower: 500,
  doubleJumpPower: 550,

  wallJumpX: 440,
  wallJumpY: 500,

  dashSpeed: 1400,
  dashDuration: 200,
  trailInterval: 32,
  trailLifetime: 128,

  coyoteTime: 100,
  jumpBufferTime: 120,

  gravity: 1200,
  maxFallSpeed: 1200,
  jumpReleaseMultiplier: 0.55,
};

export default class Movement {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.body = player.body;
    this.body.setCollideWorldBounds(true);

    this.keys = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });

    this.facing = 1;
    this.jumpsRemaining = 2;
    this.canDash = true;

    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;

    this.dashing = false;
    this.dashDirection = { x: 0, y: 0 };
    this.dashTimer = 0;
    this.trailTimer = 0;

    this.body.setMaxVelocity(
      MOVEMENT.walkSpeed,
      MOVEMENT.maxFallSpeed
    );

    this.body.setDragX(2200);
  }

  update(_, delta) {
    const body = this.body;

    const grounded =
      body.blocked.down || body.touching.down;

    const touchingLeft =
      body.blocked.left || body.touching.left;

    const touchingRight =
      body.blocked.right || body.touching.right;

    const touchingWall = touchingLeft || touchingRight;

    if (grounded) {
      this.jumpsRemaining = 2;
      this.canDash = true;
      this.coyoteTimer = MOVEMENT.coyoteTime;
    } else {
      this.coyoteTimer -= delta;
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
      this.jumpBufferTimer = MOVEMENT.jumpBufferTime;
    } else {
      this.jumpBufferTimer -= delta;
    }

    // Handle an active dash.
    if (this.dashing) {
      this.dashTimer -= delta;
      this.trailTimer -= delta;

      while (this.trailTimer <= 0) {
        this.createTrail();
        this.trailTimer += MOVEMENT.trailInterval;
      }

      // Prevent downward dashes from passing through the floor.
      const floorY = 640;
      const playerRadius = 14;

      if (
        this.dashDirection.y > 0 &&
        this.player.y + playerRadius >= floorY
      ) {
        this.player.y = floorY - playerRadius;
        this.body.reset(this.player.x, this.player.y);

        this.endDash();
        this.body.setVelocity(0, 0);
        return;
      }

      if (this.dashTimer <= 0) {
        this.endDash();
      } else {
        return;
      }
    }


    const left = this.keys.left.isDown;
    const right = this.keys.right.isDown;
    const up = this.keys.up.isDown;
    const down = this.keys.down.isDown;

    if (left && !right) this.facing = -1;
    if (right && !left) this.facing = 1;

    // Start directional dash.
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.dash) &&
      this.canDash
    ) {
      let directionX = Number(right) - Number(left);
      let directionY = Number(down) - Number(up);

      // No directional input: dash in the facing direction.
      if (directionX === 0 && directionY === 0) {
        directionX = this.facing;
      }

      // Normalize diagonal dashes to keep their speed consistent.
      const length = Math.hypot(directionX, directionY);

      directionX /= length;
      directionY /= length;

      this.dashDirection = {
        x: directionX,
        y: directionY,
      };

      this.dashing = true;
      this.canDash = false;
      this.dashTimer = MOVEMENT.dashDuration;
      this.trailTimer = MOVEMENT.trailInterval;

      body.setAllowGravity(false);
      body.setAcceleration(0, 0);

      body.setMaxVelocity(
        MOVEMENT.dashSpeed,
        MOVEMENT.dashSpeed
      );

      body.setVelocity(
        directionX * MOVEMENT.dashSpeed,
        directionY * MOVEMENT.dashSpeed
      );

      // Stretch along the dash direction.
      if (Math.abs(directionY) > Math.abs(directionX)) {
        this.animateScale(0.7, 1.4, 45, 90);
      } else {
        this.animateScale(1.4, 0.7, 45, 90);
      }

      this.createTrail();
      return;
    }

    // Restore normal movement limits.
    body.setMaxVelocity(
      MOVEMENT.walkSpeed,
      MOVEMENT.maxFallSpeed
    );

    const directionX = Number(right) - Number(left);

    body.setAccelerationX(
      directionX *
        (grounded
          ? MOVEMENT.acceleration
          : MOVEMENT.airAcceleration)
    );

    // Jumping and wall jumping.
    if (this.jumpBufferTimer > 0) {
      if (touchingWall && !grounded) {
        const wallDirection = touchingLeft ? 1 : -1;

        body.setVelocity(
          wallDirection * MOVEMENT.wallJumpX,
          -MOVEMENT.wallJumpY
        );

        this.facing = wallDirection;
        this.jumpsRemaining = 1;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;

        this.animateScale(0.82, 1.18, 55, 120);
      } else if (grounded || this.coyoteTimer > 0) {
        body.setVelocityY(-MOVEMENT.jumpPower);

        this.jumpsRemaining = 1;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;

        this.animateScale(0.85, 1.2, 55, 120);
      } else if (this.jumpsRemaining > 0) {
        body.setVelocityY(-MOVEMENT.doubleJumpPower);

        this.jumpsRemaining--;
        this.jumpBufferTimer = 0;

        this.animateScale(0.88, 1.15, 45, 100);
      }
    }

    // Variable jump height.
    if (
      !this.keys.jump.isDown &&
      body.velocity.y < -180
    ) {
      body.setVelocityY(
        body.velocity.y * MOVEMENT.jumpReleaseMultiplier
      );
    }
  }

  createTrail() {
    const ghost = this.scene.add.circle(
      this.player.x,
      this.player.y,
      14,
      0xf5f5f7
    );

    ghost.setAlpha(0.18);
    ghost.setScale(this.player.scaleX, this.player.scaleY);
    ghost.setDepth(this.player.depth - 1);

    this.scene.tweens.add({
      targets: ghost,
      alpha: 0,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: MOVEMENT.trailLifetime,
      ease: "Quad.easeOut",
      onComplete: () => ghost.destroy(),
    });
  }

  animateScale(scaleX, scaleY, duration, returnDuration) {
    this.scene.tweens.killTweensOf(this.player);

    this.scene.tweens.add({
      targets: this.player,
      scaleX,
      scaleY,
      duration,
      ease: "Quad.easeOut",
      onComplete: () => {
        if (this.dashing) return;

        this.scene.tweens.add({
          targets: this.player,
          scaleX: 1,
          scaleY: 1,
          duration: returnDuration,
          ease: "Quad.easeOut",
        });
      },
    });
  }

  endDash() {
    this.dashing = false;

    this.body.setAllowGravity(true);
    this.body.setVelocityY(0);
    this.body.setAcceleration(0, 0);

    this.body.setMaxVelocity(
      MOVEMENT.walkSpeed,
      MOVEMENT.maxFallSpeed
    );

    this.scene.tweens.killTweensOf(this.player);

    this.scene.tweens.add({
      targets: this.player,
      scaleX: 1,
      scaleY: 1,
      duration: 90,
      ease: "Quad.easeOut",
    });
  }
}