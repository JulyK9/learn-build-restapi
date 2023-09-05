import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

// 인증된 유저만 접근할 수 있도록 isAuthenticated 미들웨어 추가
// delete도 인증된 유저가 isOwner에 해당되면 해야하므로 둘다 추가해줘야 함
export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
