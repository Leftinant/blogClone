import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card"; // Your reusable card
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      console.log("API response:", res.data);
      setPosts(res.data.posts); // ✅ only store the array
    });
  }, []);

  return (
    <div className='flex h-screen '>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <NavBar />
        <div className='p-4 overflow-y-auto flex-1'>
          <div className='flex flex-col space-y-4'>
            {posts.map((post) => (
              <Card
                key={post._id}
                postImage={post.image}
                caption={post.content}
                username={post.user?.username || "Unknown"}
                avatarUrl={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 70 + 1
                )}`}
                likes={Math.floor(Math.random() * 1000)}
                commentsCount={Math.floor(Math.random() * 100)}
                hashtag='#lorem'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
