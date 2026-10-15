// src/world/TerrainBuilder.js

export default class TerrainBuilder {
  constructor(scene, sections, world) {
    this.scene = scene;
    this.sections = sections;
    this.world = world;
    this.colliders = [];
  }

  create() {
    for (const section of this.sections) {
      this.createSection(section);
    }

    return this.colliders;
  }

  createSection(section) {
    const { x, width, top } = section;
    const height = this.world.height - top;

    // One flat, uniform ground surface.
    const ground = this.scene.add.rectangle(
      x + width / 2,
      top + height / 2,
      width,
      height,
      0x101012
    );

    ground.setDepth(0);

    // Invisible collider matching the ground.
    this.scene.physics.add.existing(ground, true);
    this.colliders.push(ground);
  }
}