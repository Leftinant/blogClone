import useApi from "../hooks/useApi";
import { Link } from "react-router-dom";

export default function PostList() {
  const { data: posts, loading } = useApi("/api/posts");
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts</h1>
      <Link to='/new'>Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
