import { useState } from "react";
import "./Admin.css";
import axios from "axios";

const binary = `01001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 01100101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
01010011 01111001 01110011 01110100 01100101 0110110101001000 01100001 01100011 01101011 00100000 01001100 01101111 01100111 01101001 01101110
01110011 00100000 01001001 01101110 01101001 01110100 01101001 01100001 01110100 0110010101010011 01111001 01110011 01110100 01100101 01101101
`; // the large binary block (keep as provided)

export default function App() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username) {
        setSuccess("");
        setError("Night Player_ID is required!");
      }

      if (!password) {
        setSuccess("");
        setError("Night player_password is required!");
      }

      await axios.post("/loginLordy", { username, password }).then((data) => {
        console.log(data.data.existing.lordysID);
        if (data.data.success) {
          setSuccess(data.data.success);
          setUsername("");
          setPassword("");
          setError("");
          localStorage.setItem("LordyID", data.data.existing.lordysID);
          setTimeout(() => {
            location.href = "/admin";
          }, 5000)
        } else if (data.data.error) {
          setSuccess("");
          setUsername("");
          setPassword("");
          setError(data.data.error);
        }
      })
    } catch (error) {
      console.log(error);
    }

    //alert(`Access Granted: Welcome, ${username || "Anonymous Hacker"} 🔓`);
  };

  return (
    <div className="admincontainer">
      {/* Scrolling binary column */}
      <div className="binary-column" aria-hidden>
        <div className="binary-scroll">
          {/* repeat content twice for smooth loop */}
          <pre className="binary-text">{binary}</pre>
          <pre className="binary-text">{binary}</pre>
        </div>
      </div>

      {/* Main card - includes SVG hacker + form */}
      <div className="login-box">
        <div className="hacker-head">
          {/* Neon hacker mask SVG */}
          <svg viewBox="0 0 200 200" className="hacker-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* hood */}
            <path d="M100 10 C55 10 20 55 20 90 C20 130 55 160 100 160 C145 160 180 130 180 90 C180 55 145 10 100 10 Z"
              fill="rgba(0,0,0,0.6)" stroke="#00ff00" strokeWidth="2" filter="url(#glow)" />
            {/* mask base */}
            <ellipse cx="100" cy="95" rx="52" ry="36" fill="black" stroke="#00ff00" strokeWidth="1.5" />
            {/* eyes */}
            <path d="M74 86 Q84 76 94 86" stroke="#00ff00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M106 86 Q116 76 126 86" stroke="#00ff00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* mouth smirk */}
            <path d="M78 106 Q100 118 122 106" stroke="#00ff00" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* mask detail lines */}
            <path d="M64 110 Q100 140 136 110" stroke="#005500" strokeWidth="0.8" fill="none" opacity="0.35" />
          </svg>
        </div>

        <h1 className="title">SYSTEM LOGIN</h1>

        {success !== "" ? <p style={{ fontSize: "14px" }} className="title">{success}</p> : ""}
        {error !== "" ? <p style={{ color: "red", fontSize: "14px" }} className="title">{error}</p> : ""}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter ID..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">ACCESS</button>
        </form>
      </div>
    </div>
  );
}
