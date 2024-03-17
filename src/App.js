import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import Profile from "./pages/profile";
import Home from "./pages/home/index";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import CreatePostPopUp from "./components/createPostPopUp/createPostPopUp";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const [postVisible, setPostVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {postVisible && (
        <CreatePostPopUp user={user} setPostVisible={setPostVisible} />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route
            path="/"
            element={<Home setPostVisible={setPostVisible} />}
            exact
          />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
