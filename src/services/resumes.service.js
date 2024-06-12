import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }
  // 이력서 생성
  createResume = async (authorId, title, content) => {
    const createdResume = await this.resumesRepository.createResume(
      authorId,
      title,
      content,
    );

    return createdResume;
  };

  // 이력서 목록 조회
  getResumes = async (authorId, sort) => {
    const resumes = await this.resumesRepository.findResumesById(
      authorId,
      sort,
    );

    // 이쁘게 만들기
    return resumes.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  // 이력서 상세 조회
  getResumeById = async (id, authorId) => {
    const resume = await this.resumesRepository.findResumeById(id, authorId);

    if (!resume)
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);

    const data = {
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };

    return data;
  };

  // 이력서 수정
  updateResume = async (id, authorId, title, content) => {
    const existedResume = await this.resumesRepository.findResumeById(
      id,
      authorId,
    );

    if (!existedResume)
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);

    const updatedResume = await this.resumesRepository.updateResume(
      id,
      authorId,
      title,
      content,
    );

    return updatedResume;
  };
  // 이력서 삭제
  deleteResume = async (id, authorId) => {
    let existedResume = await this.resumesRepository.findResumeById(
      id,
      authorId,
    );

    if (!existedResume)
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);

    const deletedResume = await this.resumesRepository.deleteResume(
      id,
      authorId,
    );

    return deletedResume;
  };
}
