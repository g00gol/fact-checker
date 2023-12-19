import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center p-32">
      <h1>Fact checker</h1>
      <Searchbar />
    </main>
  );
}
