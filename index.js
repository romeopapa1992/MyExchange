import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v6.exchangerate-api.com";

const myToken = "19e293d3027632e022466ef1";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(API_URL + "/v6/" + myToken + "/latest/USD");
    res.render("index.ejs", { 
      rates: data.conversion_rates, 
      error: null,
     }); 
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
