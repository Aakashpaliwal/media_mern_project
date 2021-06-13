import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use("/posts", postRoutes);
//setup DB
const CONNECTION_URL =
  "mongodb+srv://aakash404:Barcelona@123@cluster0.u5wyo.mongodb.net/memories_db?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
