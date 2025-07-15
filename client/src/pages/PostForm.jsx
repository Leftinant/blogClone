import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then((res) => setPost(res.data));
    }
  }, [id]);

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/posts/${id}`, post);
    } else {
      await axios.post("/api/posts", post);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        value={post.title}
        onChange={handleChange}
        placeholder='Title'
      />
      <textarea
        name='content'
        value={post.content}
        onChange={handleChange}
        placeholder='Content'
      />
      <button type='submit'>{id ? "Update" : "Create"}</button>
    </form>
  );
}
