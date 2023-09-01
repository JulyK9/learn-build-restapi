// authentication helpers
// encrypt password, create random token
import crypto from 'crypto';
// nodejs 내장 모듈로 암호화 및 해시 함수를 제공하여 데이터 보안 관련 작업 수행
import { config } from 'dotenv';

config();
const SECRET = `${process.env.CRYPTO_SECRET}`;

// 128 바이트의 무작위 바이트 시퀀스를 생성하고 base64 문자열로 변환
export const random = () => crypto.randomBytes(128).toString('base64');

// 두개의 인자를 조합하여 비밀번호를 암호화하는 로직
// salt는 사용자의 비번을 해싱할 때 추가 보안을 위해 사용하는 속성값
// password는 사용자의 실제 비번
export const authentication = (salt: string, password: string) => {
  // HMAC(Hash based Message Authentication Code)를 생성
  // 이때 해싱 알고리즘으로 sha256 을 사용하고 salt와 password를 / 문자로 연결하여 생성
  // update(SECERT)은 암호화된 비번을 추가로 비밀키(SECRET)로 해싱
  // digest() 최종 해싱값을 16진수 문자열로 반환
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};
