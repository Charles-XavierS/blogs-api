const express = require('express');

const loginRoute = require('./routes/loginRouter');
const userRoute = require('./routes/userRouter');
const categoryRoute = require('./routes/categoryRouter');
const postRoute = require('./routes/postRouter');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', postRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
