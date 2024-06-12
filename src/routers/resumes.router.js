import express from "express";
import { createResumeValidator } from "../middlewares/validators/create-resume-validator.middleware.js";
import { updateResumeValidator } from "../middlewares/validators/updated-resume-validator.middleware.js";
import { ResumesController } from "../controllers/resumes.controller.js";

const resumesRouter = express.Router();
const resumesController = new ResumesController();

// 이력서 생성
resumesRouter.post("/", createResumeValidator, resumesController.createResume);

// 이력서 목록 조회
resumesRouter.get("/", resumesController.getResumes);

// 이력서 상세 조회
resumesRouter.get("/:id", resumesController.getResumeById);

// 이력서 수정
resumesRouter.put(
  "/:id",
  updateResumeValidator,
  resumesController.updateResume,
);

// 이력서 삭제
resumesRouter.delete("/:id", resumesController.deleteResume);

export { resumesRouter };
