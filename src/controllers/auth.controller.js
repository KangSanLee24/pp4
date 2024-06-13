import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 회원가입 API controller
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const signUpUser = await this.authService.signUp(email, password, name);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        signUpUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인 API /api/auth/sign-in
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const accessToken = await this.authService.signIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
