const express = require('express');

const loginRoute = require('./routes/loginRouter');
const userRoute = require('./routes/userRouter');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/', loginRoute);
app.use('/', userRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
