import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Project from "./pages/Project";
import Dashboard from "./pages/Dashboard";
import Header from "./component/Header";
import Footer from "./component/FooterCom";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/project" element={<Project />} />
        <Route element = {<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
