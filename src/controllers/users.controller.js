import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class UsersController {
  // 내 정보 조회 API
  getUserInfo = async (req, res, next) => {
    try {
      const data = req.user;
      // 인증도 다 됬고, 인증 미들웨어를 통해 내 정보는 이미 req.user에 있어.
      // 그럼 그냥 정보 보여주고 컨트롤러 계층에서 끝내면안되나?
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
