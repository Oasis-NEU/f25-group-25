import NavBar from "./navbar"
import Dashboard from "./pages/dashboard"
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Landing from "./pages/landing";
import Settings from "./pages/settings";
import Login from "./pages/login";
import AddFriends from "./pages/add_contacts";
import Signup from "./pages/signup";
import Debts from './pages/debts'
import { DebtProvider } from './contexts/DebtContext'
import ForgotPassword from "./pages/ForgotPass";



function App() {
  return (
    <BrowserRouter>
      <DebtProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add_contacts' element={<AddFriends />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/debts' element={<Debts />} />
          <Route path='/forgot' element={<ForgotPassword/>}/>
        </Routes>
      </DebtProvider>
    </BrowserRouter>
  )
}

export default App
