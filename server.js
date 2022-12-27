require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRouters = require("./routes/workouts");

//express app
const app = express();

//middleware
app.use(express.json()); //checks if req has data, then attaches it to req object
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//router handler
app.use("/api/workouts/", workoutRouters);

// app.get('/', (req, res) => {
//   res.json({mssg: 'Welcome to the app'})
// })

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db, listening on port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
