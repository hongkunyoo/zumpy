ig.module(
	'game.manager.itemManager'
)
.requires(
	'game.entities.item'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  게임에서 필요한 아이템 관련 사항 생성 및 관리
    //
    //////////////////////////////////////////////////////////////
    ItemManager = ig.Class.extend({

        timer: null,
        map: {
            item0: [],
            item1: [],
            item2: [],
            item3: []
        },

        staticInstantiate: function () {
            if (ItemManager.instance == null) {
                return null;
            }
            else {
                return ItemManager.instance;
            }
        },

        init: function () {
            this.timer = new ig.Timer(GM.itemSpeed);
            ItemManager.instance = this;

        },

        generate: function (TYPE, x, y, _settings) {
            switch (TYPE) {
                case ItemManager.TYPE.HEART:
                    return ig.game.spawnEntity(EntityItem, x, y, {
                        itemType: ItemManager.TYPE.HEART,
                        name: 'heart',
                        animSheet: new ig.AnimationSheet('media/heart3030.png', 30, 30),
                        size: { x: 30, y: 30 },

                        _init: function () {
                            this.addAnim('idle', 1, [0]);
                        },

                        _update: function () {
                        }
                    });

                case ItemManager.TYPE.COIN:
                    return ig.game.spawnEntity(EntityItem, x, y, {
                        itemType: ItemManager.TYPE.COIN,
                        name: 'coin',
                        animSheet: new ig.AnimationSheet('media/coin3030.png', 30, 30),
                        size: { x: 30, y: 30 },

                        _init: function () {
                            this.addAnim('idle', 1, [0]);
                        },

                        _update: function () {
                        }
                    });

                case ItemManager.TYPE.JUMP:
                    return ig.game.spawnEntity(EntityItem, x, y, {
                        itemType: ItemManager.TYPE.JUMP,
                        name: 'jump',
                        animSheet: new ig.AnimationSheet('media/monster3030_1.png', 30, 30),
                        size: { x: 30, y: 30 },

                        _init: function () {
                            this.addAnim('idle', 1, [0]);
                        },

                        _update: function () {
                        }
                    });

                case ItemManager.TYPE.SUPER_JUMP:
                    return ig.game.spawnEntity(EntityItem, x, y, {
                        itemType: ItemManager.TYPE.SUPER_JUMP,
                        name: 'super_jump',
                        animSheet: new ig.AnimationSheet('media/monster4040.png', 40, 40),
                        size: { x: 40, y: 40 },
                        flip: 1,

                        _init: function () {
                            this.addAnim('idle', 1, [0]);
                            this.currentAnim.alpha = 0.85;
                        },

                        _update: function () {
                            
                            this.currentAnim.alpha -= 0.025 * this.flip;

                            if (this.currentAnim.alpha > 0.9 || this.currentAnim.alpha < 0.2) this.flip *= -1;
                                
                            
                                
                        },

                        effect: function (other) {
                            
                        }
                    });
            }
        },

        update: function () {

            var items = ig.game.getEntitiesByType(EntityItem);
            for (var i = 0 ; i < items.length ; i++) {
                if (items[i].pos.x < -60 && !items[i].pushed) {
                    this.returnToPool(items[i]);
                }
            }

            var type = this._blockSelector();
            var x = this._choosePos("x", type);
            var y = this._choosePos("y", type);

            if (this.timer.delta() > 0) {
                this.timer.reset();
                this.getFromPool(type, x, y);
            }
        },

        _blockSelector: function () {
            
            var num = parseInt((Math.random() * 1000)) % 100;
            if (num > 7) return ItemManager.TYPE.JUMP;
            else if (num > 5 && num <= 7) return ItemManager.TYPE.SUPER_JUMP;
            else return ItemManager.TYPE.HEART;

        },

        _choosePos: function (axis, blockType) {
            var value
            if (axis == "x")
                value = ig.system.realWidth;
            else
                value = (Math.random() * 1000) % 565 + 10;;
            return value;
        },

        getFromPool: function (type, x, y) {
            if (this.map["item" + type].length == 0) {
                this.generate(type, x, y);
            }
            else {
                var block = this.map["item" + type].pop();
                block.pos.x = x;
                block.pos.y = y;
            }
        },

        returnToPool: function (item) {
            if (!item.pushed) {
                item.pushed = true;
                this.map["item" + item.itemType].push(item);
            }
        }
    });
    ItemManager.instance = null;
    ItemManager.TYPE = {
        HEART: 0,
        COIN: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

    ItemManager.getTypeLength = function () {
        var count = 0;
        for (var i in ItemManager.TYPE)
            count++;
        return count;
    };
});
