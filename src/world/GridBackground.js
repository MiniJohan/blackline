// src/world/GridBackground.js

export default class GridBackground {
  constructor(scene) {
    this.scene = scene;
  }

  create(worldWidth, worldHeight) {
    const grid = this.scene.add.graphics();
    const spacing = 48;
    const majorSpacing = spacing * 5;

    // Subtle glow.
    grid.lineStyle(3, 0x7777a0, 0.025);

    for (let x = 0; x <= worldWidth; x += spacing) {
      grid.lineBetween(x, 0, x, worldHeight);
    }

    for (let y = 0; y <= worldHeight; y += spacing) {
      grid.lineBetween(0, y, worldWidth, y);
    }

    // Fine grid lines.
    grid.lineStyle(1, 0x7777a0, 0.07);

    for (let x = 0; x <= worldWidth; x += spacing) {
      grid.lineBetween(x, 0, x, worldHeight);
    }

    for (let y = 0; y <= worldHeight; y += spacing) {
      grid.lineBetween(0, y, worldWidth, y);
    }

    // Slightly brighter major divisions.
    grid.lineStyle(1, 0x9999bb, 0.09);

    for (let x = 0; x <= worldWidth; x += majorSpacing) {
      grid.lineBetween(x, 0, x, worldHeight);
    }

    for (let y = 0; y <= worldHeight; y += majorSpacing) {
      grid.lineBetween(0, y, worldWidth, y);
    }

    // Keep the grid in world space so the camera scrolls over it.
    grid.setScrollFactor(1);
    grid.setDepth(-100);
  }
}