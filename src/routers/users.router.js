import express from "express";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = express.Router();
// 이놈은 controller계층에서 끝나서 authService나 그런거 입력 안받아도됨
const usersController = new UsersController();

// requireAccessToken에 의존성 주입
// UsersRepository 인스턴스 생성
const usersRepository = new UsersRepository(prisma);
// AuthService 인스턴스 생성
const authService = new AuthService(usersRepository);

usersRouter.get(
  "/me",
  requireAccessToken(authService),
  usersController.getUserInfo,
);

export { usersRouter };
