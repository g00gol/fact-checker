import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (!url) return;

      const res = await axios.get(`/api/${url}`);

      console.log(res.data);
      setData(res.data);
    })();
  }, [url]);

  return (
    <main className="h-screen w-screen flex p-32 flex-col items-center">
      <iframe src={data?.url} width="30%" height="30%" />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Comments</h1>
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
          {data?.comments.map((comment) => (
            <li className="text-xl text-center">{comment}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
