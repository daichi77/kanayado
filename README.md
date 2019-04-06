# 注意事項
- masterで作業しない
- branch名は機能名＋名前(例： search-ishida←観光地検索機能の例)
- conflict起こさないようにmaster更新されたらローカルの方も更新する。
- 自分が変更したファイル以外は極力上げない。
- commitメッセージは分かりやすいものにしましょう

## 開発者へ
[`react-native-dotenv`](https://github.com/zetachang/react-native-dotenv)を導入したため
APIのエンドポイントを環境変数に設定する必要があります。

このrepoの直下(README.mdなどがあるフォルダ階層)に、`.envファイル`を作成し、
[じゃらんWebサービス](https://www.jalan.net/jw/jwp0100/jww0102.do)のアカウント登録時に割り当てされるAPIキーを以下のフォーマットで入力してください。

```
API_KEY=xxxxx
```

以下についてはリンク先の[Wiki](https://github.com/daichi77/kanazawaApp-2018/wiki)を参考にしてください。
- [MapViewのズームレベルの指定について](https://github.com/daichi77/kanazawaApp-2018/wiki/MapView%E3%81%AE%E3%82%BA%E3%83%BC%E3%83%A0%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AE%E6%8C%87%E5%AE%9A%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [react native dotenv の導入](https://github.com/daichi77/kanazawaApp-2018/wiki/react-native-dotenv-%E3%81%AE%E5%B0%8E%E5%85%A5)
