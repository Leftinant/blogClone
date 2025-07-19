import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`/api/comments/${postId}`).then((res) => {
      setComments(res.data);
    });
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `/api/comments/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error("Failed to post comment", err);
      window.showToast("Failed to post comment", "error");
    }
  };

  return (
    <div className='mt-4'>
      <h4 className='font-semibold mb-2'>Comments</h4>

      <form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a comment...'
          className='flex-1 border border-gray-300 p-2 rounded-lg text-sm'
        />
        <button
          type='submit'
          className='bg-black text-white px-4 py-2 rounded-lg'
        >
          Post
        </button>
      </form>

      <ul className='space-y-2'>
        {comments.map((comment) => (
          <li key={comment._id} className='text-sm bg-gray-100 p-2 rounded-lg'>
            <span className='font-medium text-gray-800'>{comment.author}</span>:{" "}
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
