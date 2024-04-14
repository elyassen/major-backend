const mongoose = require("mongoose");

function connectDb() {
  try {
    mongoose
      .connect(
        "mongodb+srv://yaseenseen9:rq7gUtnlR71plY1M@cluster0.lfvtheu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => console.log("connected"));
  } catch (e) {
    console.log(e);
  }
}

module.exports = connectDb;
