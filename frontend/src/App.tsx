import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { Home } from './routes/Home'
import { Settings } from './routes/Settings'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { SignUpModal } from './components/SignUpModal'
import { LogInModal } from './components/LogInModal'

/*interface User {
  type: string;
  username: string;
  email: string;
}*/

function App() {

  // const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const showLogin = () => setShowModal(true);
  const hideLogin = () => setShowModal(false);
  const showSignUp = () => setShowSignUpModal(true);
  const hideSignUp = () => setShowSignUpModal(false);

  return (
    <div>
      <NavbarComponent showLogin={showLogin} showSignUp={showSignUp} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
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
