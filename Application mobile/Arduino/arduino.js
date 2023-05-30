var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 4000;

// protection CORS 
var cors = require('cors');
const corsOptions = {
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
// parsing json 
app.use(bodyParser.json());

//------------------------------------------------
// Allumer tous les feux
//------------------------------------------------
app.get('/allumer/feux/tous', cors(), (req, res) => {
    console.log('Tous les feux allumé');
    res.status(200).json({
        data: 'Tous les feux allumé'
    });
});

//------------------------------------------------
// Allumer les feux rouges
//------------------------------------------------
app.get('/allumer/feux/rouge', cors(), (req, res) => {
    console.log('Feux rouge allumé');
    res.status(200).json({
        data: 'Feux rouge allumé'
    });
});

//------------------------------------------------
// Allumer les feux rouges de droite
//------------------------------------------------
app.get('/allumer/feux/droiteRouge', cors(), (req, res) => {
    console.log('Feux rouge droit allumé');
    res.status(200).json({
        data: 'Feux rouge droit allumé'
    });
});

//------------------------------------------------
// Allumer les feux rouges de gauche
//------------------------------------------------
app.get('/allumer/feux/gaucheRouge', cors(), (req, res) => {
    console.log('Feux rouge gauche allumé');
    res.status(200).json({
        data: 'Feux rouge gauche allumé'
    });
});

//------------------------------------------------
// Allumer les feux vert
//------------------------------------------------
app.get('/allumer/feux/vert', cors(), (req, res) => {
    console.log('Feux vert allumé');
    res.status(200).json({
        data: 'Feux vert allumé'
    });
});

//------------------------------------------------
// Extinction de tous les feux
//------------------------------------------------
app.get('/extinction/feux', cors(), (req, res) => {
    console.log('Feux éteint');
    res.status(200).json({
        data: 'Feux éteint'
    });
});

app.listen(port, () => {
    console.log('Serveur lancé sur le port : ' + port);
});