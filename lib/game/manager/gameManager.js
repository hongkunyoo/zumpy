ig.module(
	'game.manager.gameManager'
)
.requires(
	'game.levels.basic',
    'game.manager.blockManager'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  게임의 성공, 실패 확인하는 모듈
    //  전역적인 변수 사용을 위한 namespace 제공
    //
    //////////////////////////////////////////////////////////////
    GameManager = ig.Class.extend({

        // Global Variables
        PLAYER_LIFE: 0,
        COIN: 0,
        HEART: 0,
        SCORE: 0,
        JUMP: 0,
        TIME: 0,
        LEVEL: 1,
        GAME_TIMER: new ig.Timer(0),

        DEBUG_MODE : 1,

        PAUSE: false,

        player: null,
        END: false,

        SUPER_JUMPY: false,
        suerTimer: new ig.Timer(5),


        /////////////////////////////////////
        // 레벨링 관련 변수들
        /////////////////////////////////////

        blockSpeed: { x: -200, y: 0 },
        floorSpeed: { x: -200, y: 0 },
        vanishBlockTime: new ig.Timer(20),
        vanishBlockSpeed: 0.007,
        itemSpeed: 0.5,


        staticInstantiate: function () {
            if (GameManager.instance == null) {
                return null;
            }
            else {
                return GameManager.instance;
            }
        },

        init: function () {
            GameManager.instance = this;
            //UM.timeUp();   // 데이터 리셋
            //UM.clickEvent();
        },
        
        loadLevel: function(){
                
            ig.game.loadLevel(LevelBasic);  // 레벨 로딩

            this.COIN = 0;
            this.HEART = 1;
            this.SCORE = 0;
            this.JUMP = 5;
            this.TIME = 0;
            this.LEVEL = 1;
            this.PAUSE = false;
            this.END = false;

            //UM.startGame(); // 게임 시작(투명레이어 제거)
            this.setLevel(this.LEVEL);

            //$('#coin .number').html("x " + GM.JUMP);
            //$('#heart .number').html("x " + GM.HEART);

            // initiate stage variables
            TM.player = ig.game.spawnEntity(EntityPlayer, ig.system.realWidth / 2 + 150, 350);
            this.player = TM.player;
            //this.player.makeInvincible();
            BM.generate(BlockManager.TYPE.SIZE_60, ig.system.realWidth/2 + 150, 400);
            //TM.player = ig.game.getEntitiesByType(EntityPlayer)[0];
        },

        update: function () {
            

            if (this._isFinished()) {
                if (!this.PAUSE) {
                    this.PAUSE = true;    // 게임 중단
                    //UM.finishGame();    // 게임 종료(투명레이어, retry 버튼)
                }
            }


            if (this.GAME_TIMER.delta() > 30) {
                this.GAME_TIMER.reset();
                this.LEVEL++;
                this.setLevel(this.LEVEL);
            }

            if (this.SUPER_JUMPY) {
                if (this.suerTimer.delta() > 0) {
                    this.SUPER_JUMPY = false;
                    this.player.currentAnim.alpha = 1;
                }
            }
        },

        _isFinished: function () {
            // 하트 기준으로 종료 확인
            /*
            if (this.END) {
                return true;
            } else {
                return false;
            }
            */

            if (this.HEART <= 0) {
                return true;
            } else {
                return false;
            }
        },

        superZumpy: function () {
            this.player.currentAnim.alpha = 0.85;
            this.suerTimer.reset();
            this.SUPER_JUMPY = true;
        },

        setLevel: function (level) {
            this.blockSpeed = { vel: { x: -160 - level * 40, y: 0 }};
            this.floorSpeed = { vel: { x: -160 - level * 40, y: 0 } };
            this.vanishBlockTime.set(30);
            this.vanishBlockSpeed = 0.005 + 0.002 * level;
            this.itemSpeed = 0.4;

        }
    });
    GameManager.instance = null;
});
