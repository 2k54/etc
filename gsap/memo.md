# GSAP

https://greensock.com/

GreenSock社が開発した高機能アニメーションライブラリ 現在GSAP 3
従来はTweenLite, TweenMax, TimelineLite, TimelineMaxとライブラリが分割されていましたが、軽量化によりひとつになりシンプルな記述が可能になりました。軽量かつ多機能、豊富なプラグインなどの特徴があり世界中で用いられています。
**※有料でしか見れないサイトで使うにはライセンス契約が必要**

とりあえず簡単にCDNで試す

https://greensock.com/get-started/

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
```

### gsap.to()

```html
<div id="test1">
  <div class="box1 box"></div>
  <div class="box2 box"></div>
  <div class="box3 box"></div>
</div>
```

```css
cssは自分がわかりやすいようにするために簡易的に色とサイズ指定くらいで試せます
positionはとりあえず特に指定しなくても大丈夫

.box {
  margin-bottom: 10px;
	width: 100px;
	height: 100px;
	background-color: gray;
}

ぐらいしか書いてない
```

```javascript
gsap.to("#test1 .box", {duration: 2, x: 300}); // 共通
gsap.to("#test1 .box3", {duration: 5, x: 300}); // ↑の設定後、個別みたいな書き方もできる

// gsap.to
// もっとも一般的なタイプ
// gsap.to("何を", {何秒かけて: 2, どこへ: 300});（↑で何をにidも指定してるのは便宜上）
// みたいな感じ
// boxを2秒かけて300px横に動く
// box3だけ　何秒かけてが5なので遅く動く
// これだけだと特にイベントトリガーがないのでページがロードされたら動く

// devtoolでみると
// divのstyle属性が激しく変わるのが確認できる
// 300 = デフォルトはpxなので%とか使いたければ '300%'かな？

// サイズを変えたり、回転したり
gsap.to(".box3", {duration: 5, x: 300, rotate: 50, scale: 0.5});

// 見て分かる通り、動いたあとの状態の設定を書いてくだけ
```

cssプロパティのショートコードの参考

| gsap           | css                          |
| -------------- | ---------------------------- |
| x: 100         | transform: translateX(100px) |
| y: 100         | transform: translateY(100px) |
| rotation: 360  | transform: rotate(360deg)    |
| rotationX: 360 | transform: rotateX(360deg)   |
| rotationY: 360 | transform: rotateY(360deg)   |
| skewX: 45      | transform: skewX(45deg)      |
| skewY: 45      | transform: skewY(45deg)      |
| scale: 2       | transform: scale(2, 2)       |
| scaleX: 2      | transform: scaleX(2)         |
| scaleY: 2      | transform: scaleY(2)         |
| xPercent: -50  | transform: translateX(-50%)  |
| yPercent: -50  | transform: translateY(-50%)  |

この表をみると %の移動は xPercent: 50 なのかな？
x: '50%' でも動いたけど
**ショートコードを使ってください、なぜならそっちのほうが動作が早いから　みたいなことが書いてあったよ**

ちなみに当たり前だけどJSなので font-sizeみたいな ケバブなプロパティは fontSize（キャメル）にしないとダメです

### gsap.from()

設定した値から何も指定ない状態へ変化

```javascript
gsap.from("test2 .box", {duration: 1, x: 100});

// 100px 右にあったものが
// 1秒かけて 0に戻る
// css側で left: 0;　などの指定はいらない
```

### gsap.fromTo()

開始と終了を両方設定できる

```javascript
gsap.fromTo("#test3 .box", {width: 0, height: 0}, {duration: 1.5, width: 100, height: 200});

// gsap.fromTo("何を", {この状態から}, {この状態へ});
```

とりあえずこの３つだけでもある程度はできそう

## イージング

```javascript
gsap.to("#test4 .box", {duration: 2, x: 200, ease: "bounce"});

// gsap.to("#test4 .box", {duration: 2, x: 200, ease: "イージングタイプの指定"});
// 簡単ですね
// 動きの参考は以下
// https://greensock.com/docs/v3/Eases/CustomEase
```

## staggers

staggersは直訳でよろめき（なぜよろめきで順番なのか？

```javascript
gsap.from(".box", {
  duration: 2,
  scale: 0.5, 
  opacity: 0, 
  delay: 0.5,
  stagger: 0.2, // ←これ！
  ease: "elastic", 
  force3D: true
});

// 自動で順番に動くようになる
// boxを何個も並べて試してみるとよい
// delayもかけているので自動で順番にふわふわーと出てくる
```

```javascript
// とりあえず staggerのとこだけ注目何をしているかは後で調べる
gsap.to(".box", 1, {
  scale: 0.1, 
  y: 60,
  yoyo: true,
  repeat: -1, // アニメーションの繰り返し回数。-1で無限回
  ease: "power1.inOut",
  delay:1,
  stagger: {
    amount: 1.5, //1.5秒おきに
    grid: "auto",
    from: "center" //どこからか
  }
});

