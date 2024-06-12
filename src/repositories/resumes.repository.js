import { prisma } from "../utils/prisma.util.js";

export class ResumesRepository {
  // 이력서 생성
  createResume = async (authorId, title, content) => {
    const createdResume = prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });

    return createdResume;
  };

  //authorId와 sort받고 이력서들 가져오기
  findResumesById = async (authorId, sort) => {
    const resumes = await prisma.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    return resumes;
  };

  // id와 authorId받고 이력서 하나 가져오기
  findResumeById = async (id, authorId) => {
    const resume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
      include: { author: true },
    });

    return resume;
  };

  // 이력서 수정
  updateResume = async (id, authorId, title, content) => {
    const updatedResume = await prisma.resume.update({
      where: { id: +id, authorId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return updatedResume;
  };

  // 이력서 삭제
  deleteResume = async (id, authorId) => {
    const deletedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    return deletedResume;
  };
}
