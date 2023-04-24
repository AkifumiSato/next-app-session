import { Session } from "@/lib/server/session";
import Redis from "ioredis-mock";

test("セッションに値が格納・取得でき、Redisに状態が保存されていること", async () => {
  // Arrange
  const redis = new Redis();
  const session = new Session<{
    counter: number;
  }>(redis, "test-user-key");
  // Act
  await session.set("counter", 1);
  // Assert
  expect(await session.get("counter")).toBe(1);
  expect(JSON.parse((await redis.get("test-user-key")) as string)).toEqual({
    counter: 1,
  });
});

test.todo("セッションの有効期限が設定できること");
