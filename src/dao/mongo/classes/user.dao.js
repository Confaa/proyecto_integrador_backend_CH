import { userModel } from "../models/user.model.js";

class User {
  register = async (user) => {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  get = async (email) => {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default User;
