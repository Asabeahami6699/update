const express = require('express')
const bcrypt = require('bcrypt');
const { LogInCollection ,Transaction,UserMoMoCollection ,UserInputsCollection,
  UserDInputsCollection,SBTransaction ,SUserInput3Collection ,SuperuserInputsCollection,
  OthersWithdrawalCollection,SusuDocs,TellerInput3,SUserInput4Collection,SUserInput5Collection } = require('./mongodb');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initializePassport = require('./passport');

initializePassport(
    passport,
    name => LogInCollection.findOne({ name: name }),
    id => LogInCollection.findById(id)
);

const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Admin adding Teller to the system
app.post('/UserRegisteration',checkAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const checking = await LogInCollection.findOne({ 
            name: req.body.name,
        });

        const userWithSameDetails = await LogInCollection.findOne({
          branch: req.body.branch,
          tellertype: req.body.tellertype
        });

        if (checking) {
          res.json({ success: false, error: 1});
        } else if (userWithSameDetails) {
          res.json({ success: false, error: 2});
          }
        else {
            const newData = new LogInCollection({
                name: req.body.name,
                usertype: req.body.usertype,
                branch: req.body.branch,
                tellertype: req.body.tellertype,
                Password: hashedPassword 
            });
            await newData.save();
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 3});
    }
});

// Admin adding such as another Admin, Superuser and Special Invites to the system
app.post('/UserRegisteration2', checkAuthenticated, async (req, res) => {
  try {
      const { name, usertype, branch, tellertype, Password } = req.body;
      const hashedPassword = await bcrypt.hash(Password, 10);

      const checking = await LogInCollection.findOne({ name });

      if (checking) {
          return res.json({ success: false, error: 1});
      } 

      if (usertype === "Administrator" || usertype === "Superuser") {
          const existingUserType = await LogInCollection.findOne({ usertype });
          if (existingUserType) {
              return res.json({ success: false, error: 2});
          }
      }

      const newData = new LogInCollection({
          name,
          usertype,
          branch,
          tellertype,
          Password: hashedPassword 
      });
      await newData.save();
      res.json({ success: true });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 3});
  }
});

// All users login route
app.post('/userslogin', passport.authenticate('local', {
  failureRedirect: '/', 
  failureFlash: true 
}), (req, res) => {
  if (req.user.usertype === 'Superuser') {
      res.redirect('/superuser');
  } else if (req.user.usertype === 'Teller') {
      res.redirect('/user');
  } else if (req.user.usertype === 'Administrator') {
      res.redirect('/admin');
  } else if (req.user.usertype === 'Invites') {
      res.redirect('/superuser2');
  } else {
      res.redirect('/');
  }
});
  
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/')
};

app.delete('/logout', (req, res) => {
  req.logout(function(err){
    if(err){
       return next(err); 
    }
    res.redirect('/');
  })
});

// Route for user to submit a bank transactions record
app.post('/Userbpayment', async (req, res) => {
  const teller = req.user.tellertype;
  const Branch = req.user.branch;
  const bankType = req.body.BankType;
  const description = req.body.description;
  const accountNumber = req.body.AccountNumber; 
  const Bname = req.body.Bname;
  const commssn = req.body.Commission;
  const amount = req.body.amount;

  const newTransaction = new Transaction({
      Bank: bankType,
      Description: description,
      AccounTNumber: accountNumber,
      Beneficialname: Bname,
      TellerType: teller,
      Commission: commssn,
      TheBranch: Branch,
      Amount:amount
  });

  try {
    await newTransaction.save();
    res.json({ success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false});
   }
});

