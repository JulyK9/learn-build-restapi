import express from 'express';
import authentication from './authentication';

// express의 라우터 객체 생성
// 라우터는 URL 경로와 HTTP 메서드에 따라 요청을 처리하고 라우팅함
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  // authentication 모듈 내부에서 정의한 경로 및 핸들러 설정이 router 객체에 적용됨
  // 이 설정이 모듈 내에서 처리되며 모듈을 불러온 곳에서 설정된 라우터를 사용할 수 있도록 함
  // 모듈화된 라우팅을 설정하는 것

  return router;
};
// express.Router 타입의 객체를 반환한다고 타입 지정
// 라우터 객체를 생성해서 모듈로 내보내고 다른 곳에서 import 해서 사용하기 위함

// 좀 더 쉽게 생각하면
// 기본 라우팅 객체와 세부 라우팅 모듈을 분리하여 사용하는 방법이라고 보면 됨

/*
일반적인 패턴:

기본 라우팅 객체 생성: 기본 라우팅 객체를 생성하고 필요한 전역 설정을 적용
세부 라우팅 모듈 생성: 세부 라우팅 기능을 수행하는 모듈을 생성. 이 모듈은 해당 기능과 관련된 경로 및 핸들러를 정의함.
모듈 연결: 세부 라우팅 모듈을 기본 라우팅 객체에 연결합니다. 이렇게 하면 세부 라우팅 모듈에서 정의한 경로와 핸들러가 기본 라우팅 객체에 등록되어 사용됨

이러한 모듈화 및 연결 패턴은 코드의 가독성을 높이고 유지 관리를 간편하게 만들어주며, 여러 모듈 간에 기능을 재사용하기 용이하게 함.
**/
