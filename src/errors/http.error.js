import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

// JS의 Error 클래스를 가져와 커스텀 Error
class BadRequest extends Error {
  // 생성자
  constructor(message = BadRequest.name) {
    // Error 클래스의 에러 메시지 처리 기능 땡겨온다?
    // 너무 귀찮은데 super 도전
    super(message);
    this.status = HTTP_STATUS.BAD_REQUEST;
  }
}

class Unauthorized extends Error {
  constructor(message = Unauthorized.name) {
    super(message);
    this.status = HTTP_STATUS.UNAUTHORIZED;
  }
}

class Forbidden extends Error {
  constructor(message = Forbidden.name) {
    super(message);
    this.status = HTTP_STATUS.FORBIDDEN;
  }
}

class NotFound extends Error {
  constructor(message = NotFound.name) {
    super(message);
    this.status = HTTP_STATUS.NOT_FOUND;
  }
}

class Conflict extends Error {
  constructor(message = Conflict.name) {
    super(message);
    this.status = HTTP_STATUS.CONFLICT;
  }
}

class InternalServerError extends Error {
  constructor(message = InternalServerError.name) {
    super(message);
    this.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export const HttpError = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
};
