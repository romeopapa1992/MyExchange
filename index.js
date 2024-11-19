import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://v6.exchangerate-api.com";
const myToken = "19e293d3027632e022466ef1";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${API_URL}/v6/${myToken}/latest/USD`);
    res.render("index.ejs", {
      rates: null,
      error: null,
      currency: null,
      rate: null,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/", async (req, res) => {
  const requestedCurrency = req.body.currency.toUpperCase();
  try {
    const { data } = await axios.get(`${API_URL}/v6/${myToken}/latest/USD`);
    const rates = data.conversion_rates;

    if (requestedCurrency in rates) {
      res.render("index.ejs", {
        rates: {}, 
        error: null,
        currency: requestedCurrency,
        rate: rates[requestedCurrency],
      });
    } else {
      res.render("index.ejs", {
        rates: {}, 
        error: `Currency "${requestedCurrency}" not found.`,
        currency: null,
        rate: null,
      });
    }
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
