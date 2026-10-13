// src/world/Ruins.js

const COLORS = {
  stone: 0x151519,
  stoneMid: 0x1b1b20,
  stoneLight: 0x232329,
  stoneDark: 0x0b0b0e,
  recess: 0x050507,
  edge: 0x34343a,
};

export default class Ruins {
  constructor(scene, structures) {
    this.scene = scene;
    this.structures = structures;
  }

  create() {
    const graphics = this.scene.add.graphics();

    for (const structure of this.structures) {
      switch (structure.type) {
        case "tower":
          this.drawTower(graphics, structure);
          break;

        case "pillar":
          this.drawPillar(graphics, structure);
          break;

        case "wall":
          this.drawWall(graphics, structure);
          break;

        case "arch":
          this.drawArch(graphics, structure);
          break;
      }
    }

    graphics.setDepth(-1);
  }

  drawTower(graphics, structure) {
    const { x, bottom, width, height } = structure;
    const top = bottom - height;
    const roof = Math.min(42, height * 0.23);

    // Main silhouette with a broken roofline.
    graphics.fillStyle(COLORS.stoneDark, 1);
    graphics.fillPoints([
      { x: x - 6, y: top + roof },
      { x: x + width * 0.28, y: top + roof - 8 },
      { x: x + width * 0.43, y: top + 2 },
      { x: x + width * 0.56, y: top + 13 },
      { x: x + width * 0.72, y: top + roof - 4 },
      { x: x + width + 5, y: top + roof },
      { x: x + width, y: bottom },
      { x, y: bottom },
    ], true);

    // Facade stays inside the silhouette.
    graphics.fillStyle(COLORS.stone, 1);
    graphics.fillPoints([
      { x: x + 5, y: top + roof + 5 },
      { x: x + width * 0.29, y: top + roof + 1 },
      { x: x + width * 0.44, y: top + 10 },
      { x: x + width * 0.56, y: top + 20 },
      { x: x + width - 5, y: top + roof + 5 },
      { x: x + width - 5, y: bottom - 3 },
      { x: x + 5, y: bottom - 3 },
    ], true);

    // Deep window recesses.
    graphics.fillStyle(COLORS.recess, 1);

    const count = width > 115 ? 3 : 2;
    const spacing = (width - 32) / count;

    for (let i = 0; i < count; i++) {
      const windowX = x + 16 + i * spacing;

      graphics.fillRoundedRect(
        windowX,
        top + roof + 35,
        8,
        Math.min(42, height * 0.22),
        3
      );
    }

    // A few masonry joints.
    graphics.lineStyle(1, COLORS.stoneDark, 0.9);
    graphics.lineBetween(
      x + 6,
      top + roof + 85,
      x + width - 6,
      top + roof + 85
    );
  }

  drawPillar(graphics, structure) {
    const { x, bottom, width, height } = structure;
    const top = bottom - height;

    // Broken capital.
    graphics.fillStyle(COLORS.stoneDark, 1);
    graphics.fillPoints([
      { x: x - 7, y: top + 13 },
      { x: x + 5, y: top + 5 },
      { x: x + width * 0.38, y: top + 9 },
      { x: x + width * 0.67, y: top },
      { x: x + width + 6, y: top + 14 },
      { x: x + width + 2, y: top + 23 },
      { x: x - 5, y: top + 23 },
    ], true);

    // Shaft and subtle central stone plane.
    graphics.fillStyle(COLORS.stone, 1);
    graphics.fillRect(
      x,
      top + 20,
      width,
      height - 20
    );

    graphics.fillStyle(COLORS.stoneLight, 0.25);
    graphics.fillRect(
      x + 5,
      top + 28,
      Math.max(2, width * 0.15),
      height - 40
    );

    // Broken masonry band.
    graphics.lineStyle(1, COLORS.stoneDark, 1);
    graphics.lineBetween(
      x,
      top + height * 0.56,
      x + width,
      top + height * 0.56
    );
  }

  drawWall(graphics, structure) {
    const { x, bottom, width, height } = structure;
    const top = bottom - height;

    // Continuous broken silhouette.
    graphics.fillStyle(COLORS.stoneDark, 1);
    graphics.fillPoints([
      { x, y: top + 17 },
      { x: x + width * 0.15, y: top + 8 },
      { x: x + width * 0.3, y: top + 21 },
      { x: x + width * 0.45, y: top + 2 },
      { x: x + width * 0.62, y: top + 14 },
      { x: x + width * 0.82, y: top + 5 },
      { x: x + width, y: top + 18 },
      { x: x + width, y: bottom },
      { x, y: bottom },
    ], true);

    // Main facade, inset from the silhouette.
    graphics.fillStyle(COLORS.stone, 1);
    graphics.fillRect(
      x + 5,
      top + 23,
      width - 10,
      height - 23
    );

    // Large, irregular masonry courses.
    graphics.lineStyle(1, COLORS.stoneDark, 0.95);

    for (let row = top + 48; row < bottom - 8; row += 39) {
      graphics.lineBetween(
        x + 5,
        row,
        x + width - 5,
        row
      );
    }

    for (let blockX = x + 38; blockX < x + width - 12; blockX += 51) {
      graphics.lineBetween(
        blockX,
        top + 25,
        blockX - 3,
        Math.min(bottom - 5, top + height * 0.68)
      );
    }

    // One or two dark, recessed openings.
    graphics.fillStyle(COLORS.recess, 1);

    const openingWidth = Math.min(15, width * 0.15);

    if (width > 70) {
      graphics.fillRect(
        x + width * 0.35,
        top + 35,
        openingWidth,
        Math.min(48, height * 0.3)
      );
    }
  }

  drawArch(graphics, structure) {
    const { x, bottom, width, height } = structure;
    const top = bottom - height;
    const thickness = Math.max(12, width * 0.1);
    const peak = x + width / 2;

    // Outer arch silhouette.
    graphics.fillStyle(COLORS.stoneDark, 1);
    graphics.fillPoints([
      { x, y: bottom },
      { x, y: top + height * 0.35 },
      { x: x + width * 0.18, y: top + height * 0.13 },
      { x: peak, y: top },
      { x: x + width * 0.82, y: top + height * 0.13 },
      { x: x + width, y: top + height * 0.35 },
      { x: x + width, y: bottom },
      { x: x + width - thickness, y: bottom },
      { x: x + width - thickness, y: top + height * 0.39 },
      { x: x + width * 0.73, y: top + height * 0.24 },
      { x: peak, y: top + height * 0.13 },
      { x: x + width * 0.27, y: top + height * 0.24 },
      { x: x + thickness, y: top + height * 0.39 },
      { x: x + thickness, y: bottom },
    ], true);

    // Subtle stone blocks along the arch.
    graphics.lineStyle(1, COLORS.stoneMid, 0.8);
    graphics.lineBetween(
      x + thickness,
      bottom - 32,
      x + width - thickness,
      bottom - 32
    );
  }
}