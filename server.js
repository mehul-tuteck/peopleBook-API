require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const authenticationRouter = require("./routes/authRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const assetRouter = require("./routes/assetRoutes");

app.use("/", authenticationRouter);
app.use("/employee", employeeRouter);
app.use("/asset", assetRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
    app.use(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Could not connect to DB Because " + error);
    process.exit(1);
  }
};

connectDB();
