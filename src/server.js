require('dotenv').config();
const app = require('./api');
const { errorMiddleware } = require('./middlewares/error');
const Routes = require('./routes');

const port = process.env.API_PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', Routes.login);
app.use('/user', Routes.user);
app.use('/categories', Routes.category);
app.use('/post', Routes.post);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
