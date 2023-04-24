import { Session } from "@/lib/server/redis";

test("セッションに値が格納・取得できること", async () => {
  // Arrange
  const session = new Session<{
    counter: number;
  }>();
  // Act
  await session.set("counter", 1);
  // Assert
  expect(await session.get("counter")).toBe(1);
});

test.todo("Redisに状態が保存されていること");

test.todo("セッションの有効期限が設定できること");
