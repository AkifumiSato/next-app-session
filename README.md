# red-session

`red-session` is a utility that persists sessions to Redis.

## Usage

```ts
const redis = new Redis();
const { getSession } = redSession<{
  counter: number;
}>({ redis, ttl: 3600 });
const session = getSession("test-user-key");
await session.set("counter", 1);

const counter = await session.get("counter"); // 1
```

## Todo

- [x] パッケージのディレクトリ作成
  - [x] パッケージの諸々設定
  - [x] パッケージとexamplesの疎通
- [x] Sessionクラスの作成
  - [x] セッションに値が格納・取得できること
  - [x] Redisに状態が保存されていること
  - [x] セッションの有効期限が設定できること
- [x] APIの設計
  - [x] セッションの取得の関数を返す
  - [x] Clusterモードに対応
- [ ] 簡単なセッションのデモ実装
  - [ ] Topページでセッションカウンターを実装
    - [x] UIの実装
    - [x] Redisを導入
    - [x] jestの導入
    - [ ] セッションの開始処理を実装
    - [ ] セッションを画面上で表示できるようにhooksを用意
- [ ] red-session/nextの実装
  - [ ] セッションのチェックと初期化リダイレクト周りを実装
  - [ ] useSessionを実装
    - [ ] Providerにsessionを渡して実装
- [ ] パッケージの詳細設定
  - [ ] filesの指定
  - [ ] enginesの指定
  - [ ] READMEの修正
- [ ] 開発環境の整備
  - [ ] github actionsでjest回す
  - [ ] commit hooks
