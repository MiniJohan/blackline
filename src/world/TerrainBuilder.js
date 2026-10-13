
// src/world/TerrainBuilder.js

const COLORS = {
  base: 0x0b0b0e,
  stone: 0x17171b,
  stoneMid: 0x1c1c21,
  stoneLight: 0x25252a,
  shadow: 0x08080a,
  edge: 0x777780,
};

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
    const { x, width, top, type } = section;
    const right = x + width;
    const bottom = this.world.height;

    const graphics = this.scene.add.graphics();

    this.drawStoneMass(graphics, x, right, top, bottom);
    this.drawSurface(graphics, x, width, top, type);
    this.drawMasonry(graphics, x, width, top, bottom);
    this.drawDamage(graphics, x, width, top, bottom);

    graphics.setDepth(0);

    this.createCollider(section);
  }

  drawStoneMass(graphics, x, right, top, bottom) {
    // Deep shadow behind the exposed stone face.
    graphics.fillStyle(COLORS.base, 1);
    graphics.fillRect(
      x,
      top,
      right - x,
      bottom - top
    );

    // Uneven rock silhouette along the sides.
    graphics.fillStyle(COLORS.stone, 1);
    graphics.fillPoints([
      { x, y: top + 4 },
      { x: x + 18, y: top },
      { x: x + 34, y: top + 3 },
      { x: x + 43, y: top + 12 },
      { x: right - 32, y: top + 9 },
      { x: right - 17, y: top + 2 },
      { x: right, y: top + 5 },
      { x: right, y: bottom },
      { x, y: bottom },
    ], true);

    // Irregular shadow pockets on the exposed face.
    graphics.fillStyle(COLORS.shadow, 0.9);

    for (let y = top + 100; y < bottom - 30; y += 137) {
      const inset = ((Math.floor(y / 137) % 2) * 21) + 12;

      graphics.fillPoints([
        { x: x + inset, y },
        { x: x + inset + 24, y: y + 8 },
        { x: x + inset + 19, y: y + 32 },
        { x: x + inset + 5, y: y + 39 },
        { x: x + inset - 3, y: y + 18 },
      ], true);
    }
  }

  drawSurface(graphics, x, width, top, type) {
    const right = x + width;
    const variation = type === "bridge" ? 2 : 5;

    // Top surface uses a single filled shape.
    graphics.fillStyle(COLORS.stoneMid, 1);
    graphics.fillPoints([
      { x, y: top + variation },
      { x: x + width * 0.11, y: top + 1 },
      { x: x + width * 0.22, y: top - 2 },
      { x: x + width * 0.34, y: top + 2 },
      { x: x + width * 0.47, y: top - 1 },
      { x: x + width * 0.61, y: top + 2 },
      { x: x + width * 0.75, y: top },
      { x: right - 16, y: top + 1 },
      { x: right, y: top + variation },
      { x: right, y: top + 13 },
      { x, y: top + 13 },
    ], true);

    // Worn edges are short and subtle, not a continuous outline.
    graphics.lineStyle(1, COLORS.edge, 0.22);

    graphics.lineBetween(
      x + 12,
      top + 2,
      x + width * 0.11,
      top + 1
    );

    graphics.lineBetween(
      x + width * 0.36,
      top + 2,
      x + width * 0.47,
      top - 1
    );

    graphics.lineBetween(
      x + width * 0.75,
      top,
      right - 16,
      top + 1
    );

    // Dark seam under the walking surface.
    graphics.lineStyle(2, COLORS.shadow, 0.85);
    graphics.lineBetween(
      x + 2,
      top + 13,
      right - 2,
      top + 13
    );
  }

  drawMasonry(graphics, x, width, top, bottom) {
    const right = x + width;
    const rowHeight = 57;

    for (
      let row = 0, y = top + 18;
      y < bottom - 12;
      row++, y += rowHeight
    ) {
      const offset = row % 2 === 0 ? 0 : 36;
      const blockWidth = 88 + (row % 3) * 12;

      for (
        let blockX = x + 8 + offset;
        blockX < right - 8;
        blockX += blockWidth
      ) {
        const availableWidth = right - 6 - blockX;
        const w = Math.min(blockWidth - 5, availableWidth);

        if (w < 18) continue;

        const h = rowHeight - 5;
        const variation = (row + Math.floor(blockX / 40)) % 3;

        // Large individual stone faces with irregular corners.
        graphics.fillStyle(
          variation === 0
            ? COLORS.stone
            : variation === 1
              ? COLORS.stoneMid
              : COLORS.stoneLight,
          variation === 2 ? 0.6 : 0.42
        );

        graphics.fillPoints([
          { x: blockX + 2, y: y + 2 },
          { x: blockX + w - 5, y: y + 1 },
          { x: blockX + w, y: y + 7 },
          { x: blockX + w - 2, y: y + h - 5 },
          { x: blockX + w - 8, y: y + h },
          { x: blockX + 5, y: y + h - 2 },
          { x: blockX, y: y + h - 9 },
        ], true);

        // Deep joint on one edge gives each block some depth.
        graphics.lineStyle(1, COLORS.shadow, 0.8);
        graphics.lineBetween(
          blockX + 5,
          y + h - 3,
          blockX + w - 8,
          y + h
        );
      }
    }
  }

  drawDamage(graphics, x, width, top, bottom) {
    const right = x + width;

    // A few deliberate chips and cracks.
    // Positions are deterministic so the art stays consistent.
    const details = [
      { x: 0.18, y: 0.29, length: 19 },
      { x: 0.73, y: 0.43, length: 27 },
      { x: 0.42, y: 0.66, length: 16 },
      { x: 0.81, y: 0.78, length: 22 },
    ];

    for (const detail of details) {
      const crackX = x + width * detail.x;
      const crackY = top + (bottom - top) * detail.y;

      if (crackX > right - 12) continue;

      graphics.lineStyle(2, COLORS.shadow, 0.9);
      graphics.beginPath();
      graphics.moveTo(crackX, crackY);
      graphics.lineTo(
        crackX - 4,
        crackY + detail.length * 0.45
      );
      graphics.lineTo(
        crackX + 3,
        crackY + detail.length
      );
      graphics.strokePath();
    }
  }

  createCollider(section) {
    const { x, width, top } = section;
    const height = this.world.height - top;

    // Keep physics independent from visual geometry.
    const collider = this.scene.add.rectangle(
      x + width / 2,
      top + height / 2,
      width,
      height,
      0x000000,
      0
    );

    this.scene.physics.add.existing(collider, true);
    this.colliders.push(collider);
  }
}