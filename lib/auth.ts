import { getServerSession } from "next-auth/next";
import { UserRole } from "@/prisma/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    passwordHash: undefined,
  };
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12);
}

export async function createUser({
  email,
  password,
  name,
  role = UserRole.USER,
}: {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}) {
  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      name,
      role,
    },
  });
}

export function isAdmin(user: { role: UserRole } | null) {
  return user?.role === UserRole.ADMIN;
}
