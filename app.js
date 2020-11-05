const Router = require('./route');
const express = require('express');
const app = express();

app.use(express.json());
app.use(Router);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});