// ボックスをマス目上に並べてこれを設定すると美しいアニメーションが見れる
```

## コールバック

特定のアニメーション関連のイベントが発生したときに関数を呼び出す

```javascript
gsap.to("#logo", {duration: 1, x: 100, onComplete: tweenComplete});
// gsap.to("#logo", {duration: 1, x: 100, 条件: 動かす関数});

// ↑はonCompleteなのでアニメーションが終わったらこの関数が動く
function tweenComplete() {
  console.log("the tween is complete");
}
```

- **onComplete**：アニメーションが完了したときに呼び出されます。
- **onStart**：アニメーションの開始時に呼び出されます
- **onUpdate**：アニメーションが更新されるたびに（アニメーションがアクティブな間はすべてのフレームで）呼び出されます。
- **onRepeat**：アニメーションが繰り返されるたびに呼び出されます。
- **onReverseComplete**：アニメーションが反転されたときに再び開始に達したときに呼び出されます。

### コールバックに引数を渡す

```javascript
gsap.to("#logo", {duration: 1, x: 100, onComplete: tweenComplete, onCompleteParams: ["done!"]});

function tweenComplete(message) {
  console.log(message);
}

// アニメーションが終わったら、tweenCompleteが動き、そこで引数を受け取って動作させる
```

## アニメーションを操作する

```javascript
// setTimeoutとかを止めるときのように名前を付けてあげる

const moveLogo = gsap.to("#logo", {duration: 1, x: 100});

// moveLogo これに対してなんやかんやする

// 再生（アニメーションスタート）
moveLogo.play();

// 一時停止
moveLogo.pause();

// 再開（止めた場所から）
moveLogo.resume();

// 再生（最初から）
moveLogo.restart();

// 逆再生（最初に戻る、もう一度発動させてもトグルはしない
moveLogo.reverse();

// ジャンプ（↓の場合は0.5秒地点へ）
moveLogo.seek(0.5);

// ジャンプ（↓の場合は1/4の地点へ）
moveLogo.progress(0.25);

// 再生速度
moveLogo.timeScale(0.5); // 速度を半分に
moveLogo.timeScale(2); // 速度を倍速に

// アニメーションの強制終了
moveLogo.kill();
```

### タイムライン

こんなこともできるよ程度で

```javascript
const tl = gsap.timeline({repeat: 3, repeatDelay: 1});
// 基本設定に リピート回数とリピートの間隔を指定

tl.to("#test7 .box1", {duration: 1, x: 200});
tl.to("#test7 .box2", {duration: 1, x: 200, scale: 0.2});
tl.to("#test7 .box3", {duration: 1, x: 200, scale: 2, y: 20});
// ３つのboxが順番に動き、３つめまで動いたら、1秒開けて　また最初から動く
// リピートを３回って指定だと計４回動きます（1回目はリピートではないから？

// メソッドチェーンできるのでこうでもいいです
tl.to("#test7 .box1", {duration: 1, x: 200}).to("#test7 .box2", {duration: 1, x: 200, scale: 0.2}).to("#test7 .box3", {duration: 1, x: 200, scale: 2, y: 20});

// jQueryで繋げまくってた頃の悪夢が思い出されて目眩がするｗ

tl.to("#test7 .box1", {duration: 1, x: 200})
  .to("#test7 .box2", {duration: 1, x: 200, scale: 0.2})
  .to("#test7 .box3", {duration: 1, x: 200, scale: 2, y: 20});
// まだこうの方がいいですね
// あまり複雑なのを繋げないほうがよいですね

tl.to("#test7 .box1", {duration: 1, x: 200}, "<")
  .to("#test7 .box2", {duration: 1, x: 200, scale: 0.2}, "<")
  .to("#test7 .box3", {duration: 1, x: 200, scale: 2, y: 20}, "<");
// ちなみにこうすると（"<"をつけてる）前のやつとスタートが同じになるので
// ↑の場合は全部同時にスタートする（時間も同じなので一緒に終わる）
```

タイムラインは設定が色々できるが、それはとりあえず後で試す

## 要素の現在の位置を取得する

アロー関数は推奨しない

```javascript
let w = gsap.getProperty("#id", "width");

gsap.to("#test8 .box", {x: 100, onUpdate: function() {
  let elem = this.targets()[0];
  console.log(gsap.getProperty(elem, "x"));
} });

// 移動先は設定に書くけど、それ受け取って何かしたいときとか？
// ↑のサンプルはonUpdateなので動いてる経過の数字もみれるけど
```

