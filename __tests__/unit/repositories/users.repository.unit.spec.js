import { beforeEach, describe, jest, test, expect } from "@jest/globals";
import { UsersRepository } from "../../../src/repositories/users.repository.js";
import { dummyUsers } from "../../dummies/users.dummy.js";

// TODO: template 이라고 되어 있는 부분을 다 올바르게 수정한 후 사용해야 합니다.

const mockPrisma = {
  User: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const usersRepository = new UsersRepository(mockPrisma);

describe("Users Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다
  });

  test("findUserByEmail Method", async () => {
    // email을 받고,
    // prisma.User.findFirst(where: email)로 실행한다. 1번만 실행한다.
    // 그 값을 return한다. 객체 형태이다.
    // GIVEN
    const email = "spartan@spartacodingclub.kr"; // id : 1
    const expectedUser = dummyUsers[1];
    mockPrisma.User.findFirst.mockReturnValue(expectedUser);

    // WHEN usersRepository의 findUserByEmail Method를 호출
    const user = await usersRepository.findUserByEmail(email);
    // THEN
    // findFirst는 1번만 호출, 이메일 사용함?
    expect(usersRepository.prisma.User.findFirst).toHaveBeenCalledTimes(1);
    expect(usersRepository.prisma.User.findFirst).toHaveBeenCalledWith({
      where: { email },
    });
    // mockPrisma의 Return과 출력된 findFirst Method의 값이 일치
    // toBe는 숫자, 문자열, 불리안, 같은 객체 인스턴스 / toEqual은 객체나 배열의 깊은 비교
    expect(user).toEqual(expectedUser);
  });

  test("findUserById Method", async () => {
    // GIVEN
    const userId = dummyUsers.id;
    const mockReturn = dummyUsers[1];
    mockPrisma.User.findUnique.mockReturnValue(mockReturn);

    // WHEN usersRepository의 findUserById Method를 호출
    const user = await usersRepository.findUserById(userId);
    // THEN
    // findUnique 1번만 호출
    expect(usersRepository.prisma.User.findUnique).toHaveBeenCalledTimes(1);
    expect(usersRepository.prisma.User.findUnique).toHaveBeenCalledWith({
      where: { id: +userId },
    });
    // mockPrisma의 Return과 출력된 findUnique Method의 값이 일치
    expect(user).toEqual(mockReturn);
  });

  test("createUser Method", async () => {
    // GIVEN
    const createUserParams = {
      email: dummyUsers[0].email,
      password: dummyUsers[0].password,
      name: dummyUsers[0].name,
    };

    const mockReturn = {
      id: 4,
      email: dummyUsers[0].email,
      password: dummyUsers[0].password,
      name: dummyUsers[0].name,
      role: "APPLICANT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockPrisma.User.create.mockReturnValue(mockReturn);

    // WHEN usersRepository의 createUser Method를 호출
    const createUserData = await usersRepository.createUser(
      createUserParams.email,
      createUserParams.password,
      createUserParams.name,
    );

    // THEN
    expect(mockPrisma.User.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.User.create).toHaveBeenCalledWith({
      data: createUserParams,
    });
    expect(createUserData).toEqual(mockReturn);
  });
});
