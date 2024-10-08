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
    if (existingUser) return response.custom(res, { message: "This email is already registered!" });

    const newUser = new registration({ email, password });
    await newUser.save();

    response.success(res, {
      message: "User registered successfully!",
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    if (error.code === 11000) {
      return response.error(res, error, { message: "Duplicate key." });
    }
    response.error(res, error, { message: "Error while reigstering user." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    requiredFields(res, { email }, { password });

    const user = await registration.findOne({ email });
    if (!user) return response.custom(res, { message: "User not registered by this email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return response.custom(res, { message: "Invalid Password." });

    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });
    req.session.token = token;
    req.session.save((error) => {
      if (error) {
        return response.error(res, error, { message: "Token is not stored in the session storage." });
      }
      res.json({ message: "User logged in successfully!", token: token });
    });
  } catch (error) {
    response.error(res, error, { message: "Error while logging in." });
  }
};

const dashboard = async (req, res) => {
  try {
    const user = await req.user;
    response.success(res, { message: "Welcome to the dashboard!" }, user.email);
  } catch (error) {
    response.error(res, error, { message: "Error while fetching data, try again!" });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return response.custom(res, { message: "Error while logging out!" });
    res.clearCookie("connect.sid");
    response.success(res, { message: "Logged out successfully!" });
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
    if (!user) return response.custom(res, { message: "This email is not registered!" });

    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "2m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await registration.findOneAndUpdate(
      { email },
      {
        $set: {
          resetToken: token,
          resetTokenExpiration: Date.now() + 2 * 60 * 1000,
        },
      }
    );

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Click on the following link to reset your password: ${resetLink}`,
    });
    response.success(res, { message: "Link has been sent successfully!", token: token });
  } catch (error) {
    response.error(res, error, { message: "Error while sending mail." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword, confirmPassword } = req.body;
    requiredFields(res, { token }, { newPassword }, { confirmPassword });

    const decoded = await promisify(JWT.verify)(token, process.env.SECRET_KEY);
    if (!decoded) return response.custom(res, { message: "Inalid token or token not found." });

    const user = await registration.findById(decoded._id);
    if (!user) return response.custom(res, { message: "This email is not registered!" });

    if (newPassword !== confirmPassword) return response.custom({ res, message: "Password does not match" });
    user.password = newPassword;

    await user.save();
    response.success(res, { message: "Password has been reset successfully." });
  } catch (error) {
    response.error(res, error, { message: "Invalid or expired token." });
  }
};

export { register, login, dashboard, logout, requestPasswordReset, resetPassword };
