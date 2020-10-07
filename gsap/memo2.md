# GSAP メモ2

## [ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger) が便利そうなので試す

スクロールイベントの負荷対策に lodash の debounce や throttle でやっていた負荷対策もやってくれるので便利

```html
// とりあえず簡単に試したいのでgsapと一緒にCDNで読み込む

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"></script>
```

変形前のCSSは作っておく（cssはgithubにある）

```javascript
// JS内でプラグインを登録する
gsap.registerPlugin(ScrollTrigger);

// イベントの発火に使いたいのでヘッダーを変数に入れておく
const button = document.querySelector("header");

// button = ヘッダーの変形設定を変数に入れる
// 最初止めておいて、イベントでアニメーションを発火したいので
// 【アニメーションを操作する】を参照
const tween = gsap.to(button, {
  duration: 0.5,
  paused: true,
  ease: "power2.out",
  width: "100%",
  height: "100px",
  lineHeight: "100px",
  borderRadius: "0%",
  cursor: "default",
  top: 0,
  backgroundColor: "#0FBD94",
});
// paused: true デフォルトだと動いてしまうので止めておく

const showContent = () => {
  // ボタンを押したときに何をするかの処理
  // アロー非推奨じゃなかったっけ？
}

// ボタンを押したら全体のアニメーションが動く
button.addEventListener("click", showContent);
```

showContentの中

```javascript
// まずアニメーションの設定をして止めているヘッダーを動かす
tween.play();

// 透明だったh1が表示される
gsap.to("header h1", {
  opacity: 1,
});

// 画像郡を連続的に表示するアニメーションの制御
gsap.to(".img-container img", {
  opacity: 1,
  delay: 1, // h1が出てから 1秒後 
  duration: 1.5, // 1.5秒かけて全部が表示される
  y: -10, // ちょい上に動かしてるね
  ease: "power2.out",
  // 複数要素を扱うプロパティ
  stagger: {
    from: "start", // 左から
    amount: 0.8, // 0.8秒おきに
  },
});

gsap
  .timeline({
    defaults: { ease: "power2.out", duration: 1.5 },
    scrollTrigger: {
      markers: true, // マーカーを表示するか（開発用）
      trigger: ".content", // この要素と交差するとイベントが発火
      start: "top 70%", // ウィンドウのどの位置を発火の基準点にするか
      end: "bottom 25%", // ウィンドウのどの位置をイベントの終了点にするか
      toggleActions: "play none none none", // スクロールイベントで発火するアニメーションの種類
    },
  })
  .to(".content-text h2", {　opacity: 1,　y: -10,　duration: 1.5　})
  .to(".content-text p",　{　opacity: 1,　y: -10,　},　"-=1" )
  .to(
    ".content img",
    {
      opacity: 1,
      x: -10,
    },
    "-=1"
  );
};

// .timelineにscrollTriggerをつけてあげて
// チェーンしたものはscrollに反応する
// markersのプロパティだけは本番時に外すこと！（ページの右にわかりやすいように発火位置が出てる）
// triggerの指定を忘れないように！
// "-=1" ってのは前の動作に1秒かぶせている
// "<" これで前と同時
// "+=0.5" 0.5秒遅らせたり

// こんな風にただ数字を入れると、タイムラインアニメーションが開始してから5秒後に動くみたいな感じ
// .to(".content-text p",　{　opacity: 1,　y: -10,　},　5 )

// トリガーを設定
button.addEventListener("click", showContent);
```

スクロールでの発火タイミングは
指定範囲がスタート位置に入った
指定範囲が終了位置から出た
戻ってきたなどがある

- onEnter
- onLeave
- onEnterBack
- onLeaveBack

toggleActions: "play none none none"

↑これで設定かな？ この設定だとonEnterの時に playって設定かな？

#### ぱららっくす

```javascript
gsap.to('.b', { // 動かしたい要素は".b"
  x: 600, // 右方向に600動く
  rotation: 360, // 開始〜終了までの間で360度回転する
  duration: 1, // アニメーションは1秒間
  scrollTrigger: {
    trigger: '.b', // 要素".b"がビューポートに入ったときにアニメーション開始
    start: 'top center', // アニメーション開始位置
    end: 'top 300px', // アニメーション終了位置
    scrub: true, // アニメーションをスクロール位置にリンクさせる
    markers: true // マーカー表示
  }
})

// scrubを設定すると　スクロール位置に応じてアニメーションの進捗がリンクする
// これはすてき
```

