// register controller
// 사용자 등록을 처리하는 부분
import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

// login 컨트롤러 함수 정의
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );
    // select 메서드는 mongoose에서 데이터베이스 쿼리를 실행할 때 필드 선택 옵션을 지정하는 부분임
    // 사용자 객체에서 선택할 필드를 지정하는데 '+' 기호로 해당 필드를 선택하도록 지정
    // 즉 이메일 기반으로 사용자를 검색하여 검색된 사용자 객체에서 해당 필드를 선택하여 가져와 인증 과정에서 활용

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403); // 인증은 되었으나 요청 리소스에 대한 접근권한 없음
    }

    // salt와 사용자 아이디를 기반으로 세션 토큰 생성
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    // 새로운 세션 토큰을 생성하고 사용자 객체에 저장
    await user.save();

    // 새로 생성한 세션 토큰을 쿠키로 설정하여 클라이언트에게 전달
    // 클라리언트는 세션을 유지하고 인증된 요청을 보낼 수 있음
    res.cookie('JK9-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

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
