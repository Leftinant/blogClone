import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostForm";
import PostView from "./pages/PostView";
import PostForm from "./pages/PostForm";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostView />} />
        <Route path='/new' element={<PostForm />} />
        <Route path='/edit/:id' element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
