import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";
import { PostPage } from "./Pages/Postpage";
import { LoginPage } from "./Pages/LoginPage";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*<Route path="/write" element={<Editor />} />
            <Route path="/register" element={<Register />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
