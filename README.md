Zumpy Web Version
==============

�� ������Ʈ�� ���� ��ü���� ������ �ľ��ϼ���.
ũ�� lib ���� �ȿ� entities, managers, levels ������ �ֽ��ϴ�.

 * entities
 * managers
 * levels
 

entities ����
--------------------

entities �ȿ��� ���״�� ���� �ȿ� �� �� ��ü���� ����ϴ� ����� ��Ƶ� ���Դϴ�.
�����̰� �����ؼ� ������ �� �մϴ�.

 * block : zumpy ���ΰ��� �پ�ٴϴ� ��
 * item : zumpy ���ΰ��� �������� �Դ� ��ü
 * player : ���ΰ�

item.js�� check function�� ���ø� �ڽ��� �������� �����̳�(heart, coin ��)�� ���� �ٸ� ���۵��� �ϴ� ���� ���� �� �ֽ��ϴ�.
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


levels ����
--------------------

levels ���� �ȿ� level�� ��� �� �������� ���Դϴ�. ������ ��� ������ �ϴ� ���� 
manager �ȿ� blockManager�Դϴ�. ����� �ο��� ���⸦ ������ �� ������ �׶��� ���ߵ��� zumpy������ ���� �տ��� �ڷ� ������.


manager ����
--------------------

 * blockManager : ������ ���� �ð��� ���� �������� �����Ͽ��� ȭ������ �����̰� �ϴ� Manager
 * gameManager : ������ ��ü���� �帧�� �����ϴ� ��
 * itemManager : item���� ���ڰ� �˸°� �ѷ��ִ� ��
 * touchManager : ����� �Է��� ó���ϴ� ��

�ؿ� �ڵ带 ���ø� ��κ��� Manager Class ���� ������ ���� �Լ��� �ִ� ���� �� �� ���� ���Դϴ�.
�̰Ŵ� ImpactJS���� ��ü������ ���� Singleton ��ü ���� ����Դϴ�.
�׳� �̷��� �ڵ��ϸ� var myManager = new MyManager(); �� �Ͽ��� �� �ϳ��� ��ü���� ����Ѵٰ� �����Ͻø� �˴ϴ�.
Ȥ�� Singleton�� ���� �𸣽ô� ����,
 * [Singleton](http://itdp1024.tistory.com/entry/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%8B%B1%EA%B8%80%ED%86%A4-%ED%8C%A8%ED%84%B4-Singleton-Pattern)
 ���⳪ ���ͳݿ��� '�̱���'�̶�� ġ�� ���� ����. �̹� ��ȸ�� �ѹ� �˾ƺ���.

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


### touchManager

���� touchManager�� ���ø� update �ܿ��� ���� ������ �ϴ� �ڵ尡 �ֽ��ϴ�.
zumpy ���� ��� �������� ������ ���� ���� �Ӹ� �ƴ϶� �� �Ҽ� �ֽ��ϴ�.
�׷��� ���ø� GM.JUMP > 0 �� ������ 0���� ũ���� ����ؼ� ���� ������ �� �� �ְ� �߽��ϴ�.
�׸��� ������ ���ִ� �ڵ�� ���� �����մϴ�.
`this.player.vel.y = -700;` �䷸�Ը� ���ָ� ��~!
�ٵ� ���� this.player ��� �Ǿ� �ִµ� ó���� ������ ������ �� touchManager�� �������� player�� ��������� �մϴ�.
�ƴϸ� this.player�� null�� ���� ������ ��������.

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

���������� main.js�� ���ø� ����� Ű ���ε� �۾��� ������ ���� �ڵ带 �� �� �ִµ�,

```javascript
GM = new GameManager();
IM = new ItemManager();
TM = new TouchManager();
BM = new BlockManager();
```

�̷��� �ϸ� Impact ��� ���������� GM.gameStart(); �̷��� �ƹ��볪���� ȣ���Ҽ� �ֽ��ϴ�.
(Global�ϰ� ����ϰ� ����)

