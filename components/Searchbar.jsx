import { useRef } from "react";

export default function Searchbar() {
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/search", {
      method: "POST",
      body: { url: inputRef.current.value },
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="input input-bordered"
        placeholder="Search url"
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}
