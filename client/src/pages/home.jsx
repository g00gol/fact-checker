import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center space-y-4 p-32">
      <h1 className="text-4xl">Fact checker</h1>
      <SearchBar />
    </main>
  );
}
