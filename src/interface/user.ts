import { ForUser } from "../generated/prisma";
export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role?: ForUser;
}