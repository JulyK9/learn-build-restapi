import express from 'express';

import { register } from '../controllers/authentication';

// 해당 엔드포인트에 post 요청이 들어오면 어떤 컨트롤러 함수를 싫행할지 정의하는 부분
// /auth/register 엔드포인트로 post 요청이 들어오면 register 컨트롤러 함수를 실행함
// register 함수는 사용자 등록을 처리하고 응답을 반환하게 됨
export default (router: express.Router) => {
  router.post('/auth/register', register);
};
