"use strict"

const game = new Phaser.Game({
    width: 2240,
    height: 1400,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    render: {
        pixelArt: true
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
    },
    scene: []
});