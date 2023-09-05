import { messageModel } from "../../models/message.model.js";

class MessageDBService {
  async sendMessage(user, message) {
    try {
      let response = await messageModel.create({
        user: user,
        message: message,
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getMessages() {
    try {
      let response = await messageModel.find();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default MessageDBService;
