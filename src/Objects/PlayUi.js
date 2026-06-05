class PlayUi {
    constructor(scene) {

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            height: game.config.height / 16,
            colorTheme: "0x97E5E8"
        }

        this.camera = scene.cameras.main;
        this.header = scene.add.rectangle(game.config.width / 2, this.configs.height / 2, game.config.width, this.configs.height, this.configs.colorTheme);
        this.header.setScrollFactor(0);
        this.footer = scene.add.rectangle(game.config.width / 2, game.config.height - this.configs.height / 2, game.config.width, this.configs.height, this.configs.colorTheme);
        this.footer.setScrollFactor(0);
    }
}