ig.module(
	'game.manager.blockManager'
)
.requires(
	'game.entities.block'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  각각의 block들은 weltmeister를 통해서 생성되지 않아도 되기
    //  때문에 한개의 상위 class(block)를 만들고 실제 entity들은
    //  blockManager를 통해서 생성한다.
    //
    //////////////////////////////////////////////////////////////
    BlockManager = ig.Class.extend({

        timer: new ig.Timer(0.5),

        floorTimer: new ig.Timer(5),
        floorY: 580,
        map: {
            "block0": [],
            "block1": [],
            "block2": [],
            "block3": [],
            "block4": []
        },
        doVanishBlock: false,

        staticInstantiate: function () {
            if (BlockManager.instance == null) {
                return null;
            }
            else {
                return BlockManager.instance;
            }
        },

        init: function () {

            BlockManager.instance = this;

        },


        update: function () {

            var blocks = ig.game.getEntitiesByType(EntityBlock);
            for(var i = 0 ; i < blocks.length ; i++){
                if (blocks[i].pos.x < -200 && !blocks[i].pushed) {
                    this.returnToPool(blocks[i]);
                }
            }

            var type = this._blockSelector();
            var x = this._choosePos("x",type);
            var y = this._choosePos("y",type);
            
            if (this.timer.delta() > 0) {
                this.timer.reset();
                this.getFromPool(type, x, y);
            }
            if (this.floorTimer.delta() > 0) {
                this.floorTimer.reset();
                this.floorY = Math.random() * 1000 % 550 + 30;
            }
            //console.log(GM.blockSpeed);
            this._generateFloor(this.floorY);

            if (GM.vanishBlockTime.delta() > 0) {
                this._vanishBlock(GM.vanishBlockSpeed);
            }
        },

        _blockSelector: function () {
            
            return parseInt((Math.random() * 1000)) % BlockManager.getTypeLength();
        },

        _choosePos: function (axis,blockType) {
            var value
            if(axis == "x")
                value = ig.system.realWidth+5;
            else
                value = (Math.random() * 1000) % 565 + 10;
            return value;
        },

        _generateFloor: function (y) {
            
            if (this._isEmpty()) {
                this.getFromPool(BlockManager.TYPE.SIZE_120, 650, y);
            }
            
        },
        
        _isEmpty: function () {

            var ens = ig.game.getEntitiesByType(EntityBlock);
            for(var i = 0 ; i < ens.length ; i++){
                if (ens[i].pos.x > ig.system.realWidth - 90)
                    return false;
            }
            return true;
        },

        getFromPool: function (type, x, y) {
            if (this.map["block"+type].length == 0) {
                this.generate(type, x, y, GM.blockSpeed);
            }
            else {
                var block = this.map["block" + type].pop();
                block.pos.x = x;
                block.pos.y = y;
                
                block.vel = GM.blockSpeed.vel;
            }
        },

        returnToPool: function (block) {
            if (!block.pushed) {
                block.pushed = true;
                this.map["block" + block.blockType].push(block);
            }
        },

        _vanishBlock: function(speed){
            var blocks = ig.game.getEntitiesByType(EntityBlock);

            for(var i = 0 ; i < blocks.length ; i++){
                var b = blocks[i];
                if(b.pos.x > 0 && !b.pushed){
                    b.vanish(speed);
                }
            }

        },

        generate: function (TYPE, x, y, _settings) {
            
            switch (TYPE) {
                case BlockManager.TYPE.SIZE_40:
                    return ig.game.spawnEntity(EntityBlock, x, y, {
                        blockType: BlockManager.TYPE.SIZE_40,
                        animSheet: new ig.AnimationSheet('media/block4020.png', 40, 20),
                        size: { x: 40, y: 20 },
                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        },

                        _update: function () {

                        }
                    });

                case BlockManager.TYPE.SIZE_60:
                    return ig.game.spawnEntity(EntityBlock, x, y, {
                        blockType: BlockManager.TYPE.SIZE_60,
                        animSheet: new ig.AnimationSheet('media/block6020.png', 60, 20),
                        size: { x: 60, y: 20 },
                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        },

                        _update: function () {

                        }
                    });

                case BlockManager.TYPE.SIZE_80:
                    return ig.game.spawnEntity(EntityBlock, x, y, {
                        blockType: BlockManager.TYPE.SIZE_80,
                        animSheet: new ig.AnimationSheet('media/block8020.png', 80, 20),
                        size: { x: 80, y: 20 },
                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        },

                        _update: function () {

                        }
                    });

                case BlockManager.TYPE.SIZE_100:
                    return ig.game.spawnEntity(EntityBlock, x, y, {
                        blockType: BlockManager.TYPE.SIZE_100,
                        animSheet: new ig.AnimationSheet('media/block10020.png', 100, 20),
                        size: { x: 100, y: 20 },
                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        },

                        _update: function () {

                        }
                    });

                case BlockManager.TYPE.SIZE_120:
                    return ig.game.spawnEntity(EntityBlock, x, y, {
                        blockType: BlockManager.TYPE.SIZE_120,
                        animSheet: new ig.AnimationSheet('media/block12020.png', 120, 20),
                        size: { x: 120, y: 20 },
                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        },

                        _update: function () {

                        }
                    });
            }

        }


    });
    BlockManager.instance = null;
    BlockManager.TYPE = {
        SIZE_40: 0,
        SIZE_60: 1,
        SIZE_80: 2,
        SIZE_100: 3,
        SIZE_120: 4
    };

    BlockManager.getTypeLength = function(){
        var count = 0;
        for(var i in BlockManager.TYPE)
            count++;
        return count;
    };
});
