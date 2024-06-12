import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { CustomHttpError } from "../errors/http.error.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  switch (true) {
    // 커스텀 스킨
    // object instanceof constructor; 객체의 프로토타입 체인 어딘가 존재하는지 판별
    case err instanceof CustomHttpError:
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
      });

    // joi에서 발생한 에러 처리
    case err.name === "ValidationError":
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: HTTP_STATUS.BAD_REQUEST,
        message: err.message,
      });

    // 그 밖의 예상치 못한 에러 처리
    default:
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.",
      });
  }
};
