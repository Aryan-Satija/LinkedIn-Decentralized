import Home from "./pages/home";
import Network from "./pages/network";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import {Route, Routes} from 'react-router-dom';
import BuildProfile from "./pages/buildProfile";
import CreatePost from "./pages/createPost";
import Notifications from "./pages/notifications";
import Message from "./pages/message";
import Jobs from "./pages/jobs";
import UserProfile from './pages/userProfile.jsx';

function App() {
  return (
    <div className="">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/network" element={<Network/>}/>
            <Route path="/build" element={<BuildProfile/>}/>
            <Route path="/createPost" element={<CreatePost/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
            <Route path="/messages" element={<Message/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/user/:id" element={<UserProfile/>}/>
        </Routes>
    </div>
  );
}

export default App;
