//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, isP2) {
        super(scene, x, y, texture);

        //add object to existing scene
        scene.add.existing(this);
        // track rocket's firing status
        this.isFiring = false;
        // pixels per frame
        this.moveSpeed = 2;
        // rocket sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.isP2 = isP2;
    }

    update() {
        
        if(!this.isP2) {
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                } 
            }
    
            //fire button
            if(Phaser.Input.Keyboard.JustDown(keyJ)) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
         
            
    
            //if tired, move up
            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed;
                
                
            }
    
            // reset on miss
            if(this.y <= borderUISize* 3 + borderPadding) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }
            
        
    }
        
        
        //player 2
        if(this.isP2) {
                if(!this.isFiring) {

                    if(keyA.isDown && this.x >= borderUISize + this.width) {
                        this.x -= this.moveSpeed;
                    } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                        this.x += this.moveSpeed;
                    } 
                }
    
                //fire button
                if(Phaser.Input.Keyboard.JustDown(keyF)) {
                    this.isFiring = true;
                    this.sfxRocket.play();
                }
            }
    
                //if tired, move up
                if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                    this.y -= this.moveSpeed;
                }
    
                // reset on miss
                if(this.y <= borderUISize* 3 + borderPadding) {
                    this.isFiring = false;
                    this.y = game.config.height - borderUISize - borderPadding;
        
                }
               
            
        
        }

    
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
    
}