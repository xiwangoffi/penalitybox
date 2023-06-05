const express = require("express");
const dbo = require("./db/db");
const app = express();
const bodyParser = require('body-parser');
const port = 4444;
const jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
// Ce code va en haut de votre fichier index.js, dans vos requires
var cors = require('cors')

//celui-ci après la déclaration de la variable app
app.use(cors())

dbo.connectToServer();


app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


/* index.js code before... */
app.get("/account/list", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("account")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching accounts!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
      
});

app.get('/account/admin/:mail', function (req, res) {
  const { mail } = req.params;
  const dbConnect = dbo.getDb();

  dbConnect.collection('account').findOne({ mail }, function (err, result) {
    if (err) {
      res.status(400).send('Error fetching account!');
    } else {
      if (result) {
        res.json({ isAdmin: result.admin });
      } else {
        res.status(400).send('Account not found!');
      }
    }
  });
});


app.post('/account/login', jsonParser, function (req, res) {
  const { mail, password } = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection('account').findOne({ mail }, function (err, result) {
    if (err) {
      res.status(400).send('Error fetching account!');
    } else {
      if (result) {
        // Compare the entered password with the stored hashed password
        bcrypt.compare(password, result.password, function (err, passwordMatch) {
          if (passwordMatch) {
            res.json({ success: true, message: 'Login successful!' });
          } else {
            res.json({ success: false, message: 'Invalid email or password!' });
          }
        });
      } else {
        res.json({ success: false, message: 'Invalid email or password!' });
      }
    }
  });
});


app.post('/account/insert', jsonParser, async (req, res) => {

    const body = req.body;
    const dbConnect = dbo.getDb();

    const cryptage = 10;
    const hashedPassword = await bcrypt.hash(body.password, cryptage);

    const newAccount = {
        mail: body.mail,
        password: hashedPassword,
        admin: false
    };

    dbConnect.collection('account').insert(newAccount);
    res.json(newAccount);
});


app.put('/account/update/password', jsonParser, async (req, res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    console.log('Got body:', body);

    const previousPassword = body.previousPassword;
    const newPassword = body.newPassword;

    dbConnect.collection('account').findOne({ mail: body.mail }, (err, result) => {
        if(err) {
            res.status(400).send("Error fetching account!");
        } else {
            if(result) {
                bcrypt.compare(previousPassword, result.password, (err, isMatch) => {
                  if(err) {
                    res.status(400).send("Error comparing passwords!");
                  } else {
                    if(isMatch) {
                        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                            if(err) {
                                res.status(400).send("Error hashing new password!");
                            } else {
                                dbConnect.collection('account').updateOne(
                                    { mail: body.mail },
                                    { $set: { password: hashedPassword } },
                                    (err, result) => {
                                        if(err) {
                                            res.status(400).send("Error updating password!");
                                        } else {
                                            res.json({ message: "Password updated successfully" });
                                        }
                                    }
                                );
                            }
                        });
                    } else {
                        res.status(400).send("Incorrect previous password!");
                    }
                  }
                });
            } else {
                res.status(400).send("No account found with the provided email!");
            }
        }
    });
});

app.put('/account/update/admin', jsonParser, (req, res) => {
    const { mail, admin } = req.body;
    const dbConnect = dbo.getDb();
  
    dbConnect.collection('account').updateOne(
      { mail: mail },
      { $set: { admin: admin } },
      (err, result) => {
        if (err) {
          res.status(400).send('Error updating admin status!');
        } else {
          res.status(200).send('Admin status updated successfully!');
        }
      }
    );
});

app.delete('/account/delete', jsonParser, async (req, res) => {
  const mail = req.body.mail;
  const dbConnect = dbo.getDb();

  try {
    const result = await dbConnect.collection('account').deleteOne({ mail: mail });
    
    if (result.deletedCount === 1) {
      res.json({ message: "Account deleted successfully" });
    } else {
      res.status(400).send("No account found with the provided email");
    }
  } catch (error) {
    res.status(500).send("Error deleting account: " + error.message);
  }
});


app.post('/versions/insert', jsonParser, (req, res) => {
    const { version, changelog, image } = req.body;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const versionDate = year + "-" + month + "-" + day;
    const dbConnect = dbo.getDb();
  
    const versionData = {
      version: parseInt(version),
      changelog: changelog,
      date: versionDate,
      image: image
    };
  
    dbConnect.collection('versions').insertOne(versionData, (err, result) => {
      if (err) {
        res.status(400).send('Error inserting version data!');
      } else {
        res.status(200).send('Version data inserted successfully!');
      }
    });
});
  