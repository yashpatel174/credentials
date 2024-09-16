import { registration } from "../model/credentialModel.js";
import * as response from "../static/validation.js";
import requiredFields from "../static/validation.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    requiredFields(res, { email }, { password });

    const existingUser = await registration.findOne({ email });
    if (existingUser) return response.exist(res);

    const newUser = new registration({ email, password });
    await newUser.save();

    response.success(res, "User registered successfully", { email: newUser.email, password: newUser.password });
  } catch (error) {
    if (error.code === 11000) {
      return response.error(error, "Duplocate key.");
    }
    response.error(res, error, "Error while reigstering user.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    requiredFields(res, { email }, { password });

    const user = await registration.findOne({ email });
    if (!user) return response.notExist(res);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return response.inValid(res);

    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });
    req.session.token = token;
    req.session.save((error) => {
      if (error) {
        return response.error(res, error, "Token is not stored in the session storage.");
      }
      res.json({ token: token });
    });

    // response.success(res, "User logged in successfully!", { email: user.email, password: user.password });
  } catch (error) {
    response.error(res, error, "Error while logging in.");
  }
};

const dashboard = async (req, res) => {
  try {
    const user = await registration.find();
    response.success(res, "Welcome to the dashboard!", { user: user.email });
  } catch (error) {
    response.error(res, error, "Try again.");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return response.noLogOut(res);
    res.clearCookie("connect.sid");
    response.success(res, "Logged out successfully!");
  });
};

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    requiredFields(res, { email });

    const user = await registration.findOne({ email });
    if (!user) return response.notExist(res);

    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "5m" });
    const resetLink = `${process.env.SYSTEM_IP}/user/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Click on the following link to reset your password: ${resetLink}`,
    });
    response.success(res, "Link has been sent successfully!");
  } catch (error) {
    response.error(res, error, "Error while sending mail.");
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.header("Token");
    const { newPassword, confirmPassword } = req.body;
    requiredFields(res, { token }, { newPassword }, { confirmPassword });

    const decoded = await promisify(JWT.verify)(token, process.env.SECRET_KEY);
    const user = await registration.findById(decoded._id);
    if (!user) return response.notExist();

    if (newPassword !== confirmPassword) return response.notMatch(res);
    user.password = await newPassword;

    await user.save();
  } catch (error) {
    response.error(res, error, "Invalid or expired token.");
  }
};

export { register, login, dashboard, logout, requestPasswordReset, resetPassword };
