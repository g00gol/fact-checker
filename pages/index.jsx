import Searchbar from "@/components/Searchbar";
import Recents from "@/components/Recents";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen w-1/2 flex-col space-y-8 p-32">
      <h1 className="text-center text-4xl">Fact checker</h1>
      <p>
        The premise of this site is to bring awareness to misinformation online.
        I've made an online platform where you can search by a URL and vote
        whether it is misinforming other people.
      </p>
      <Searchbar />
      <Recents />
    </main>
  );
}
