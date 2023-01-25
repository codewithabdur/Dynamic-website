import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Blog from "./pages/Blog"
import Blogposts from "./pages/Blogposts";
import Error from "./pages/Error";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/blog/:slug" element={<Blogposts />}></Route>
      <Route path="*" element={<Error />}></Route>

    </Routes>
    </BrowserRouter>
      
    </>
  );
}

