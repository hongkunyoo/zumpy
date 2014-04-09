Zumpy Web Version
==============

이 프로젝트를 보고 전체적인 구조를 파악하세요.
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

levels 폴더 안에 level은 사실 빈 껍때기일 뿐입니다. 실제로 모든 역할을 하는 놈은 
manager 안에 blockManager입니다. 윤희랑 민예는 여기를 봐야할 것 같은데 그때도 말했듯이 zumpy에서는 블럭을 앞에서 뒤로 보냈음.


manager 폴더
--------------------

 * blockManager : 블럭들을 일정 시간에 일정 간격으로 생성하여서 화면으로 내보이게 하는 Manager
 * gameManager : 게임의 전체적인 흐름을 관장하는 놈
 * itemManager : item들을 예쁘고 알맞게 뿌려주는 놈
 * touchManager : 사용자 입력을 처리하는 놈

보시면 대부분의 Manager Class 들은 다음과 같은 함수가 있는 것을 볼 수 있을 것입니다.
이거는 ImpactJS에서 자체적으로 만든 Singleton 객체 생성 방법입니다.
그냥 이렇게 코딩하면 var myManager = new MyManager(); 를 하여도 단 하나의 객체만을 사용한다고 생각하시면 됩니다.
혹시 Singleton이 뭔지 모르시는 분은,
### See also

  * [Singleton](http://itdp1024.tistory.com/entry/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%8B%B1%EA%B8%80%ED%86%A4-%ED%8C%A8%ED%84%B4-Singleton-Pattern)
  여기나 인터넷에서 '싱글톤'이라고 치면 많이 나옴. 이번 기회에 한번 알아보셈.

```javascript
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