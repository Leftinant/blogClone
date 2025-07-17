import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostView from "./pages/PostView";
import PostForm from "./pages/PostForm";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import { ToastContainer } from "./components/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostView />} />
        <Route path='/new' element={<PostForm />} />
        <Route path='/edit/:id' element={<PostForm />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
