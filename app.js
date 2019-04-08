const express = require('express');
const indexRouter = require('./src/routes');
const app = express();

require('./src/config/config');

app.use(express.json());
app.use('/', indexRouter);

app.use(require('./src/routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})

module.exports = app;