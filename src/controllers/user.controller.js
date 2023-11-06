import User from "../dao/mongo/classes/user.dao.js";
import { userModel } from "../dao/mongo/models/user.model.js";
import { compareHash } from "../util/cryptoUtil.js";
import jwt from "jsonwebtoken";
import { cartService, userService } from "../dao/repositories/index.js";

export const registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(200).send({
      status: "User created successfully",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error while creating user",
      payload: error,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.getUser(email);
    let user = {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      age: result.age,
    };
    if (!result) {
      throw new Error("Login failed");
    }

    if (!compareHash(password, result.password)) {
      throw new Error("Login failed");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .redirect("/products");
  } catch (error) {
    res.status(500).send({
      status: "Error while logging in user",
      payload: error,
    });
  }
};
