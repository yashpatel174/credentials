import * as response from "../static/validation.js";
import JWT from "jsonwebtoken";
import { registration } from "../model/credentialModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : req.session.token;
    console.log(token, "backend middleware");
    if (!token) return response.noToken(res);

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
