// src/world/Environment.js

import TerrainBuilder from "./TerrainBuilder.js";

export default class Environment {
  constructor(scene, layout, world) {
    this.scene = scene;
    this.layout = layout;
    this.world = world;
  }

  create() {
    const terrain = new TerrainBuilder(
      this.scene,
      this.layout.terrain,
      this.world
    ).create();

    return { terrain };
  }
}