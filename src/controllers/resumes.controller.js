import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  // 이력서 생성
  createResume = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const data = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 목록 조회
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      let { sort } = req.query;

      sort = sort?.toLowerCase();

      if (sort !== "desc" && sort !== "asc") {
        sort = "desc";
      }

      const resumes = await this.resumesService.getResumes(authorId, sort);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 상세 조회
  getResumeById = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const resume = await this.resumesService.getResumeById(id, authorId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        resume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 수정
  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const { title, content } = req.body;

      const updatedResume = await this.resumesService.updateResume(
        id,
        authorId,
        title,
        content,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        updatedResume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const deletedResume = await this.resumesService.deleteResume(
        id,
        authorId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        deletedResume: { id: deletedResume.id },
      });
    } catch (error) {
      next(error);
    }
  };
}
