// src/levels/Level1.js

import Environment from "../world/Environment.js";
import ParallaxBackground from "../world/ParallaxBackground.js";

const WORLD = {
  width: 2400,
  height: 720,
};

// Each section defines a walkable surface.
// Gaps between sections create traversal challenges.
const TERRAIN = [
  // 1. Entrance courtyard
  { x: 0, width: 620, top: 640, type: "floor" },

  // 2. Broken passage
  { x: 680, width: 230, top: 610, type: "ruins" },
  { x: 910, width: 180, top: 610, type: "bridge" },
  { x: 1090, width: 210, top: 570, type: "ruins" },

  // 3. Lower approach to the deeper ruins
  { x: 1370, width: 340, top: 640, type: "floor" },

  // 4. Raised ancient walkway
  { x: 1710, width: 220, top: 590, type: "ruins" },
  { x: 1930, width: 150, top: 590, type: "bridge" },

  // 5. Deeper ruined courtyard
  { x: 2080, width: 320, top: 640, type: "floor" },
];

export default class Level1 {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const background = new ParallaxBackground(this.scene);
    background.create();

    const environment = new Environment(
      this.scene,
      TERRAIN,
      WORLD
    ).create();

    return {
      world: WORLD,
      terrain: environment.terrain,
    };
  }
}