import Home from "./pages/home";
import Network from "./pages/network";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import {Route, Routes} from 'react-router-dom';
import BuildProfile from "./pages/buildProfile";
function App() {
  return (
    <div className="">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/network" element={<Network/>}/>
            <Route path="/build" element={<BuildProfile/>}/>
        </Routes>
    </div>
  );
}

export default App;
