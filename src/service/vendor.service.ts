import { PrismaClient, ForUser } from '../generated/prisma';
const prisma = new PrismaClient();
import { UserType } from '../interface/user';

class UserService {
  constructor() {}

  async saveUser(user: UserType) {
    try {
      const saved = await prisma.user.create({ 
        data: { ...user } 
      });
      return saved;
    } catch (error) {
      console.error('An error occurred while saving user', error);
      return null;
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      console.error('An error occurred while finding user by email', error);
      return null;
    }
  }

  async findUserById(id: string) {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error('An error occurred while finding user by ID', error);
      return null;
    }
  }

  async findVendor() {
    try {
      return await prisma.user.findMany({
        where: { role: 'VENDOR' as ForUser },
      });
    } catch (error) {
      console.error('An error occurred while trying to find vendors', error);
      return null;
    }
  }

  async findVendorById(id: string) {
    try {
      return await prisma.user.findFirst({
        where: { id, role: 'VENDOR' as ForUser },
      });
    } catch (error) {
      console.error('An error occurred while finding vendor by ID', error);
      return null;
    }
  }

  async updateUser(id: string, update: Partial<UserType>) {
    try {
      return await prisma.user.update({
        where: { id },
        data: update,
      });
    } catch (error) {
      console.error('An error occurred while updating user', error);
      return null;
    }
  }

  async deleteUser(id: string) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      console.error('An error occurred while deleting user', error);
      return null;
    }
  }
}

export default UserService;
