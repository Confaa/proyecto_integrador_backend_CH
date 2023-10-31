export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUser(email) {
    return await this.dao.get(email);
  }

  async registerUser(user) {
    return await this.dao.register(user);
  }
}
