require('dotenv').config();
const app = require('./api');
const { errorMiddleware } = require('./middlewares/error');
const login = require('./routes/login');

const port = process.env.API_PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', login);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
