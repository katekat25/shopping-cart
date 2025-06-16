import { Link, Outlet, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <Link to="/">CoolStuff.com</Link>
          <div className="button-container">
            <a>Profile</a>
            <a>Search</a>
            <Link to="cart">My cart</Link>
          </div>
        </nav>
        {isHomepage && (
          <div>
            <h1>CoolStuff.com</h1>
            <p>We bring you the coolest stuff, all the time. Shop now, or be a poser. It's your choice.</p>
          </div>
        )}

        <Outlet />

        <footer>
          <p>Brought to you by Kate Schumacher</p>
        </footer>
      </div>
    </>
  )
}

export default App
