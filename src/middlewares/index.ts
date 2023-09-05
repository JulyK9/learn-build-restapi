import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

// 미들웨어 함수 설정
// 쿠키에서 세션 토큰을 확보하여 인증된 사용자인지 확인하고
// 인증된 사용자 객체에 속성을 추가하여 다음 함수로 넘기는 미들웨어 임
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['JK9-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    // merge는 req 객체에 해당 두번째 인자 객체를 추가하는 lodash 메서드(객체병합에 사용)
    merge(req, { identity: existingUser });

    // 다음 미들웨어 또는 라우트 핸들러를 호출하기 위해 next 함수를 호출함
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    // req 객체에서 'identity._id' 경로를 사용하여 현재 사용자의 ID를 추출
    // lodash 라이브러리의 메소드인 get은 객체에서 지정된 경로의 값을 추출하게 해줌
    // 'identity._id' 경로는 현재 사용자 객체의 _id 속성을 나타냄
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
