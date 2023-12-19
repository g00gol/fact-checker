import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Searchbar() {
  const router = useRouter();

  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/search", { url: input });
      router.push(`/urls/${res.data._id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form className="join" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setInput(e.target.value)}
        className="input input-bordered join-item"
        placeholder="Search url"
      />
      <button className="btn btn-primary join-item">Search</button>
    </form>
  );
}
