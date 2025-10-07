const mongoose = require("mongoose");
const { Schema } = mongoose;

const FB_NightPlayerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: "facebook", 
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"], 
    default: "low",
  },
});

const UserModel = mongoose.model("fb_night_player", FB_NightPlayerSchema);

module.exports = UserModel;