// Route for user to submit a MoMo transaction record
app.post('/Usermpayment', async (req, res) => {
  const teller = req.user.tellertype;
  const Branch = req.user.branch;
  const momo = req.body.MoMo;
  const description = req.body.description;
  const momoNumber = req.body.momonumber; 
  const Bname = req.body.Bname;
  const amount = req.body.amount;
  const commssn = req.body.Commission;
  const commDescription = req.body.commDescMm;
  const commReason = req.body.R1name;

  const newUserMoMoCollection = new UserMoMoCollection({
      MoMo: momo,
      Description: description,
      MoMoNumber: momoNumber,
      Beneficialname: Bname,
      Commission: commssn,
      TellerType: teller,
      TheBranch: Branch,
      Amount:amount,
      commDescription:commDescription,
      commReason:commReason
  });

  try {
    await newUserMoMoCollection.save();
    res.json({ success: true});
  }  
  catch (error) {
   console.log(error);
   res.status(500).json({ success: false});
  }
});


// Route for user to submit the Initial Physical Cash record
app.post('/UserInputs1', async (req, res) => {
  const type =req.user.tellertype;
  const location = req.user.branch;
  const username = req.user.name;
  const TType = req.body.TranscType;
  const Type = req.body.openb;
  const amount = req.body.Intialamount;

  const newUserInputsCollection = new UserInputsCollection({
      Name: username,
      InputType: TType,
      InputAmount:amount,
      TheType:Type,
      Teller_Type: type ,
      The_Branch: location 
    
  });
  try {
    await newUserInputsCollection.save();
    res.json({ success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false});
  }
});

// Route for user to submit the Physical Cash Coltd Amount record
app.post('/UserInputs2', async (req, res) => {
  const type =req.user.tellertype;
  const location = req.user.branch;
  const userId = req.user.name;
  const TType = req.body.TranscdType;
  const Type = req.body.deposit;
  const amount = req.body.depositedamount;

  const newUserDInputsCollection = new UserDInputsCollection({
      Name: userId,
      InputType: TType,
      InputAmount:amount,
      TheType:Type,
      Teller_Type: type ,
      The_Branch: location 
    
  });

  try {
    await newUserDInputsCollection.save();
    res.json({ success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false});
  }
});

