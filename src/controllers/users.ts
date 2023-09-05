import express from 'express';

import { deleteUserById, getUsers } from '../db/users';

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

// 유저 삭제 컨트롤러
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // 클라이언트에서 요청할 때 /users/:id (실제로는 /users/dkl41jkl4 이렇게 오니까)
    // 여기서 오는 id를req.params로 캐치할 수 있음
    // 즉 라우팅 경로에 동적으로 생성된 파라미터 값을 추출하는 데 사용
    // 일반적으로 RESTful API에서 리소스 식별자(ID)를 가져오는 데 사용됨
    const { id } = req.params;

    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
