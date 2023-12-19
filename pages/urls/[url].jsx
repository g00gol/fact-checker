import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";

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

  return (
    <>
      <Breadcrumbs />
      <main className="flex h-screen w-screen flex-col items-center p-32">
        <iframe src={data?.url} width="50%" height="50%" />
        <Panel data={data} url={url} setData={setData} />
      </main>
    </>
  );
}

function Panel({ data, url, setData }) {
  const [vote, setVote] = useState(null);

  useEffect(() => {
    const localVote = localStorage.getItem(url);
    if (localVote === "true") {
      setVote(true);
    } else if (localVote === "false") {
      setVote(false);
    } else {
      setVote(null);
    }
  }, []);

  async function handleVote(like) {
    if (vote === null) {
      setVote(like);
      localStorage.setItem(url, like);
    } else if (vote === like) {
      setVote(null);
      like = !like;
      localStorage.removeItem(url);
    } else {
      setVote(like);
      localStorage.setItem(url, like);
    }

    const res = await axios.post(`/api/${url}`, { like });
    setData(res.data);
  }

  async function handleComment(e) {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    const res = await axios.post(`/api/${url}`, { comment });
    setData(res.data);
  }

  return (
    <div className="flex w-1/2 flex-col items-center">
      <div className="divider">Comments</div>

      <div className="flex w-full">
        <ul className="menu rounded-box max-h-fit flex-grow-0 text-lg">
          <li className="menu-title">Karma: {data?.karma}</li>
          <li>
            <button onClick={() => handleVote(true)}>
              {vote === true ? <BiSolidUpvote /> : <BiUpvote />}
            </button>
          </li>
          <li>
            <button onClick={() => handleVote(false)}>
              {vote === false ? <BiSolidDownvote /> : <BiDownvote />}
            </button>
          </li>
        </ul>

        <div className="flex flex-grow flex-col items-center">
          <form className="flex w-full justify-center" onSubmit={handleComment}>
            <div className="join">
              <input
                className="input join-item input-bordered w-full"
                type="text"
                name="comment"
                placeholder="Comment"
              />
              <button className="btn btn-primary join-item">Post</button>
            </div>
          </form>

          <ul className="flex w-full flex-grow flex-col items-start p-4">
            <div className="chat chat-start flex flex-col items-start p-4">
              {data?.comments.map((comment, i) => (
                <div className="chat-bubble">{comment}</div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
