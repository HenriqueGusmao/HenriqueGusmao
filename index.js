const express = require('express');
const app = express();
const port = 3000;
const userRoute = require('./routes/userRoutes');
const bodyParse = require('body-parser');

app.use(bodyParse.urlencoded({ extended: false }));

userRoute(app);

app.get('/', (req, res) => res.send("ola mundo pelo express."));

app.listen(port, () => console.log("api rodando na porta 3000"))