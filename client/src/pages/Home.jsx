import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PostList from "./PostList";

function Home() {
  return (
    <>
      <NavBar />
      <div className='md:mx-20 mx-4 w-full  mt-20'>
        <div className='justify-items-center text-center'>
          <h2 className='font-bold text-4xl'>
            I,m <span className='text-blue-600'>Leftinant</span> <br />
            Digital Marketer & Founder{" "}
          </h2>
          <img src='/19197307.jpg' alt='image' className='w-90 ' />
        </div>
        <p className='font-semibold text-xl'>Recent Articles</p>
      </div>

      <Footer />
    </>
  );
}

export default Home;
