const cors = require("cors");
const express = require("express");
const router = express.Router();

const allowedOrigins = [
    'https://facebook-three-xi.vercel.app',
    'http://localhost:5173',
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
};

router.use(cors(corsOptions));

const {
    tester,
    loginUser,
    loginLordy,
    getPlayers,
    deletePlayer
} = require("../controllers/authController");


router.get('night', tester);
router.post("/login", loginUser);
router.post("/loginLordy", loginLordy);
router.get("/getPlayers", getPlayers);
router.post("/deletePlayer", deletePlayer);


module.exports = router;