import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <main className="w-screen h-screen flex p-32 items-center flex-col">
      <h1>Fact checker</h1>
      <Searchbar />
    </main>
  );
}
