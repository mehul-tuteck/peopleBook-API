const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const Employee = require("../models/Employee");
const { successResponse, errorResponse } = require("../utils/responseFormat");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  email = email.toLowerCase();

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .send(
        errorResponse(
          [],
          "The email ID you have entered is invalid",
          "Invalid email ID entered"
        )
      );
  }

  try {
    const employee = await Employee.findOne({
      where: { email },
    });

    if (!employee) {
      return res
        .status(404)
        .send(
          errorResponse(
            [],
            "The Email-ID you have entered is incorrect",
            "User with this email ID does not exist"
          )
        );
    }

    if (!bcrypt.compareSync(employee.password, password)) {
      return res
        .status(403)
        .send(
          errorResponse(
            [],
            "The password you have entered is incorrect",
            "Passwords dont match"
          )
        );
    }

    const { _id } = employee;
    const accessToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    return res
      .status(200)
      .send(
        successResponse(
          { employee, accessToken },
          "You've logged in successfully",
          "User logged in successfully, find the employee details in the employee field of the data in response and the token in the token field"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          data,
          "Something went wrong while logging in",
          "Please check data field"
        )
      );
  }
};

const sendOTP = async (req, res, next) => {
  const { email } = req.body;
};

const verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
};

const changePassword = async (req, res, next) => {
  const { newPassword } = req.body;
};

module.exports = { login };
