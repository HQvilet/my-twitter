import { Route, Routes } from "react-router-dom";
import SignUpPage from "@pages/auth/SignUpPage.jsx"
import LoginPage from "@pages/auth/LoginPage.jsx";
import HomePage from "@pages/home/HomePage.jsx"
import SideBar from "@components/SideBar.jsx";
import RightBar from "@components/RightBar.jsx";
import ProfilePage from "./pages/profile/ProfilePage";

import { Toaster } from "react-hot-toast";
function App() {
  const authUser = false;
  
  return (
		<div className='flex max-w-6xl mx-auto'>
			{/* Common component, bc it's not wrapped with Routes */}
			{authUser && <SideBar />}
      <Routes>
        <Route path="/homepage" element = {<HomePage />} />
        <Route path="/signup" element = {<SignUpPage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
			{authUser && <RightBar />}
			<Toaster />
		</div>
  )
}

export default App;
