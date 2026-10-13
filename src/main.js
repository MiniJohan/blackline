import Phaser from "phaser";
import GameScene from "./GameScene.js";

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 1280,
    height: 720,
    backgroundColor: "#000000",

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },

    scene: [GameScene]
};

new Phaser.Game(config);