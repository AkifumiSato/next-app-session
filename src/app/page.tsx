export default function Home() {
  return (
    <main className="flex flex-col justify-between p-24 gap-y-10 text-left">
      <h1 className="text-6xl font-bold">Hello app session</h1>

      <div className="flex justify-between gap-1">
        <p className="text-xl">
          session counter: <span>0</span>
        </p>
      </div>
    </main>
  );
}
