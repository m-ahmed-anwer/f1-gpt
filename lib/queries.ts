// import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return { ...rest };
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}
