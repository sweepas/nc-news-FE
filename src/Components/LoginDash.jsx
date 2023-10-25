import { useAuth } from "../Context/LoginContext";

function LoginDash() {
  const { authUser, setAuthUser, logedIn, setLogedIn } = useAuth();

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

  return (
    <div className="login-container">
      {logedIn ? (
        <span>
          Hi, {authUser}
          <button
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
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <input placeholder="unername" id="input-id" type="text" />
            <button
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
  );
}

export default LoginDash;
