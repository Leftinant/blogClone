import React from "react";
import PostList from "./PostList";
import Sidebar from "../components/SideBar";
import Card from "../components/Card";
import HomeBar from "../components/HomeBar";

function Home() {
  return (
    <>
      <div className='flex h-screen '>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <HomeBar />
          <div className='p-4 overflow-y-auto flex-1'>
            <div className='flex flex-col space-y-4'>
              <Card
                avatarUrl='https://images.pexels.com/photos/29012504/pexels-photo-29012504.jpeg'
                username='lefty'
                postImage='https://images.pexels.com/photos/9688475/pexels-photo-9688475.jpeg'
                likes='120'
                caption='My latest blog'
                hashtag='#bloglife'
                commentsCount={50}
              />
              <Card
                avatarUrl='https://images.pexels.com/photos/29012504/pexels-photo-29012504.jpeg'
                username='Gunther'
                postImage='https://images.pexels.com/photos/3446915/pexels-photo-3446915.jpeg'
                likes='300'
                caption='From the Top'
                hashtag='#RKO'
                commentsCount={790}
              />
              <Card
                avatarUrl='https://images.pexels.com/photos/29012504/pexels-photo-29012504.jpeg'
                username='Palmer10'
                postImage='https://images.pexels.com/photos/5246964/pexels-photo-5246964.jpeg'
                likes='772'
                caption='For the love of the game'
                hashtag='#Football'
                commentsCount={99}
              />
              <Card
                avatarUrl='https://images.pexels.com/photos/29012504/pexels-photo-29012504.jpeg'
                username='Valentine'
                postImage='https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg'
                likes='1678'
                caption='True love'
                hashtag='#lov'
                commentsCount={87}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
