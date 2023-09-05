import express from 'express';

import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

// 인증된 유저만 접근할 수 있도록 isAuthenticated 미들웨어 추가
export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
};
