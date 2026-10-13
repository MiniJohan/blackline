// src/levels/Level1Layout.js

export const WORLD = {
  width: 2400,
  height: 720,
};

export const TERRAIN = [
  // Entrance courtyard
  { x: 0, width: 620, top: 640, type: "floor" },

  // Broken passage
  { x: 680, width: 230, top: 610, type: "ruins" },
  { x: 910, width: 180, top: 610, type: "bridge" },
  { x: 1090, width: 210, top: 570, type: "ruins" },

  // Lower courtyard
  { x: 1370, width: 340, top: 640, type: "floor" },

  // Raised walkway
  { x: 1710, width: 220, top: 590, type: "ruins" },
  { x: 1930, width: 150, top: 590, type: "bridge" },

  // Deeper courtyard
  { x: 2080, width: 320, top: 640, type: "floor" },
];

// Decorative architecture, placed independently
// from the walkable terrain.
export const RUINS = [
  { x: 100, bottom: 640, width: 110, height: 180, type: "tower" },
  { x: 330, bottom: 640, width: 50, height: 150, type: "pillar" },
  { x: 480, bottom: 640, width: 130, height: 120, type: "wall" },

  { x: 730, bottom: 610, width: 90, height: 150, type: "wall" },
  { x: 950, bottom: 610, width: 45, height: 180, type: "pillar" },

  { x: 1160, bottom: 570, width: 100, height: 190, type: "tower" },
  { x: 1510, bottom: 640, width: 140, height: 170, type: "wall" },

  { x: 1740, bottom: 590, width: 55, height: 140, type: "pillar" },
  { x: 1990, bottom: 590, width: 100, height: 155, type: "wall" },
  { x: 2180, bottom: 640, width: 130, height: 210, type: "tower" },

  { x: 520, bottom: 640, width: 150, height: 150, type: "arch" },
  { x: 1760, bottom: 590, width: 170, height: 165, type: "arch" },
];