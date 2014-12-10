# このプロジェクトについて

このプロジェクトは、聖也今野氏 主催の'ライトニングトーク'で使用される、スピーカータイマー用のレポです。

# ソケット通信のルールについて

- set: sec:Number - 残り時間をセットする
- reset: (no arguments) - 初期状態に戻す
- start: (no argumetns) - セットした残り時間でカウントダウンを開始する
- pause: (no arguments) - 残り時間のカウントダウンをポーズする
- update: name:String, title:String - 名前とタイトルをアップデートする
- tweet: message:Object - ツイートを表示する
