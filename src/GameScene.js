import Phaser from "phaser";
import Level1 from "./levels/Level1.js";
import Movement from "./Movement.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const level = new Level1(this).create();

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

    this.physics.add.existing(this.player);

    this.player.body
      .setCircle(14)
      .setCollideWorldBounds(true);

    // Collide with every terrain section.
    for (const section of level.terrain) {
      this.physics.add.collider(this.player, section);
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
  }
}