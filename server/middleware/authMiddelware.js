import * as response from "../static/validation.js";
import JWT from "jsonwebtoken";
import { registration } from "../model/credentialModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : req.session.token;
    if (!token) return response.custom(res, { message: "Token not provided or invalid token!" });

    const decode = JWT.verify(token, process.env.SECRET_KEY);

    const user = await registration.findById(decode._id);
    if (!user) return response.notExist(res);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    response.error(res, error, "Error while verifying user.");
  }
};
