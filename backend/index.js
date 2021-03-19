const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.db, config.dbOpt);
    console.log(`MongoDB connected to ${config.db}`);

    app.use((req, res) => {
        res.status(404).send({ error: "404 Not found" });
    });

    app.listen(config.port, () => {
        console.log(`Server started on http://localhost:${config.port}`);
    });
};

run().catch(console.error);