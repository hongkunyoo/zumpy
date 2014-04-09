var UM = function () { };

// 게임 
UM.showAll = function () {
    $('#coin .number').html("x " + GM.JUMP);
    $('#heart .number').html("x " + GM.HEART);
    UM.timeUp();    // 게임 시간 측정
    UM.showRanking();
};

UM.addCoin = function () {
    GM.COIN = GM.COIN + 1;
    $('#coin .number').html("x " + GM.COIN);
};

UM.addHeart = function () {
    GM.HEART = GM.HEART + 1;
    $('#heart .number').html("x " + GM.HEART);
};

UM.addJump = function () {
    GM.JUMP = GM.JUMP + 1;
    $('#coin .number').html("x " + GM.JUMP);
};

UM.decreaseJump = function () {
    GM.JUMP = GM.JUMP - 1;
    $('#coin .number').html("x " + GM.JUMP);
};

UM.decreaseHeart = function () {
    GM.HEART = GM.HEART - 1;
    $('#heart .number').html("x " + GM.HEART);
};

UM.decreaseCoin = function () {
    GM.COIN--;
    $('#coin .number').html("x " + GM.COIN);
};

UM.addScore = function () {
    $('#score.scoreBar').html(GM.SCORE);
};

UM.clickEvent = function () {
    $("#startBtn").click(function () {
        if (GM._isFinished()) {
            GM.loadLevel(); // 새로운 게임 로드
        }
        UM.startGame();
        GM.PAUSE = false;
    });
    $("#saveBtn").click(function () {
        UM.save($('#name').val(), GM.TIME);
        UM.showRanking();
        UM.showStartBtn();
    });
    $("#cancelBtn").click(function () {
        UM.showStartBtn();
    });

};

// 게임 시작
UM.startGame = function () {
    $('#transparent').hide();
    UM.showRanking();
};

UM.showStartBtn = function () {
    GM.PAUSE = true;
    $('#transparent').show();
    $('#startBtn').show();
    $('#finishPopup').hide();
};

// 게임 종료
UM.finishGame = function () {
    $('#transparent').show();
    $('#startBtn').hide();
    $('#finishPopup').show();
    UM.showTime('#resultTime');
   
};

// 시간 측정 및 보여줌
UM.timeUp = function () {
    var interval = null;

    function fillZero(src) {
        if (src.length == 1) {
            return '0' + src;
        } else {
            return src;
        }
    };

    var printTime = function () {
        if (!GM.PAUSE) {
            GM.TIME = GM.TIME + 1;
            var m = parseInt(GM.TIME / 60).toString();
            var s = parseInt(GM.TIME % 60).toString();
            $('#time.block').html(fillZero(m) + ":" + fillZero(s));
        }
    };

    interval = setInterval(printTime, 1000);
};

// 시간 출력 
UM.showTime = function(id) {
    function fillZero(src) {
        if (src.length == 1) {
            return '0' + src;
        } else {
            return src;
        }
    };

    var m = parseInt(GM.TIME / 60).toString();
    var s = parseInt(GM.TIME % 60).toString();
    $(id).html(fillZero(m) + ":" + fillZero(s));
    
};

// 저장
UM.save = function (i, s) {
    if (typeof (localStorage) == 'undefined') {
        alert('Local Storage is NOT AVAILABLE.');
    } else {
        try {
            var data = { id: 0 , score: 0 };
            var index = localStorage.length + 1;
            data.id = i;
            data.score = s;
            localStorage.setItem(index.toString(), JSON.stringify(data));
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('NOT ENOUGH SPACE!');
            }
        }
    }
};

// 랭킹 출력 
UM.showRanking = function () {
 // localStorage.clear();

    var list = new Array();

    for (var i = 1; i <= localStorage.length; i++) {
        var data = localStorage.getItem(i);
        var ndata = JSON.parse(data);
        list.push(ndata); // 저장된 값 호출
    }
    list.sort(compareScores);
    
    function compareScores(a, b) {
        return parseInt(b.score) - parseInt(a.score);
    }
    
    var length;
    if( localStorage.length >= 5 ) {
        length = 5;
    } else {
        lengh = localStorage.length;
    }
    
    for (var i = 0; i < length; i++) {
        var score = parseInt(list[i].score);
        var m = parseInt(score / 60).toString();
        var s = parseInt(score % 60).toString();
        $('.ranking').eq(i).html( i + 1 + ". " + list[i].id + " " + fillZero(m) + ":" + fillZero(s));
    }
    function fillZero(src) {
        if (src.length == 1) {
            return '0' + src;
        } else {
            return src;
        }
    };

};

