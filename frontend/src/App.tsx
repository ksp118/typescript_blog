import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/post/:id" element={<PostPage />} />
            <Route path="/write" element={<Editor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
