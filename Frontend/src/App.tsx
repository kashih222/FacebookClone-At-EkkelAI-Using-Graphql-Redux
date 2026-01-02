import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/SignUpPage/SignUp";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/signup" element={<SignUp />} />
          
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
              <a href="/login" className="text-blue-600 hover:underline">
                Go back to Login
              </a>
            </div>
          } />
        </Routes>
      </div>
  );
};

export default App;