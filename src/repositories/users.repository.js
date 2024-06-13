export class UsersRepository {
  constructor(prisma) {
    //생성자(Constructor)에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
    this.prisma = prisma;
  }
  findUserByEmail = async (email) => {
    const user = await this.prisma.User.findFirst({
      where: { email },
    });

    return user;
  };

  findUserById = async (id) => {
    const user = await this.prisma.User.findUnique({
      where: { id: +id },
    });

    return user;
  };

  createUser = async (email, hashedPassword, name) => {
    const signUpUser = await this.prisma.User.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return signUpUser;
  };
}
