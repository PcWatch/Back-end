"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Handle = require('./handle');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI);

app.get("/test", (req, res) => {
  res.send("the server is serving");
});

app.get("/favorite", Handle.getFavRecipe);
app.get('/recipe', Handle.getShortList);
app.get('/recipe/:id', Handle.getFullRecipe)

app.post("/recipe", Handle.addRecipe);
app.post("/favorite/:id", Handle.addFavRecipe);

app.delete("/recipe/:id", Handle.deleteRecipe);



app.listen(PORT, () => console.log(`listening on ${PORT}`));
