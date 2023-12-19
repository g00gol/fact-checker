import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (!url) return;
      const res = await axios.get(`/api/${url}`);
      setData(res.data);
    })();
  }, [url]);

  async function handleVote(like) {
    const res = await axios.post(`/api/${url}`, { like });
    setData(res.data);
  }

  return (
    <>
      <Breadcrumbs />
      <main className="flex h-screen w-screen flex-col items-center p-32">
        <iframe src={data?.url} width="50%" height="50%" />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Comments</h1>
          <h2 className="text-2xl font-bold">Karma: {data?.karma}</h2>
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <button
                onClick={() => handleVote(true)}
                className="btn btn-ghost"
              >
                Upvote
              </button>
            </li>
            <li>
              <button
                onClick={() => handleVote(false)}
                className="btn btn-ghost"
              >
                Downvote
              </button>
            </li>
          </ul>

          <form
            className="flex flex-col items-center"
            onSubmit={async (e) => {
              e.preventDefault();

              const comment = e.target.elements.comment.value;

              const res = await axios.post(`/api/${url}`, { comment });

              setData(res.data);
            }}
          >
            <input
              className="text-xl"
              type="text"
              name="comment"
              placeholder="Comment"
            />
            <button className="text-xl" type="submit">
              Submit
            </button>
          </form>

          <ul className="flex flex-col items-center">
            {data?.comments.map((comment, i) => (
              <li key={i} className="text-center text-xl">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
