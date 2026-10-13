// src/world/ParallaxBackground.js

const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 720;

export default class ParallaxBackground {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.createAtmosphere();
    this.createDistantRuins();
    this.createGothicRuins();
  }

  createAtmosphere() {
    const graphics = this.scene.add.graphics();

    // Very subtle light behind the distant architecture
    graphics.fillStyle(0x101014, 0.45);
    graphics.fillEllipse(1200, 390, 1900, 500);

    // Faint distant light points
    graphics.fillStyle(0x777780, 0.35);

    for (let i = 0; i < 36; i++) {
      const x = (i * 173 + 71) % WORLD_WIDTH;
      const y = 100 + ((i * 97) % 340);

      graphics.fillCircle(x, y, i % 5 === 0 ? 1.5 : 1);
    }

    graphics.setScrollFactor(0.04);
    graphics.setDepth(-100);
  }

  createDistantRuins() {
    const graphics = this.scene.add.graphics();

    // Distant, almost black mountains
    graphics.fillStyle(0x09090c, 1);

    graphics.fillPoints([
      { x: 0, y: 490 },
      { x: 180, y: 350 },
      { x: 320, y: 440 },
      { x: 520, y: 300 },
      { x: 700, y: 455 },
      { x: 920, y: 340 },
      { x: 1110, y: 440 },
      { x: 1320, y: 315 },
      { x: 1510, y: 430 },
      { x: 1740, y: 330 },
      { x: 1940, y: 450 },
      { x: 2160, y: 350 },
      { x: 2400, y: 465 },
      { x: 2400, y: 640 },
      { x: 0, y: 640 },
    ], true);

    // Distant ruined towers
    for (let i = 0; i < 15; i++) {
      const x = i * 175 + 35;
      const width = 45 + ((i * 19) % 35);
      const height = 100 + ((i * 43) % 125);
      const y = 555 - height;

      graphics.fillStyle(0x0b0b0e, 1);
      graphics.fillRect(x, y, width, height);

      // Broken tower tops
      graphics.fillPoints([
        { x, y },
        { x: x + width * 0.35, y: y - 22 },
        { x: x + width * 0.55, y: y + 2 },
        { x: x + width, y: y - 10 },
        { x: x + width, y: y + 10 },
        { x, y: y + 10 },
      ], true);
    }

    graphics.setScrollFactor(0.12);
    graphics.setDepth(-90);
  }

  createGothicRuins() {
    const graphics = this.scene.add.graphics();

    // Large ruined architectural silhouettes
    for (let i = 0; i < 9; i++) {
      const x = i * 290 + 50;
      const width = 110 + ((i * 31) % 55);
      const height = 170 + ((i * 47) % 120);
      const bottom = 615;
      const top = bottom - height;

      graphics.fillStyle(0x0e0e12, 1);

      // Main tower
      graphics.fillRect(x, top + 35, width, height - 35);

      // Pointed gothic roof
      graphics.fillPoints([
        { x: x - 8, y: top + 38 },
        { x: x + width * 0.5, y: top - 24 },
        { x: x + width + 8, y: top + 38 },
      ], true);

      // Narrow side buttresses
      graphics.fillRect(x - 9, top + 65, 12, height - 65);
      graphics.fillRect(x + width - 3, top + 65, 12, height - 65);

      // Tall, narrow window recesses
      graphics.fillStyle(0x050507, 1);

      for (let windowX = x + 22; windowX < x + width - 12; windowX += 31) {
        graphics.fillRect(windowX, top + 65, 5, 35);
      }

      // Faint stone edges
      graphics.lineStyle(1, 0x29292f, 0.35);
      graphics.lineBetween(x, top + 40, x, bottom);
      graphics.lineBetween(x + width, top + 40, x + width, bottom);
    }

    // Broken pointed arches between structures
    graphics.lineStyle(2, 0x222228, 0.55);

    for (let i = 0; i < 5; i++) {
      const x = i * 470 + 210;
      const baseY = 610;
      const archWidth = 150;
      const archHeight = 170;

      graphics.beginPath();
      graphics.moveTo(x, baseY);
      graphics.lineTo(x, baseY - archHeight * 0.55);
      graphics.lineTo(x + archWidth * 0.5, baseY - archHeight);
      graphics.lineTo(x + archWidth, baseY - archHeight * 0.55);
      graphics.lineTo(x + archWidth, baseY);
      graphics.strokePath();

      // Small broken section at the arch's peak
      graphics.lineStyle(2, 0x222228, 0.3);
      graphics.lineBetween(
        x + archWidth * 0.5,
        baseY - archHeight,
        x + archWidth * 0.5 + 15,
        baseY - archHeight + 20
      );

      graphics.lineStyle(2, 0x222228, 0.55);
    }

    graphics.setScrollFactor(0.28);
    graphics.setDepth(-80);
  }
}