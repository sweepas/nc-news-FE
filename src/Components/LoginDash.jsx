import { useAuth } from "../Context/LoginContext";
import { useState } from "react";

function LoginDash() {
  const { authUser, setAuthUser, logedIn, setLogedIn } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const dynamicContentOut = "->]";
  const dynamicContentIn = "[->";
  function login(e) {
    e.preventDefault();
    if (authUser.length >= 5) {
      setLogedIn(true);
    }
  }

  function logout(e) {
    setLogedIn(false);
    setAuthUser("");
  }

  function handleChange(e) {
    const username = e.target.value;
    setAuthUser(username);
  }

  const handleToggleClick = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <>
      <span className="log-icon">
        {logedIn ? (
          <a href="#" className="login-icon" onClick={handleToggleClick}>
            {dynamicContentIn}
          </a>
        ) : (
          <a href="#" className="logout-icon" onClick={handleToggleClick}>
            {dynamicContentOut}
          </a>
        )}
      </span>
      <div className={`login-container ${isActive ? "active" : ""}`}>
        {logedIn ? (
          <span>
            <span className="hi-span log-item">Hi, {authUser}</span>

            <button
              className="log-item"
              onClick={(e) => {
                logout(e);
              }}
            >
              Log out
            </button>
          </span>
        ) : (
          <span>
            <form
              id="log-form"
              name="form-name"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <input
                placeholder="unername"
                className="log-item"
                type="text"
                name="input"
              />
              <button
                className="log-item"
                onClick={(e) => {
                  login(e);
                }}
              >
                Log in
              </button>
            </form>
          </span>
        )}
      </div>
    </>
  );
}

export default LoginDash;