// Route for user to submit the Input 3 info. record
app.post('/UserInputs3', async (req, res) => {
  const type =req.user.tellertype;
  const location = req.user.branch;
  const userId = req.user.name;
  const select = req.body.selt;
  const factor = req.body.factor;
  const amount = req.body.amount;

  const newTellerInput3 = new TellerInput3({
      Name: userId,
      Type: select,
      Amount:amount,
      Description:factor,
      Teller_Type: type ,
      The_Branch: location 
    
  });

  try {
    await newTellerInput3.save();
    res.json({ success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit a transaction record
app.post('/Spayment', async (req, res) => {
  const username = req.user.name;
  const usertype = req.user.usertype;
  const BType = req.body.TransType;
  const branch = req.body.branch;
  const amount = req.body.amount;
  const Teller = req.body.teller;
  

  const newSBTransaction = new SBTransaction({
      Name: username,
      Processor: usertype,
      Transaction: BType,
      Amount:amount,
      Teller_Type: Teller ,
      The_Branch: branch
    
  });

  try {
      await newSBTransaction.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Opening Balance record
app.post('/SuperuserInput1', async (req, res) => {
  const username = req.user.usertype;
  const medium = req.body.paymenttype;
  const Type = req.body.openb;
  const amount = req.body.openAmt;

  const newSuperuserInputsCollection = new SuperuserInputsCollection({
      Name: username,
      Medium: medium   ,
      Input_Amount:amount,
      The_Type: Type  
  });

  try {
      await newSuperuserInputsCollection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Ecash collected Amount record
app.post('/SuperuserInput2', async (req, res) => {
  const username = req.user.usertype;
  const medium = req.body.paymenttype;
  const Type = req.body.deposits;
  const amount = req.body.depositedAmount;


  const newSuperuserInputsCollection = new SuperuserInputsCollection({
      Name: username,
      Medium: medium   ,
      Input_Amount:amount,
      The_Type: Type  
  });

  try {
      await newSuperuserInputsCollection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Commission record and MoMo Charges
app.post('/SuperuserInput3', async (req, res) => {
  const username = req.user.usertype;
  const branch = req.body.branch;
  const Teller = req.body.teller;
  const Type = req.body.Commissions;
  const amount = req.body.CommAmt;


  const newSUserInput3Collection = new SUserInput3Collection({
      Processor: username,
      The_Branch: branch,
      Teller_Type: Teller,
      Amount:amount,
      The_Type: Type  
  });

  try {
      await newSUserInput3Collection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Ecobank Cash out record
app.post('/SuperuserInput5', async (req, res) => {
  const username = req.user.usertype;
  const Account = req.body.Account;
  const Type = req.body.Cashout;
  const amount = req.body.EcoCashOut;


  const newSUserInput4Collection = new SUserInput4Collection({
      Processor: username,
      Medium: Account,
      Amount: amount,
      The_Type:Type
  });

  try {
      await newSUserInput4Collection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit All Transactions Total Entries record
app.post('/SuperuserInput4', async (req, res) => {
  const username = req.user.usertype;
  const Account = req.body.Account;
  const Type = req.body.entries;
  const amount = req.body.EntryAmt;


  const newSUserInput4Collection = new SUserInput4Collection({
      Processor: username,
      Medium: Account,
      Amount: amount,
      The_Type:Type
  });

  try {
      await newSUserInput4Collection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Fidelity Withdrawals record
app.post('/SuperuserInput6', async (req, res) => {
  const username = req.user.usertype;
  const Acct= req.body.Account;
  const Type = req.body.Fidel;
  const amount = req.body.FAmount;


  const newSUserInput5Collection = new SUserInput5Collection({
      Processor: username,
      Account: Acct,
      Amount: amount,
      The_Type:Type
  });

  try {
      await newSUserInput5Collection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Superuser to submit Other(MTN MoMo and Ecobank) Deposits record
app.post('/SuperuserInput7', async (req, res) => {
  const username = req.user.usertype;
  const Type = req.body.otherEco;
  const Acct= req.body.Account;
  const amount = req.body.OtAmount;


  const newSUserInput5Collection = new SUserInput5Collection({
      Processor: username,
      Account: Acct,
      Amount: amount,
      The_Type:Type
  });

  try {
      await newSUserInput5Collection.save();
      res.json({ success: true});
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false});
  }
});

// Route for Teller to submit the SuSu record
app.post('/susutransform', async (req, res) => {
  const type =req.user.tellertype;
  const location = req.user.branch;
  const username = req.user.name;
  const medium = req.body.description;
  const name = req.body.name;
  const amount = req.body.amount;
  const Anumber = req.body.AccountNumber;


  const newSusuDocs = new SusuDocs({
      Name: username,
      Description: medium   ,
      Amount:amount,
      Beneficial_Name: name,
      AccounTNumber: Anumber,
      Teller_Type: type ,
      The_Branch: location  
  });
  try {
    await newSusuDocs.save();
    res.json({ success: true});
  }  
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false});
  }
});

// Route for Tellers to submit other Withdrawals record
app.post('/UserOtherTrans', async (req, res) => {
  const type =req.user.tellertype;
  const location = req.user.branch;
  const username = req.user.name;
  const medium = req.body.withdrawalType;
  const name = req.body.Bname;
  const amount = req.body.amount;


  const newOthersWithdrawalCollection = new OthersWithdrawalCollection({
      Name: username,
      Type: medium   ,
      Amount:amount,
      Beneficial_Name: name,
      Teller_Type: type ,
      The_Branch: location    
  });

  try {
    await newOthersWithdrawalCollection.save();
    res.json({ success: true});
  }    
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false});
  }
});

// Delete the user from the system
app.post('/DeleteUser',checkAuthenticated, (req, res) => {
  const username = req.body.Username;

  LogInCollection.deleteOne({ name: username })
    .then(result => {
      if (result.deletedCount === 1) {
        res.json({ success: true});
      } else {
        res.json({ success: false, error: 1});
      }
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.json({ success: false, error: 2});
    });
});

// Route to view the number of users
app.get('/users/count', (req, res) => {
  LogInCollection.countDocuments({})
    .then(count => {
      res.send(count.toString());
    })
    .catch(err => {
      console.error('Error counting users:', err);
      res.status(500).send('Internal Server Error');
    });
});


module.exports = app;
