import { prisma } from "../utils/prisma.util.js";

export class UsersRepository {
  findUserByEmail = async (email) => {
    const user = await prisma.User.findFirst({
      where: { email },
    });

    return user;
  };

  findUserById = async (id) => {
    const user = await prisma.User.findUnique({
      where: { id: +id },
    });

    return user;
  };

  createUser = async (email, hashedPassword, name) => {
    const signUpUser = await prisma.User.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return signUpUser;
  };
}
