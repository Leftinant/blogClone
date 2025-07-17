import useApi from "../hooks/useApi";
import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

function PostList() {
  const { data: posts, loading } = useApi("/api/posts");
  if (loading) return <p>Loading...</p>;
  return (
    <div className='flex h-screen '>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <NavBar />
        <div className='p-4 overflow-y-auto flex-1'>
          <div className='flex flex-col space-y-4'></div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
