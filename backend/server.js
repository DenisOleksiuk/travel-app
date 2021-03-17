const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

let countries = [];
const Country = require('./countries/countries.schema');
const Users = require('./users/users-schema');

const mongoURL = 'mongodb+srv://IgorAleks88:Veremiy1988@cluster0.abmvg.mongodb.net/travel-app?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../dist')));


app.get('/api/countries', async (req, res) => {
  countries = await Country.find({});
  res.send(JSON.stringify(countries));
});

app.post('/api/login', async (req, res) => {
  const userArray = await Users.find({});
  const currentUser = userArray.find((user) => user.name === req.body.name);
  let result = "wrongUser"
  if (currentUser) {
    if (currentUser.pass !== req.body.pass) {
      result = "wrongPassword"
    } else {
    result = "ok";
    }
  }
  res.send(result);
});

app.post('/api/register', async (req, res) => {
  const userArray = await Users.find({});
  const currentUser = userArray.find((user) => user.name === req.body.name);
  let result = "ok"
  if (currentUser) {
    result = "userExists"   
  } else if (req.body.name.length < 4) {
      result = "nameIsTooShort"
    } else {
    Users.create({name:req.body.name, pass: req.body.pass});
    }
  res.send(result);
});

app.post('/api/rate', async (req, res) => {
  const newRate = {user:req.body.user, rating:req.body.rating};
  const currentAttraction = `attraction.${req.body.attractionIndex}.rate`;
  await Country.updateOne({_id:req.body.countryId}, {$push:{[currentAttraction]:newRate}});
  const doc = await Country.findById(req.body.countryId);
  doc.save();
  const newBaseArray = await Country.find({});
  const NewSerbia = newBaseArray.find((country) => country.name === "Serbia");
  res.send(NewSerbia);

});

const PORT = process.env.PORT || 3000;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  app.listen(PORT);
  Country.find({}).then(res => {
    countries = res;
  });
})
