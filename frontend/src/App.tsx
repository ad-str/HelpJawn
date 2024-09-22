import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { Home } from './routes/Home'
import { Settings } from './routes/Settings'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { SignUpModal } from './components/SignUpModal'
import { LogInModal } from './components/LogInModal'

export interface User {
  id: number;
  user_type: string;
  username: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {

  const [user, setUser] = useState<User | null>({
    id: 1,
    user_type: "volunteer",
    username: "test",
    email: "email@test.com"
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const showLogin = () => setShowModal(true);
  const hideLogin = () => setShowModal(false);
  const showSignUp = () => setShowSignUpModal(true);
  const hideSignUp = () => setShowSignUpModal(false);

  //  Handles sign out of application
  const handleSignOut = () => {
    setUser(null);
  }

  const handleSuccessfulSignup = (user: User) => {
    setUser(user);
    hideSignUp();
  }

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        console.log("Response is okay");
        const data = await response.json();
        setUser(data.user);
        hideLogin();
      } else {
        console.error('Login failed');
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed');
    }
  }

  return (
    <div>
      <NavbarComponent showLogin={showLogin} showSignUp={showSignUp} loggedIn={user !== null ? true : false} handleSignOut={handleSignOut} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home accountType={user?.user_type}/>} />
          {user && <Route path="/settings" element={<Settings type={user.user_type} user={user}/>} />}
        </Routes>
      </main>
      

      <Modal show={showModal} onHide={hideLogin}>
        <LogInModal handleLogIn={handleLogin}/>
      </Modal>

      <Modal show={showSignUpModal} onHide={hideSignUp}>
        <SignUpModal setUser={handleSuccessfulSignup} />
      </Modal>
    </div>
  )
}

export default App
