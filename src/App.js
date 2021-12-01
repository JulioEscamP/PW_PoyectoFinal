import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';



function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
          <Route path="/login" element={<Login/>}  />
          <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <Admin />
            </RequireAuth>
          } />
          <Route exact path="/admin/profile/*" element={<Profile/>} />
        </Routes>
    </Router>  
  );
}

export default App;
