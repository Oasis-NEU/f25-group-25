import NavBar from "./navbar"
import Dashboard from "./pages/dashboard"
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Landing from "./pages/landing";
import Settings from "./pages/settings";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Landing></Landing>
        }/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App