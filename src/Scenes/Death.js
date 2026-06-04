class Death extends Phaser.Scene {
    constructor() {
        super("death");
    }

    create() {
        this.title = this.add.text(0, 0, "GAME OVER", {
            fontSize: 48,
            align: "center"
        });
        this.title.x = game.config.width / 2 - this.title.width / 2;
        this.title.y = game.config.height * (3 / 8) - this.title.height / 2;

        this.instructions = this.add.text(0, 0, "Press SPACE to restart", {
            fontSize: 24,
            align: "center"
        });
        this.instructions.x = game.config.width / 2 - this.instructions.width / 2;
        this.instructions.y = game.config.height * (7 / 8) - this.title.height / 2;

        this.input.keyboard.addKey("SPACE").on("down", () => {
            this.scene.start("castle");
        })
    }
}