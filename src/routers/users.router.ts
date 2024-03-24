import { Router } from 'express';
import usersController from '../controllers/users.controller';

const usersRouter = Router();

usersRouter.get('/users', usersController.list);

export default usersRouter;