import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { Home } from './routes/Home'
import { Settings } from './routes/Settings'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { SignUpModal } from './components/SignUpModal'
import { LogInModal } from './components/LogInModal'
import { Impact } from './routes/Impact'

export interface User {
  id: number;
  user_type: string;
  username: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

function App() {

  const [user, setUser] = useState<User | null>(null);
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
      <NavbarComponent user_type={user?.user_type} showLogin={showLogin} showSignUp={showSignUp} loggedIn={user !== null ? true : false} handleSignOut={handleSignOut} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home accountType={user?.user_type} userId={user !== null ? user.id : 0}/>} />
          {user && <Route path="/settings" element={<Settings user_type={user.user_type} user={user}/>} />}
          {(user && user.user_type === "volunteer") && <Route path="/impact" element={<Impact user_id={user.id} />} />}
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
