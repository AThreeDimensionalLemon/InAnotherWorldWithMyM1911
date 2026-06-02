class Bullet {
    constructor(inSprite) {

        //configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75
        }

        //architecture
        this.sprite = inSprite;
    }
}