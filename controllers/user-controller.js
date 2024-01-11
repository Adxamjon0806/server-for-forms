class UserController {
  async registration(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async login(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async activate(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      res.json(["1234567890", "0987654321"]);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
