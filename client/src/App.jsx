import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserContextProvider } from "./context/UserContext";
import Home from "./components/Home";
import Protected from "./auth/Protected";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              exact
              path="/profile/:id"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
