import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://auth-system:FHEcFg10XenAwQN6@auth-system.s0zqxfv.mongodb.net/todo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("DB conn error: ", err);
  });
