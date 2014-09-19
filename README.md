Zumpy Web Version
==============

이 프로젝트는 2012 Windows 8 App Star 게임 부문 동상을 수상한 Zumpy를 웹에 올린 것입니다.

크게 lib 폴더 안에 entities, managers, levels 폴더가 있습니다.

 * entities
 * managers
 * levels
 

entities 폴더
--------------------

entities 안에는 말그대로 게임 안에 들어갈 각 객체들을 담당하는 놈들을 모아둔 곳입니다.
진형이가 집중해서 봐야할 듯 합니다.

 * block : zumpy 주인공이 뛰어다니는 블럭
 * item : zumpy 주인공이 아이템을 먹는 객체
 * player : 주인공

item.js에 check function을 보시면 자신의 아이템이 무엇이냐(heart, coin 등)에 따라 다른 동작들을 하는 것을 보실 수 있습니다.
### item.js
```javascript
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
}
```


levels 폴더
--------------------

levels 폴더 안에 level은 사실 빈 껍때기일 뿐입니다. 실제로 모든 역할을 하는 것은 
manager 안에 blockManager입니다.


manager 폴더
--------------------

 * blockManager : 블럭들을 일정 시간에 일정 간격으로 생성하여서 화면으로 내보이게 하는 Manager
 * gameManager : 게임의 전체적인 흐름을 관장하는 manager
 * itemManager : item들을 예쁘고 알맞게 뿌려주는 manager
 * touchManager : 사용자 입력을 처리하는 manager



### touchManager

여기 touchManager에 보시면 update 단에서 이중 점프를 하는 코드가 있습니다.
zumpy 같은 경우 아이템을 먹으면 이중 점프 뿐만 아니라 더 할수 있습니다.
그래서 보시면 GM.JUMP > 0 의 변수가 0보다 크면은 계속해서 공중 점프를 할 수 있게 했습니다.
그리고 점프를 해주는 코드는 정말 간단합니다.
`this.player.vel.y = -700;` 요렇게만 해주면 끝~!
근데 보면 this.player 라고 되어 있는데 처음에 게임을 시작할 때 touchManager에 누군가가 player를 대입해줘야 합니다.
아니면 this.player에 null이 들어가서 에러가 나겠지요.

```javascript
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
```


main.js
--------------------

마지막으로 main.js에 보시면 사용자 키 바인딩 작업과 다음과 같은 코드를 볼 수 있는데,

```javascript
GM = new GameManager();
IM = new ItemManager();
TM = new TouchManager();
BM = new BlockManager();
```

이렇게 하면 Impact 어느 곳에서든지 GM.gameStart(); 이렇게 아무대나에서 호출할수 있습니다.
(Global하게 사용하게 위함)

