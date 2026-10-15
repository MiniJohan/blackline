import Phaser from "phaser";
import Level1 from "./levels/Level1.js";
import Movement from "./Movement.js";
import GridBackground from "./world/GridBackground.js";
import Enemy from "./enemies/Enemy.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {

    const level = new Level1(this).create();
    new GridBackground(this).create(
      level.world.width,
      level.world.height
    );

    this.levelTerrain = level.terrain.map((collider, index) => ({
      x: collider.x - collider.width / 2,
      top: collider.y - collider.height / 2,
      width: collider.width,
    }));

    this.physics.world.setBounds(
      0,
      0,
      level.world.width,
      level.world.height
    );

    this.cameras.main.setBounds(
      0,
      0,
      level.world.width,
      level.world.height
    );

    this.player = this.add.circle(
      180,
      626,
      14,
      0xf5f5f7
    );

    // Create a separate copy of the ball for its reflection.
    this.playerReflection = this.add.circle(
      this.player.x,
      654,
      14,
      0xffffff,
      0.16
    );

    this.playerReflection.setDepth(1);
    this.player.setDepth(2);

    this.physics.add.existing(this.player);

    this.player.body
      .setCircle(14)
      .setCollideWorldBounds(true);

    this.enemies = [
      new Enemy(this, this.player, 650, 120),
    ];

    // Collide with every terrain section.
    for (const terrain of level.terrain) {
      this.physics.add.collider(this.player, terrain);
    
      for (const enemy of this.enemies) {
        this.physics.add.collider(enemy.sprite, terrain);
      }
    }

    this.movement = new Movement(this, this.player);

    this.cameras.main.startFollow(
      this.player,
      false,
      0.08,
      0
    );
  }

  update(time, delta) {
    this.movement.update(time, delta);

    const groundY = 640;
    const radius = 14;
    const heightAboveGround = Math.max(
      0,
      groundY - (this.player.y + radius)
    );

    // Mirror the ball's center across the ground surface.
    this.playerReflection.setPosition(
      this.player.x,
      groundY * 2 - this.player.y
    );

    // Reflection fades with distance from the floor.
    const fade = Math.exp(-heightAboveGround / 100);

    this.playerReflection.setAlpha(0.16 * fade);
    this.playerReflection.setScale(
      1 - Math.min(heightAboveGround / 220, 0.65),
      1 - Math.min(heightAboveGround / 160, 0.7)
    );

    for (const enemy of this.enemies) {
      enemy.update();
    }
  }

  currentTerrainSection() {
    return this.levelTerrain?.find(
      section =>
        this.player.x >= section.x &&
        this.player.x <= section.x + section.width
    );
  }
}