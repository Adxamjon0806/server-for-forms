import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import usersConnection from "../database/ConnectDatabase.js";

class UserService {
  async registration(email, password) {
    const [[candidate]] = await usersConnection.query(
      `SELECT * FROM Users WHERE email IN ("${email}")`
    );

    // SELECT * FROM users WHERE email IN ("adxamjon0806@gmail.com");
    if (candidate) {
      throw ApiError.BadRequest("This email is using");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    // const activationLink = v4();
    await usersConnection.query(
      `INSERT INTO Users (email, password, role, status)
    VALUES
    ("${email}", "${hashPassword}","user", "active");
      `
    );
    const [user] = await usersConnection.query(
      `SELECT * FROM Users WHERE email = "${email}"`
    );
    const userDto = new UserDto(user[0]);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const [[user]] = await usersConnection.query(
      `SELECT * FROM Users WHERE email IN ("${email}")`
    );
    if (!user) {
      throw ApiError.BadRequest("User with this email not found");
    }
    const isPathEquals = await bcrypt.compare(password, user.password);
    if (!isPathEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const [[user]] = await usersConnection.query(`
      SELECT * FROM Users WHERE id = ${userData.id}
      `);
    //  await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await usersConnection.query(`
      SELECT * FROM Users
      `);
    //  await UserModel.find();
    return users;
  }
}

export default new UserService();
