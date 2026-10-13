// src/Environment.js

const COLORS = {
  stone: 0x17171b,
  stoneLight: 0x202025,
  stoneDark: 0x0b0b0e,
  edge: 0x777780,
  crack: 0x09090b,
};

export default class Environment {
  constructor(scene, terrain, world) {
    this.scene = scene;
    this.terrainLayout = terrain;
    this.world = world;
    this.terrain = [];
  }

  create() {
    this.createRuins();
    this.createTerrain();

    return {
      terrain: this.terrain,
    };
  }

  createRuins() {
    const graphics = this.scene.add.graphics();

    // Broken pillars and ruined stonework.
    // Drawn behind the walkable terrain.
    const ruins = [
      { x: 330, top: 465, width: 34, bottom: 640 },
      { x: 370, top: 510, width: 22, bottom: 640 },
      { x: 915, top: 455, width: 28, bottom: 600 },
      { x: 1330, top: 490, width: 38, bottom: 640 },
      { x: 1600, top: 430, width: 30, bottom: 600 },
      { x: 2180, top: 470, width: 36, bottom: 640 },
    ];

    for (const ruin of ruins) {
      const height = ruin.bottom - ruin.top;

      graphics.fillStyle(COLORS.stoneDark, 1);
      graphics.fillRect(
        ruin.x - 5,
        ruin.top + 12,
        ruin.width + 10,
        height - 12
      );

      graphics.fillStyle(COLORS.stone, 1);
      graphics.fillPoints([
        { x: ruin.x, y: ruin.bottom },
        { x: ruin.x, y: ruin.top + 12 },
        { x: ruin.x + 7, y: ruin.top + 5 },
        { x: ruin.x + 13, y: ruin.top + 10 },
        { x: ruin.x + 20, y: ruin.top },
        { x: ruin.x + ruin.width, y: ruin.top + 14 },
        { x: ruin.x + ruin.width, y: ruin.bottom },
      ], true);

      graphics.lineStyle(1, COLORS.edge, 0.12);
      graphics.lineBetween(
        ruin.x + 5,
        ruin.top + 20,
        ruin.x + 5,
        ruin.bottom - 8
      );

      // Broken stone bands
      graphics.lineStyle(1, COLORS.crack, 0.9);
      graphics.lineBetween(
        ruin.x + 3,
        ruin.top + 55,
        ruin.x + ruin.width - 3,
        ruin.top + 55
      );
    }

    // Low, broken masonry along selected sections.
    // These details are decorative, not extra collision bodies.
    for (const x of [455, 1010, 1410, 1810, 2290]) {
      const section = this.findTerrainAt(x);

      if (!section) continue;

      const y = section.top;

      graphics.fillStyle(COLORS.stoneDark, 1);
      graphics.fillRect(x, y - 24, 26, 24);

      graphics.fillStyle(COLORS.stone, 1);
      graphics.fillPoints([
        { x, y: y - 24 },
        { x: x + 8, y: y - 29 },
        { x: x + 16, y: y - 22 },
        { x: x + 26, y: y - 25 },
        { x: x + 26, y },
        { x, y },
      ], true);
    }

    graphics.setDepth(-2);
  }

  createTerrain() {
    for (const section of this.terrainLayout) {
      this.createTerrainSection(section);
    }
  }

  createTerrainSection(section) {
    const { x, width, top, type } = section;
    const bottom = this.world.height;
    const graphics = this.scene.add.graphics();

    const right = x + width;

    // Main mass of the terrain.
    graphics.fillStyle(COLORS.stoneDark, 1);
    graphics.fillRect(x, top, width, bottom - top);

    // Surface shape with subtle broken stone edges.
    const variation = type === "bridge" ? 2 : 4;

    graphics.fillStyle(COLORS.stone, 1);
    graphics.fillPoints([
      { x, y: top + variation },
      { x: x + width * 0.16, y: top },
      { x: x + width * 0.31, y: top + 2 },
      { x: x + width * 0.47, y: top - 1 },
      { x: x + width * 0.68, y: top + 1 },
      { x: right - 10, y: top },
      { x: right, y: top + variation },
      { x: right, y: top + 12 },
      { x, y: top + 12 },
    ], true);

    // Narrow, irregular surface highlight.
    graphics.lineStyle(1, COLORS.edge, 0.24);
    graphics.beginPath();
    graphics.moveTo(x + 8, top + 2);
    graphics.lineTo(x + width * 0.16, top);
    graphics.lineTo(x + width * 0.31, top + 2);
    graphics.lineTo(x + width * 0.47, top - 1);
    graphics.lineTo(x + width * 0.68, top + 1);
    graphics.lineTo(right - 10, top);
    graphics.strokePath();

    // Large masonry joints on the exposed face.
    graphics.lineStyle(1, COLORS.crack, 0.9);

    for (let blockX = x + 90; blockX < right - 20; blockX += 120) {
      graphics.lineBetween(
        blockX,
        top + 25,
        blockX - 3,
        Math.min(top + 62, bottom - 5)
      );
    }

    for (let rowY = top + 70; rowY < bottom - 10; rowY += 64) {
      graphics.lineBetween(
        x + 5,
        rowY,
        right - 5,
        rowY
      );
    }

    // Small worn blocks near the surface.
    graphics.fillStyle(COLORS.stoneLight, 0.38);

    for (let blockX = x + 24; blockX < right - 30; blockX += 150) {
      graphics.fillRect(blockX, top + 17, 34, 2);
    }

    graphics.setDepth(0);

    // Collision body is independent from the visual artwork.
    const collisionHeight = bottom - top;
    const collider = this.scene.add.rectangle(
      x + width / 2,
      top + collisionHeight / 2,
      width,
      collisionHeight,
      0x000000,
      0
    );

    this.scene.physics.add.existing(collider, true);
    this.terrain.push(collider);
  }

  findTerrainAt(x) {
    return this.terrainLayout.find(
      (section) => x >= section.x && x <= section.x + section.width
    );
  }
}