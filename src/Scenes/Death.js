class Death extends Phaser.Scene {
    constructor() {
        super("death");
    }

    create() {
        this.text = this.add.text(0, 0, "GAME OVER", {
            fontSize: 48,
            align: "center"
        });
        this.text.x = game.config.width / 2 - this.text.width / 2;
        this.text.y = game.config.height / 2 - this.text.height / 2;
    }
}