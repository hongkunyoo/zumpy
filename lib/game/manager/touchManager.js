ig.module(
	'game.manager.touchManager'
)
.requires(
	
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  사용자로부터 input을 받아 player를 움직이게 하는 manager
    //
    //////////////////////////////////////////////////////////////
    TouchManager = ig.Class.extend({

        // player가 점프하게 될 양
        jumpGage: 0,
        // player의 방향
        flip: 1,
        player: null,

        staticInstantiate: function () {
            if (TouchManager.instance == null) {
                return null;
            }
            else {
                return TouchManager.instance;
            }
        },

        init: function () {

            TouchManager.instance = this;

        },

        update: function () {

            if (this.player.vel.y != 0) this.player.vel.x = 42;

            if (ig.input.pressed("touch")) {
                if (!GM.SUPER_JUMPY && this.player.jump) {
                    if (GM.JUMP > 0) {
                        this.player.vel.y = -700;
                        //UM.decreaseJump();
                    }
                }
                else
                    this.player.vel.y = -700;
            }
        }
    });
TouchManager.instance = null;

});
