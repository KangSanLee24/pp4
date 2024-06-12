import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MESSAGES } from "../constants/message.constant.js";
import { ACCESS_TOKEN_SECRET } from "../constants/env.constant.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from "../constants/auth.constant.js";
import { HttpError } from "../errors/http.error.js";

export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  signUp = async (email, password, name) => {
    // 이메일이 중복됬는지 체크
    const existedUser = await this.usersRepository.findUserByEmail(email);
    if (existedUser)
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);

    // 비밀번호 뭉게기
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    // 저장소에게 사용자 저장을 요청
    const signUpUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
    );

    // 저장된 사용자 정보를 수정해서 리턴
    signUpUser.password = undefined;

    return signUpUser;
  };

  signIn = async (email, password) => {
    // 이메일과 비밀번호로 맞나 체크
    const user = await this.usersRepository.findUserByEmail(email);

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched)
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);

    // 그 사용자 id를 payload로 해서 accesstoken 발급
    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return accessToken;
  };

  // Accesstoken받고 payload로 user정보 받음.
  verifyAccessToken = async (accessToken) => {
    try {
      // token받고 payload로 사용자 체크
      const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      const user = await this.usersRepository.findUserById(payload.id);

      if (!user) {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_USER);
      }

      return user;
    } catch (error) {
      // AccessToken의 유효기한이 지난 경우
      if (error.name === "TokenExpiredError") {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.EXPIRED);
      } else {
        // 그 밖의 AccessToken 검증에 실패한 경우
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.INVALID);
      }
    }
  };
}
