import { useEffect, useState } from "react";

export default function Recents() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/urls");
      const data = await res.json();
      setUrls(data);
    })();
  }, []);

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <h1 className="text-4xl">Recents</h1>
      <div className="flex w-full flex-col">
        {urls.map((url, i) => (
          <span key={i} className="space-x-2">
            <span className="text-right text-xl">{url.karma}</span>
            <a href={`/urls/${url._id}`} className="text-left text-xl">
              {url.url}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}
