import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { ResumesService } from "../../../src/services/resumes.service.js";
// import { dummyUsers } from "../../dummies/users.dummy.js";
import { dummyResumes } from "../../dummies/resumes.dummy.js";
import { HTTP_STATUS } from "../../../src/constants/http-status.constant.js";
import { MESSAGES } from "../../../src/constants/message.constant.js";

// TODO: template 이라고 되어 있는 부분을 다 올바르게 수정한 후 사용해야 합니다.

const mockResumesRepository = {
  createResume: jest.fn(),
  findResumesById: jest.fn(),
  findResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const resumesService = new ResumesService(mockResumesRepository);

describe("ResumesService Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("createResume Method", async () => {
    // GIVEN
    const createResumeParams = {
      authorId: dummyResumes[0].authorId,
      title: dummyResumes[0].title,
      content: dummyResumes[0].content,
    };

    const mockReturn = {
      id: 5,
      authorId: dummyResumes[0].authorId,
      title: dummyResumes[0].title,
      content: dummyResumes[0].content,
      status: "APPLY",
      reatedAt: new Date(),
      updatedAt: new Date(),
      author: "TESTER",
    };
    mockResumesRepository.createResume.mockReturnValue(mockReturn);

    // WHEN
    const createdResumeData = await resumesService.createResume(
      createResumeParams.authorId,
      createResumeParams.title,
      createResumeParams.content,
    );
    // THEN
    expect(mockResumesRepository.createResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.createResume).toHaveBeenCalledWith(
      createResumeParams.authorId,
      createResumeParams.title,
      createResumeParams.content,
    );
    expect(createdResumeData).toEqual(mockReturn);
  });

  test("getResumes Method", async () => {
    // GIVEN
    const authorId = dummyResumes[1].authorId;
    const sort = "DESC";

    const mockReturn = dummyResumes.filter(
      (resume) => resume.authorId === authorId,
    );
    mockResumesRepository.findResumesById.mockReturnValue(mockReturn);

    const mapedResumes = mockReturn.map((resume) => ({
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    }));
    // WHEN
    const resumes = await resumesService.getResumes(authorId, sort);
    // THEN
    expect(mockResumesRepository.findResumesById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResumesById).toHaveBeenCalledWith(
      authorId,
      sort,
    );

    expect(resumes).toEqual(mapedResumes);
  });

  test("getResumeById Method", async () => {
    // GIVEN
    const id = dummyResumes[1].id;
    const authorId = dummyResumes[1].authorId;

    const mockReturn = dummyResumes[1];
    mockResumesRepository.findResumeById.mockReturnValue(mockReturn);

    const expectedResume = {
      id: mockReturn.id,
      authorName: mockReturn.author.name,
      title: mockReturn.title,
      content: mockReturn.content,
      status: mockReturn.status,
      createdAt: mockReturn.createdAt,
      updatedAt: mockReturn.updatedAt,
    };
    // WHEN
    const resume = await resumesService.getResumeById(id, authorId);
    // THEN
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledWith(
      id,
      authorId,
    );
    expect(resume).toEqual(expectedResume);
  });

  test("getResumeById Method - 이력서 없는 경우", async () => {
    // GIVEN
    const id = dummyResumes[0].id;
    const authorId = 123;
    mockResumesRepository.findResumeById.mockReturnValue(null);
    // WHEN // THEN
    try {
      await resumesService.getResumeById(id, authorId);
    } catch (error) {
      expect(mockResumesRepository.findResumeById).toBeCalledTimes(1);
      expect(mockResumesRepository.findResumeById).toBeCalledWith(id, authorId);
      expect(error.status).toEqual(HTTP_STATUS.NOT_FOUND);
      expect(error.message).toEqual(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }
  });

  test("updateResume Method", async () => {
    // GIVEN
    const id = dummyResumes[2].id;
    const authorId = dummyResumes[2].authorId;
    const updateParams = {
      title: "나약한 개발자 탄르파스",
      content:
        "살려주세요. 버그와 에러가 절 죽이려해요. 크아아아아악. 저는 튼튼함과 영리함을 제 자랑거리로 선보일 수 있습니다. 어떤 도전이든 두려워하지 않고, 견고한 코드와 해결책을 제시할 자신이 있습니다. 복잡한 문제에 직면했을 때에도 냉정하게 분석하고 빠르게 대응하는 능력을 갖췄습니다. 또한, 팀원들과의 원활한 커뮤니케이션을 통해 프로젝트의 성공을 이끌어내는데 기여할 것입니다. 최고의 결과물을 위해 끊임없이 노력하며, 스파르타코딩클럽에서도 이 같은 튼튼함을 발휘하여 뛰어난 성과를 이루고자 합니다.",
    };
    const ExistedResume = dummyResumes[2];
    const mockReturn = {
      id: id,
      authorId: authorId,
      title: updateParams.title,
      content: updateParams.content,
      status: "APPLY",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockResumesRepository.findResumeById.mockReturnValue(ExistedResume);
    mockResumesRepository.updateResume.mockReturnValue(mockReturn);

    // WHEN
    const updatedResume = await resumesService.updateResume(
      id,
      authorId,
      updateParams.title,
      updateParams.content,
    );

    // THEN
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledWith(
      id,
      authorId,
    );
    expect(mockResumesRepository.updateResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.updateResume).toHaveBeenCalledWith(
      id,
      authorId,
      updateParams.title,
      updateParams.content,
    );
    expect(updatedResume).toEqual(mockReturn);
  });

  test("deleteResume Method", async () => {
    // GIVEN
    const id = dummyResumes[2].id;
    const authorId = dummyResumes[2].authorId;

    const ExistedResume = dummyResumes[2];
    const mockReturn = dummyResumes[2].id;

    mockResumesRepository.findResumeById.mockReturnValue(ExistedResume);
    mockResumesRepository.deleteResume.mockReturnValue(mockReturn);

    // WHEN
    const deletedResume = await resumesService.deleteResume(id, authorId);

    // THEN
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResumeById).toHaveBeenCalledWith(
      id,
      authorId,
    );

    expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.deleteResume).toHaveBeenCalledWith(
      id,
      authorId,
    );

    expect(deletedResume).toEqual(mockReturn);
  });
});
