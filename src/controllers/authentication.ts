// register controller
// 사용자 등록을 처리하는 부분
import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

// express로 컨트롤러 함수를 정의
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // userschema 로부터 참고하여 생각해보면 됨(클라이언트에서 보낸 데이터)
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    // req로 받은 이메일 주소로 기존 등록 유저 확인 할당
    const existingUser = await getUserByEmail(email);
    // 이미 등록된 유저가 있으면 클라이언트로 400 반환(기 등록된 중복 이메일로 register 할 수 없으므로)
    if (existingUser) {
      return res.sendStatus(400);
    }

    // 무작위 함수를 사용하여 비밀번호 해싱에 사용할 값을 생성하여 할당
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // 성공적으로 등록후 사용자 정보를 json 형식으로 응답 본문에 추가하여 응답
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
