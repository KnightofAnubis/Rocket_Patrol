    
    class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //loading image/sprites
        this.load.image('p1_rocket', 'assets/p1_arrow.png');
        this.load.image('p2_rocket', 'assets/p2_arrow.png' );
        this.load.image('spaceship', 'assets/dragon_2.png');
        this.load.image('dragon', 'assets/dragon_1.png');
        this.load.image('sky', 'assets/game_background(5).png');
        this.load.image('mountain', 'assets/game_background(4).png');
        this.load.image('castle', 'assets/game_background(3).png');
        this.load.image('hills', 'assets/game_background(2).png');
        this.load.image('front', 'assets/game_background(1).png');
        this.load.image('particle', 'assets/blood.png');
        
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        
        

        //parallax scrolling?
        this.add.image(width * 0.5, height * 0.5, 'sky').setOrigin(0.5, 0.5).setScrollFactor(0);
        this.mountain = this.add.tileSprite(0, 0,640, 480, 'mountain').setOrigin(0,-0.1);
        this.castle = this.add.tileSprite(0, 0,640, 480, 'castle').setOrigin(0,0);
        this.hills = this.add.tileSprite(0, 0,640, 480, 'hills').setOrigin(0,0);
        this.front = this.add.tileSprite(0, 0,640, 480, 'front').setOrigin(0,0);


       
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 1).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 1).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 1).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width - borderUISize, borderPadding*9.8, 'dragon', 0, 40, 3).setOrigin(0,0);
        this.ship03.setScale(.6);
        this.ship03.setSize(60,10);
        this.ship02.setScale(.6);
        this.ship02.setSize(60,10);
        this.ship01.setScale(.6);
        this.ship01.setSize(60, 10);
        this.ship04.setScale(.6);
        this.ship04.setSize(60,10);

        //rocket bar
        this.add.rectangle(0, game.config.height - borderUISize*1.5, game.config.width, borderUISize, 0x008080).setOrigin(0, 0);
         //green
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize *2, 0x008080).setOrigin(0,0);
        //white
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p1_rocket', false).setOrigin(0.5, 0);
        this.p1Rocket.setScale(1);
        
        //player 2
        this.p2Rocket = new Rocket(this,  game.config.width/3, game.config.height - borderUISize - borderPadding, 'p2_rocket', true).setOrigin(0.5, 0);
        this.p2Rocket.setScale(1);
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //can a player fire
        this.P1canFire = true;
        P1canFire = this.P1canFire;
        this.P2canFire = false;
        P2canFire = this.P2canFire;
        //player 2 keys 
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        //display score
        let scoreConfig = {
            fontFamily: 'Mistral',
            fontSize: '28px',
            backgroundColor: '#000080',
            color: '#00ffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        
        //initialize score
        this.p1Score = 0;
        this.scoreLeft = this.add.text(game.config.width - borderUISize*4 - borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        //new initialize score
        this.p2Score = 0;
        this.scoreRight = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        
        //highscore
        this.highScore = 100;
        
        //game over flag
        this.gameOver = false;
        

        //60-sec play clock
        
        /*this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart of <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);*/
        this.time = this.add.text(game.config.width/2.3, borderUISize + borderPadding*2, '', scoreConfig);
        this.startTime = Math.floor(this.sys.game.loop.time/1000); //converts it to normal seconds not the 6000 in the tutorial
        
        //Background music
        this.sound.audioPlayDelay = 0.1;
        this.sound.loopEndOffset = 0.05;
        
        const loopMarker = {
            name: 'loop',
            start: 0,
            duration: 34,
            config: {
                volume: 0.2,
                loop: true
            }
        };

        this.music =  this.sound.add('background_music');
        
        
        if (!this.sound.locked)
        {
            // already unlocked so play
            this.music.addMarker(loopMarker);
            this.music.play('loop', {
                delay: 0
            });
        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.addMarker(loopMarker);
                this.music.play('loop', {
                    delay: 0
                });
            });
        }
        
        
    }


    update() {
        

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scrolling position
        this.mountain.tilePositionX -= 1;
        this.castle.tilePositionX -= 2.5;
        this.hills.tilePositionX -= 2.5;
        this.front.tilePositionX -= 4;


        if (!this.gameOver) {
            /*timer display that was helped by Yasha Bell... I understood I need to get the game settings times from the Menu scene, but wasn't sure
            how to implement the count down and everything I could find wanted to add and Event, but that didn't work for me.*/
            this.currentTime = (Math.floor(this.sys.game.loop.time/1000) - this.startTime).toString();
            this.time.setText(`Time: ${game.settings.gameTimer - this.currentTime }`);
            if(this.currentTime > game.settings.gameTimer) {
                scoreConfig.fixedWidth = 0; 
                this.music.pause();
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
        }
            if(this.p1Score > 1000){
                scoreConfig.fixedWidth = 0; 
                this.music.pause();
                this.add.text(game.config.width/2, game.config.height/2, 'P1 Won!', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
            if(this.p2Score > 1000){
                scoreConfig.fixedWidth = 0; 
                this.music.pause();
                this.add.text(game.config.width/2, game.config.height/2, 'P2 Won!', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
            this.p1Rocket.update();
            //new player
            this.p2Rocket.update();
            //update spaceships(x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        


        //check collisions for player 1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
            
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
            
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship04);
            
        }
        //check collisions for player 2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship04);
        }

        
    }

    checkCollision(rocket, ship) {
        //simple AABB checking fixing?
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }

    }

    shipExplode(rocket, ship) {
        //temp hide ship
        ship.alpha = 0;
        //particle emitter
        this.particles = this.add.particles(ship.x, ship.y, 'particle');
        
        this.add.particles(ship.x +30, ship.y + 30, 'particle', {
            scale: 0.5,
            speed: 100,
            lifespan: 300,
            gravityY: 700,
            frequency: 5,
            duration: 500,
        });
        
        ship.reset();
        ship.alpha = 1;


        //score add and repaint??
        if (rocket == this.p1Rocket) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            game.settings.gameTimer += ship.points/10;
            
        }

        if (rocket == this.p2Rocket) {
        //p2 score 
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
            game.settings.gameTimer += ship.points/10;
        }

        //I had to modify it but the concept for this was taken from Tobe Osakwe's https://gist.github.com/thosakwe/bade2c36c81f41b4a17e6482797dd598
        this.sounds = ["sfx_explosion_1","sfx_explosion_2","sfx_explosion_3", "sfx_explosion_4"];
        var index = Math.round(Math.random() * this.sounds.length);  
        var sound = this.sounds[index];
        if (!sound) {
            sound = "sfx_explosion_4";
        }
        this.sound.volume = 1;
        this.sound.play(sound);
    }

        
    
}
