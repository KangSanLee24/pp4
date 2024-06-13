import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
// import { AuthService } from "../services/auth.service.js";

// authorization 받고 service 계층에 accessToken보내고
// user정보 받음. req.user에 user넣고 next => authorization 체크
// 의존성 주입 어떻게 해야할까... => 고차함수 (다른 함수를 인자로 받고 함수를 반환)

export const requireAccessToken = (authService) => {
  return async (req, res, next) => {
    // const authService = new AuthService();

    try {
      // 인증 정보 파싱
      const authorization = req.headers.authorization;

      // Authorization이 없는 경우
      if (!authorization) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      // JWT 표준 인증 형태와 일치하지 않는 경우
      const [type, accessToken] = authorization.split(" ");

      if (type !== "Bearer") {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
        });
      }

      // AccessToken이 없는 경우
      if (!accessToken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      try {
        // AccessToken보내면 service에서 사용자 정보 줌.
        const user = await authService.verifyAccessToken(accessToken);
        //
        req.user = user;
        next();
      } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: error.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
