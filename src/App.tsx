import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "fontawesome-free-6.2.1/css/all.css";
import BlogPost from "./components/BlogPost";
import Homepage from "./pages/Homepage";
import "hover.css/css/hover-min.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/posts/CreatePost";
import Footer from "./components/Footer";
import Dash from "./components/dashboard/Dash";
import Published from "./components/dashboard/Published";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/auth.js";
import PostsPage from "./pages/posts/PostsPage.js";
import NotFound from "./pages/NotFound.js";
import PostDetail from "./pages/posts/PostDetail.js";
import TagBlog from "./pages/posts/TagBlogs.js";
import CategoryBlog from "./pages/posts/CategoryBlog.js";
import LoginRoute from "./components/LoginRoutes.js";
import Draft from "./components/Draft.js";
const App: React.FC = () => {
 
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <>
      <Router>
        <Header />
        <ToastContainer position="top-left" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<BlogPost />} />
          
          <Route path="/login" element={<LoginRoute><Login /> </LoginRoute>} />
       
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/dash" element={<Dash />} />
            <Route path="/dashboard/published" element={<Published />} />
            <Route path="/dashboard/draft" element={<Draft />} />
          </Route>
          <Route
            path="/createpost"
            element={
              <ProtectedRoute>
                {" "}
                <CreatePost user={authUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createpost/:id"
            element={
              <ProtectedRoute>
                {" "}
                <CreatePost user={authUser} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/editpost/:id"
            element={
              <ProtectedRoute>
                <CreatePost user={authUser}  />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:category" element={<CategoryBlog/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tag/:tag" element={<TagBlog />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
