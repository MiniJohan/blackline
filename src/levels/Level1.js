// src/levels/Level1.js

import Environment from "../world/Environment.js";
import ParallaxBackground from "../world/ParallaxBackground.js";

const WORLD = {
  width: 2400,
  height: 720,
};

// Terrain layout belongs to this level.
// x = left edge, width = length, top = walking surface.
const TERRAIN = [
  { x: 0, width: 560, top: 640, type: "floor" },
  { x: 560, width: 280, top: 600, type: "ruins" },
  { x: 840, width: 200, top: 600, type: "bridge" },

  // Open gap
  { x: 1120, width: 360, top: 640, type: "floor" },
  { x: 1480, width: 220, top: 600, type: "ruins" },
  { x: 1700, width: 180, top: 600, type: "bridge" },

  // Second gap
  { x: 1940, width: 460, top: 640, type: "floor" },
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

    console.log("Environment result:", environment);
    console.log("Level result:", {
        world: WORLD,
        terrain: environment.terrain,
      });

    return {
      world: WORLD,
      terrain: environment.terrain,
    };
  }
}