require('dotenv').config();
const app = require('./api');
const { errorMiddleware } = require('./middlewares/error');
const login = require('./routes/login');
const user = require('./routes/user');
const category = require('./routes/category');

const port = process.env.API_PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', login);
app.use('/user', user);
app.use('/categories', category);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
