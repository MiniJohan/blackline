// src/levels/Level1.js

import Environment from "../world/Environment.js";

import {
  WORLD,
  TERRAIN,
} from "./Level1Layout.js";

export default class Level1 {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const environment = new Environment(
      this.scene,
      {
        terrain: TERRAIN,
        ruins: [],
      },
      WORLD
    ).create();

    return {
      world: WORLD,
      terrain: environment.terrain,
    };
  }
}