import { redSession } from ".";
import Redis from "ioredis-mock";

test("セッションに値が格納・取得でき、Redisに状態が保存されていること", async () => {
  // Arrange
  const redis = new Redis();
  const { getSession } = redSession<{
    counter: number;
  }>({ redis });
  const session = getSession("test-user-key");
  // Act
  await session.set("counter", 1);
  // Assert
  expect(await session.get("counter")).toBe(1);
  expect(JSON.parse((await redis.get("test-user-key")) as string)).toEqual({
    counter: 1,
  });
});

test("セッションの有効期限が設定できること", async () => {
  // Arrange
  const TTL = 10;
  const redis = new Redis();
  const { getSession } = redSession<{
    counter: number;
  }>({ redis, ttl: TTL });
  const session = getSession("test-user-key");
  // Act
  await session.set("counter", 1);
  // Assert
  expect(await redis.ttl("test-user-key")).toBe(TTL);
});

test("Clusterモードでもセッションに値が格納・取得でき、Redisに状態が保存されていること", async () => {
  // Arrange
  // @types/ioredis-mock に Cluster が定義されていないので、@ts-ignore で回避
  // @ts-ignore
  const redis = new Redis.Cluster([
    {
      port: 6379,
      host: "localhost",
    },
  ]);
  const { getSession } = redSession<{
    counter: number;
  }>({ redis });
  const session = getSession("test-user-key");
  // Act
  await session.set("counter", 1);
  // Assert
  expect(await session.get("counter")).toBe(1);
  expect(JSON.parse((await redis.get("test-user-key")) as string)).toEqual({
    counter: 1,
  });
});
