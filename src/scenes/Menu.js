class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        //loading audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion_1', 'assets/ah.wav');
        this.load.audio('sfx_explosion_2', 'assets/ohw.wav');
        this.load.audio('sfx_explosion_3', 'assets/roar.wav');
        this.load.audio('sfx_explosion_4', 'assets/screech.wav');
        this.load.audio('sfx_rocket', 'assets/fire_arrow.wav');
        this.load.audio('background_music', '' );
        this.load.image('backDrop', 'assets/scottish_landscape.png');
    }


    create() {
        //real menu
        let menuConfig = {
            fontFamily: "Mistral",
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#00000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'backDrop').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, 'DRAGON PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/5, 'Player 1 use <--> arrows to move & (J) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/5 + borderUISize*1.5, 'Player 2 use (A) & (D) keys to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/5 + borderUISize*2 + borderPadding*2, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        //define keys... again
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //eazy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 10
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hoooord mooode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
