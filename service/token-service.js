import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usersConnection from "../database/ConnectDatabase.js";
dotenv.config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async saveToken(userId, refreshToken) {
    const [[tokenData]] = await usersConnection.query(
      `SELECT * FROM Tokens WHERE user_id = ${userId}`
    );
    // tokenModel.findOne({ user: userId });

    if (tokenData) {
      await usersConnection.query(
        `UPDATE Tokens SET refreshToken = "${refreshToken}" WHERE user_id = ${userId}`
      );
      const [token] = await usersConnection.query(
        `SELECT * FROM Tokens WHERE user_id = ${userId}`
      );
      return token;
    }
    await usersConnection.query(
      `INSERT INTO Tokens (user_id, refreshToken) VALUES (${userId}, "${refreshToken}")`
    );
    const token = await usersConnection.query(
      `SELECT * FROM Tokens WHERE user_id = ${userId}`
    );
    return token;
  }
  async removeToken(refreshToken) {
    // const tokenData = await tokenModel.findOneAndDelete({ refreshToken });
    const [[tokenData]] = await usersConnection.query(
      `SELECT * FROM Tokens WHERE refreshToken = "${refreshToken}"`
    );
    console.log(tokenData);

    await usersConnection.query(`
      DELETE FROM Tokens WHERE refreshToken = "${refreshToken}"
      `);
    return tokenData;
  }
  async findToken(refreshToken) {
    const [[tokenData]] = await usersConnection.query(
      `SELECT * FROM Tokens WHERE refreshToken = "${refreshToken}"`
    );
    // const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
