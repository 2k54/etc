# GSAP
GreenSock社が開発した高機能アニメーションライブラリ 現在GSAP 3
従来はTweenLite, TweenMax, TimelineLite, TimelineMaxとライブラリが分割されていましたが、軽量化によりひとつになりシンプルな記述が可能になりました。軽量かつ多機能、豊富なプラグインなどの特徴があり世界中で用いられています。
**※有料でしか見れないサイトで使うにはライセンス契約が必要**

とりあえず簡単にCDNで試す

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

margin-bottom: 10px;
width: 100px;
height: 100px;
background-color: gray;

ぐらいしか書いてない
```

```javascript
gsap.to("#test1 .box", {duration: 2, x: 300}); // 共通
gsap.to("#test1.box3", {duration: 5, x: 300}); // 個別みたいな書き方もできる

// gsap.to
// もっとも一般的なタイプ
// gsap.to("何を", {何秒かけて: 2, どこへ: 300});（↑でidも指定してるのは便宜上）
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

### gsap.from()

開始と終了を両方設定できる

```javascript
gsap.fromTo("#test3 .box", {width: 0, height: 0}, {duration: 1.5, width: 100, height: 200});

// gsap.fromTo("何を", {この状態から}, {この状態へ});
```

とりあえずこの３つだけでもある程度はできそう

