const mongoose = require("mongoose");
const {Schema} = mongoose;

const lordySchema = new Schema({
    lordysID: {
        type: String
    },
    password: {
        type: String
    }
})

const lordysModel = mongoose.model("lordy", lordySchema);

module.exports = lordysModel;