const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");

dotenv.config();
const app = express();

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (process.env.ALLOWED_ORIGINS) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", async (req, res) => {
  try {
    res.json("Hello from server");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB Error, ', err.message));