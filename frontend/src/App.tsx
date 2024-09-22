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
  type: string;
  username: string;
  email: string;
}

function App() {

  const [user, setUser] = useState<User | null>({
    id: 1,
    type: "volunteer",
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

  return (
    <div>
      <NavbarComponent showLogin={showLogin} showSignUp={showSignUp} loggedIn={user !== null ? true : false} handleSignOut={handleSignOut} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home accountType={user?.type}/>} />
          {user && <Route path="/settings" element={<Settings type={user.type} user={user}/>} />}
        </Routes>
      </main>
      

      <Modal show={showModal} onHide={hideLogin}>
        <LogInModal />
      </Modal>

      <Modal show={showSignUpModal} onHide={hideSignUp}>
        <SignUpModal />
      </Modal>
    </div>
  )
}

export default App
