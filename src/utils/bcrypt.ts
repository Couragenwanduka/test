import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string | undefined> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.error("An error occurred while hashing password", error);
  }
};

export default hashPassword;
