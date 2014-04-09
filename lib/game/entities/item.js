ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityItem = ig.Entity.extend({

        //vel: {},
        accel: { x: 0, y: 15 },
        maxVel : {x: 2000, y: 2000},
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        pushed: false,

        _init: null,
        _update: null,

        init: function (x, y, settings) {
            this.parent(x, y, settings);

            if (this._init != null) this._init();
        },

        update: function () {

            this.parent();

            if (this._update != null) this._update();

            if (this.pos.y < 0)
                this.kill();
        },

        check: function (other) {
            if (this.name == 'heart') {
                //UM.addHeart();
            } else if (this.name == 'coin') {
                //UM.addCoin();
            } else if (this.name == 'jump') {
                //UM.addJump();
            } else if (this.name == 'super_jump') {
                GM.superZumpy();
            }

            this.kill();
        },

        collideWith: function (other, axis) {

        }

    });
});
