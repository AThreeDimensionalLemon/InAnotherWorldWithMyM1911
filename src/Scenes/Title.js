class Title extends Phaser.Scene {
    constructor() {
        super("title");
    }

    create() {
        this.title = this.add.text(0, 0, "IN ANOTHER WORLD\nWITH MY M1911", {
            fontSize: 48,
            align: "center"
        });
        this.title.x = game.config.width / 2 - this.title.width / 2;
        this.title.y = game.config.height / 2 - this.title.height / 2;

        this.credits = this.add.text(0, 0, "By AThreeDimensionalLemon", {
            fontSize: 12,
            align: "center"
        });
        this.credits.x = game.config.width - this.credits.width;
        this.credits.y = game.config.height - this.credits.height;
    }
}