import express from 'express';

import { getUsers } from '../db/users';

// db에서 전체유저를 찾아서 반환해주는 컨트롤러
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
