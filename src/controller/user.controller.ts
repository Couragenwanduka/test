import { Request, Response, NextFunction } from 'express';
import BadRequest from '../error/error';
import UserService from '../service/vendor.service';
import { UserType } from '../interface/user';
import jwtToken from '../utils/jwtToken';
import hashPassword from '../utils/bcrypt';
import { ForUser } from '../generated/prisma';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, password, address, phoneNumber, role } = req.body;

      const existingEmail = await this.userService.findUserByEmail(email);
      if (existingEmail) throw new BadRequest("User already exists");

      const hashedPassword = await hashPassword(password)

      const saveUser = await this.userService.saveUser({
        firstName,
        lastName,
        email,
        password: hashedPassword!,
        address,
        phoneNumber,
        role,
      });

      if (!saveUser) {
        throw new BadRequest("Failed to save user");
      }
      const { password: _password, ...userWitoutPassword } = saveUser;
      const token = jwtToken.generateToken(userWitoutPassword);

      res.status(201).json({ message: "User successfully created", user: userWitoutPassword, token });
    } catch (error) {
      next(error);
    }
  }

  async getAllVendors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendors = await this.userService.findVendor();
      res.status(200).json({ message: "Successful", vendors });
    } catch (error) {
      next(error);
    }
  }

  async getVendorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const vendor = await this.userService.findVendorById(id);

      if (!vendor) throw new BadRequest("Vendor not found");

      res.status(200).json({ message: "Successful", vendor });
    } catch (error) {
      next(error);
    }
  }



async updateVendor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, address, phoneNumber, role } = req.body;

    const existingUser = await this.userService.findUserById(id);
    if (!existingUser) throw new BadRequest("User not found");

    const update: Partial<UserType> = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    if (role && Object.values(ForUser).includes(role as ForUser)) {
      update.role = role as ForUser;
    }

    const updated = await this.userService.updateUser(id, update);
    res.status(200).json({ message: "Updated successfully", user: updated });
  } catch (error) {
    next(error);
  }
}


  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.userService.deleteUser(id);
      if (!deleted) throw new BadRequest("Delete operation failed");

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
