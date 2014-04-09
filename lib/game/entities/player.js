ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityPlayer = ig.Entity.extend({

        size: {x: 20, y: 48},
        offset: {x: 15, y: 0},
        //vel: { x: 0, y: -600 },
        //accel: { x: 0, y: 100 },
        maxVel : {x: 2000, y: 2000},
        //flip: 1,
        jump: false,

        animSheet: new ig.AnimationSheet('media/monster_sprite.png', 50, 50),
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

        invincible: true, 
        invincibleDelay: 2, 
        invincibleTimer: null,
        fixPosX: 0,
        flip: 1,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0,1,2,3]);
            this.addAnim('jump',0.1,[4,5,6,7,8,9]);
            //this.fixPosX = this.pos.x;
            this.invincibleTimer = new ig.Timer();
            //this.makeInvincible();
        },

        update: function () {
            if (this.invincible && this.invincibleTimer.delta() > this.invincibleDelay) {
                this.invincible = false; this.currentAnim.alpha = 1;
            }
            this.parent();

            if (this.vel.y < 0) {
                this.jump = true;
                this.currentAnim = this.anims.jump;
            }
            
            if (this.pos.x < -30 || this.pos.y > ig.system.realHeight + 10) {
                //GM.END = true;
                this.kill();
                //UM.decreaseHeart();
                if (GM.HEART > 0) {
                    TM.player = ig.game.spawnEntity(EntityPlayer, 150, 100);
                    GM.player = TM.player;
                }
            }

            if (GM.SUPER_JUMPY) {
                this.currentAnim.alpha -= 0.025 * this.flip;
                if (this.currentAnim.alpha > 0.9 || this.currentAnim.alpha < 0.2) this.flip *= -1;
            }

        },
        
        check: function (other) {
            if (other instanceof EntityBlock) {
                this.vel.x = 0;
                if (other.pos.y > this.pos.y) {
                    this.jump = false;
                    this.currentAnim = this.anims.idle;
                    this.currentAnim.alpha = 1;
                }
            }
        },
        
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },

        draw: function () {
            if (this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta() / this.invincibleDelay * 1;

            this.parent();
        }
    });
});
