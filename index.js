const express = require('express');
const { resolve } = require('path');
const cors = require("cors");
const app = express(); 
const port = 3000;
app.use(express.static('static'));
app.use(cors());
app.get('/', (req, res) => {
  res.send("Welcome to Stock portfolio analysis API!");
});
// Endpoint 1: takes three variables as query parameters and returns total Return Value of the stocks
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseInt(req.query.quantity);
  let returnValue = (marketPrice - boughtAt) * quantity;
  res.send(returnValue.toString());
});
// Endpoint2: takes four variables as query parameters and returns total return value of all the stocks
app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let totalReturns = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturns.toString());
});
// Endpoint 3:takes two variables as query parameters and returns total ReturnPercentage of the stocks.
app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  let message = 'Invalid input';
  if (boughtAt && returns) {
      message = (returns / boughtAt) * 100;
  }
  res.send(message.toString());
});
// Endpoint4: takes four variables as query parameters and returns total return percentage of all the stocks.
app.get('/total-return-percentage', (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);
  const totalReturn = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturn.toString());
});
// Endpoint 5:takes returnPercentage as query parameter and returns the stock status.
app.get('/status', (req, res) => {
  let returnPercentage = req.query.returnPercentage;
  if (returnPercentage) {
      let status = returnPercentage > 0 ? "profit" : "loss";
      res.json({ status });
  } else {
      res.json({ status: "Invalid return percentage" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
