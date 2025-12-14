import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
  }

  return (
    <div>
      <h1>Sweet Shop</h1>

      {loggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
          <Sweets />
        </>
      ) : (
        showRegister ? (
          <>
            <Register onDone={() => setShowRegister(false)} />
          </>
        ) : (
          <>
            <Login onLogin={() => setLoggedIn(true)} />
            <button onClick={() => setShowRegister(true)}>
              New user? Register
            </button>
          </>
        )
      )}
    </div>
  );
}

export default App;
