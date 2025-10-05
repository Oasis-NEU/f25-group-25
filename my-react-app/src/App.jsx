import Profile from "./pages/profile"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-blue-500 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-black">
              Tailwind is working!
            </h1>
            <Link 
              to='/profile' 
              className="ml-4 px-4 py-2 rounded-sm text-center bg-white transition-transform hover:scale-95 hover:cursor-pointer"
            >
              View my Profile
            </Link>
          </div>
        } />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App