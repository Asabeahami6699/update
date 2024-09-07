const express = require('express');

const { LogInCollection ,Transaction,
  UserMoMoCollection ,UserInputsCollection,
  UserDInputsCollection,SBTransaction ,
  SUserMoMoCollection ,SuperuserInputsCollection } = require('./mongodb');

const app = express();
app.use(express.json());  



module.exports = app;