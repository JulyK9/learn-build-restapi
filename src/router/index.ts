import express from 'express';

// express의 라우터 객체 생성
// 라우터는 URL 경로와 HTTP 메서드에 따라 요청을 처리하고 라우팅함
const router = express.Router();

export default (): express.Router => {
  return router;
};
// express.Router 타입의 객체를 반환한다고 타입 지정
// 라우터 객체를 생성해서 모듈로 내보내고 다른 곳에서 import 해서 사용하기 위함
