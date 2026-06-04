"use strict"

const game = new Phaser.Game({
    width: 512,
    height: 320,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
    },
    scene: [ Castle, Death ]
});