import express from 'express';
import productsRouter from './routers/products.router';
import usersRouter from './routers/users.router';

const app = express();

app.use(express.json());

app.use(productsRouter);
app.use(usersRouter);

export default app;
