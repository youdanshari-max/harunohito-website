# 声でパソコン — ローカル確認版

作業ブランチ: `feature/voice-pc-service`。確認・承認まではmainへマージ／pushしない。

`dist/index.html` の `#voice-pc` はファーストビューとエンディングの間の独立セクション。
文章と価格は各 `article.voice-service-option` 内で変更する。
Zoomは15,000円、対面は18,000円。どちらもAI個別設定90分、申込後に日程調整。

## 申込URLの設定

`dist/index.html` 内、Zoomと対面のボタンそれぞれの `data-application-url=""` に、確認済みのHTTPS申込URLを1回ずつ記入する。
`dist/scripts/services.js` がリンクに置き換え、準備中表示を外す。同じタブで開く。
未設定、不正なURL、JavaScriptが使えない場合は無効ボタンのまま。仮リンクはない。

## 素材と拡張

6.pngを `voice-pc-zoom.png`、7.pngを `voice-pc-in-person.png` として使用。
原本は `assets/originals/services/`、表示用の同一コピーは `dist/assets/images/services/`。
元のDesktopファイルを含め、画像加工・上書きはしていない。
CSSは `dist/styles/services.css` の専用クラスに限定し、既存セクションの設定を変えない。
別の受け方は `.voice-service-options` 内のarticleを追加して表示できる。
体験会など別内容はこのセクション内に見出しと独立したまとまりを追加できる。
新しい動きは追加しない。
