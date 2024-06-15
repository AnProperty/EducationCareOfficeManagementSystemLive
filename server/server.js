const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connection established"))
.catch(() => console.log("Database connection failed"));

const port = 5050;

app.listen(port, () => {
  console.log(`App is running at port 5002`);
});