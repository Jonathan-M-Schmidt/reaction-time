const jsonServer = require('json-server');
const dbServer = jsonServer.create();
const express = require('express');
const path = require('path');
const jsonRouter = jsonServer.router('fakeDB/db.json');
const middlewares = jsonServer.defaults();
const axios = require('axios');

const app = express();
dbServer.use(middlewares);

const PORT = 8080;
const DBPORT = 3000;

let data = [];

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
    axios.get('http://localhost:'+DBPORT+'/results')
        .then(response => {
            data = response.data;
            data.forEach(d => {
                d.date = new Date(d.date).toLocaleDateString();
            });
            console.log(data);
            res.render("index", {
                results: data
            });
        })
        .catch(err => console.error(err));
    
});

dbServer.use(jsonRouter);

app.listen(PORT, function(){
    console.log('Server running on Port: ' + PORT);
});

dbServer.listen(DBPORT, function() {
    console.log('DB Server running on Port: ' + DBPORT);
});
