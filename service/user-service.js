import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import uuid from "uuid";
import mailService from "./mail-service";

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error("This email is using");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);
  }
}

export default new UserService();
