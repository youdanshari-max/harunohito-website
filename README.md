# ハルノヒト

「ちいさなデジタル工房」を肩書きに持つ、ハルノヒト公式ホームページ。
完成したファーストビューと「お問い合わせ＋ゆうちゃんのお便り」のエンディングを土台に、少しずつ育てます。

## ハルノヒト Ver.1 一般公開

2026年9月18日、トップとエンディングをVer.1として一般公開しました。
公開URL: https://harunohito-website.pages.dev/
Cloudflare Pagesで公開し、GitHubの `youdanshari-max/harunohito-website` の `main` ブランチと連携しています。
今後はトップとエンディングの間にセクションを少しずつ追加し、サイトを育てていきます。

## 構成

- `dist/`: ブラウザに届ける HTML・CSS・JavaScript と表示用画像。
- `assets/originals/`: 受け取った画像の原本。変更・上書きしません。
- `docs/`: 素材管理・デザイン調整の記録。

追加のフレームワークやライブラリを使わない、Web標準の構成です。
GitHubリポジトリは公開されています。独自ドメインはまだ接続していません。

## 見る方法

`dist/index.html` をブラウザで直接開けます。開発時はプロジェクトフォルダで次を実行します。

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

`http://127.0.0.1:4173/` を開きます。停止はターミナルで Ctrl+C。
ビルドや外部ライブラリのインストールは不要です。

## 編集する場所

- `dist/index.html`: ブランド名、肩書き、ページ情報。
- `dist/styles/main.css`: 色、文字サイズ、配置、PC・スマートフォンの表示。
- `dist/scripts/main.js`: 桜の配置・出現間隔・速度・移動量・回転・顔の禁止エリア。
- `dist/scripts/companions.js`: PC左下の2人の目ぱち、時間差、OS設定・画面幅への対応。
- `dist/styles/ending.css`: エンディング専用の余白・文字・ボタン・PC／スマートフォン表示。
- `dist/scripts/ending.js`: エンディング専用の目ぱち。画面外・非表示タブ・OSの「動きを減らす」設定では休止。
- `docs/assets.json`: 原本と表示用コピーの対応、SHA-256。
- `docs/design-notes.md`: 試作の意図と調整方法。

## ページを増やすとき

次のページは、たとえば `dist/about/index.html` として追加できます。
共通の色や文字の設定は `styles/main.css` に集めています。
トップページ内に内容を増やすときは、`dist/index.html` の「Future sections belong here」のコメント位置へ、独立したセクションを追加します。
`.first-view` の中へは入れず、最後の `.ending` の手前に並べます。

## エンディングの文章とリンクを変えるとき

`dist/index.html` の「Ending copy and destinations」から始まる区画に集めています。
お礼の文は `.ending-title` と `.ending-message`、各入口の表示名は `.ending-path-title`、説明は `.ending-description`、ボタンの文字と行き先は `.ending-link` の内容と `href` を変更します。
JavaScriptを変更せずに編集でき、JavaScriptが動かない場合も文章・画像・リンクを表示できます。
お問い合わせは `https://www.reservestock.jp/inquiry/58391`、お便りは `https://www.reservestock.jp/subscribe/160983`。同じタブで移動し、ブラウザの戻る操作でサイトに戻れます。
サイト内ではフォーム入力を受け付けたり保存したりしません。

エンディングのキャラクターは `.ending-character` を使い、トップの `.companion` と分離しています。
素材は既存の同じPNGを参照します。PC・スマートフォンの両方で表示し、目の部分だけを0.22秒切り替えるため、体や輪郭が跳ねません。
2人が交互に、3.8〜5.8秒の待ち時間を挟んでまばたきします。各人は約8〜12秒ごとが目安です。
画面にキャラクターが半分以上見え、素材の準備ができた場合だけ動かし、OS設定時は開き目の静止表示になります。

## 公開と更新

Cloudflare Pagesはビルドコマンド `exit 0`、公開ディレクトリ `dist` を使用しています。追加のビルドや外部ライブラリのインストールは不要です。
更新するときは、ローカルで修正して表示を確認し、差分を確認してGitにコミットします。GitHubの `main` へプッシュすると、Cloudflare Pagesが自動で公開サイトを更新します。公開URLでも最後に表示を確認してください。
独自ドメインは今後必要になったときに設定します。
`assets/originals` と `docs` は公開ディレクトリに含めません。
ただし、公開GitHubリポジトリでは原本も誰でも閲覧できます。
画像の権利は元の権利者に帰属します。再利用の許諾を与えるものではありません。

## 秘密情報

`.env`、秘密鍵、認証情報のファイルは `.gitignore` で除外しています。
新しい秘密情報には固有の名前が付くこともあるため、コミット前には必ず差分を確認してください。
公開用のHTML・CSS・JavaScriptには、パスワードやAPIの秘密鍵を書きません。

## 動きを減らす設定

OSの `prefers-reduced-motion` に対応し、設定時は静止表示にします。
画面上の手動停止ボタンは設けていません。OS設定時はPC左下の2人の目ぱちも止まり、開き目の基本画像に戻ります。
2人はPCで表示し、700px以下のスマートフォン表示では非表示にして目ぱちのタイマーも止めます。
JavaScriptが動かない場合も、女の子・ブランド名・肩書き・PC左下の2人は表示されます。

## 同じWi-FiのiPhoneで確認する

既存のプレビューを停止してから、プロジェクトフォルダで次を実行します。
`MAC_WIFI_IP/PREFIX` はMacのWi-Fiアドレスとサブネットの長さ（例: `192.168.1.7/24`）に置き換えます。
アドレスは `ipconfig getifaddr en0`、ネットマスクは `ipconfig getoption en0 subnet_mask` で確認できます。
ネットマスクが `255.255.255.0` なら `/24` です。

```sh
python3 preview.py --lan MAC_WIFI_IP/PREFIX
```

PCは `http://127.0.0.1:4173/`、iPhoneのSafariは `http://MAC_WIFI_IP:4173/` で確認します。
Macと同じWi-Fiにつなぎ、Macを起動したままにしてください。停止はCtrl+C。
Wi-Fiのアドレスが変わった場合はサーバーを起動し直します。
`python3 preview.py` だけなら、このMacのみで確認できます。

この確認用サーバーは `dist` のみを表示し、接続元をlocalhostと指定サブネットに限定します。
画像が同時に読み込まれる際の接続待ちを増やし、取りこぼしを防ぎます。
ルーターのポート転送、トンネル、インターネット公開は設定しません。
ゲストWi-Fiなど端末間の通信が禁止されているネットワークでは接続できません。
