import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";

export default function PostView() {
  const { id } = useParams();
  const { data: post, loading } = useApi(`/api/posts/${id}`);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
