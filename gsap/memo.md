# GSAP
GreenSock社が開発した高機能アニメーションライブラリ 現在GSAP 3
従来はTweenLite, TweenMax, TimelineLite, TimelineMaxとライブラリが分割されていましたが、軽量化によりひとつになりシンプルな記述が可能になりました。軽量かつ多機能、豊富なプラグインなどの特徴があり世界中で用いられています。
**※有料でしか見れないサイトで使うにはライセンス契約が必要**

とりあえず簡単にCDNで試す

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
```

```html
<div id="test1">
  <div class="box1 box"></div>
  <div class="box2 box"></div>
  <div class="box3 box"></div>
</div>

cssはわかりやすいように色とサイズ指定くらいで試せます
とりあえずpositionは特に指定しなくても大丈夫
```

```javascript
gsap.to(".box", {duration: 2, x: 300});
gsap.to(".box3", {duration: 5, x: 300});

// gsap.to
// もっとも一般的なタイプ
// gsap.to("何を", {何秒かけて: 2, どこへ: 300});
// みたいな感じ
// boxを2秒かけて300px横に動く
// box3だけ　何秒かけてが5なので遅く動く
// これだけだと特にイベントトリガーがないのでページがロードされたら動く

// devtoolでみると
// divのstyle属性が激しく変わるのが確認できる
// 300 = デフォルトはpxなので%とか使いたければ '300%'かな？
```

