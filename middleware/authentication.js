const jwt = require("jsonwebtoken");

const { errorResponse, successResponse } = require("../utils/responseFormat");

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorisation;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(404)
      .send(
        errorResponse(
          [],
          "Something went wrong, please try again",
          "Access token is either invalid or not present"
        )
      );
  }

  const token = authHeader.split(" ")[1];

  try {
    const employee = jwt.verify(token, process.env.JWT_SECRET);
    req.mongoID = employee._id;
    req.role = employee.role;
    if (employee.role !== "Admin" || employee.role !== "Super Admin") {
      return res
        .status(403)
        .send(
          errorResponse(
            [],
            "You are not allowed access to this route, please login",
            "Access token could not be verified"
          )
        );
    }
    next();
  } catch (error) {
    return res
      .status(403)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, please try again",
          "Access token could not be verified"
        )
      );
  }
};

const authenticateEmployee = async (req, res, next) => {
  const authHeader = req.headers.authorisation;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(404)
      .send(
        errorResponse(
          [],
          "Something went wrong, please try again",
          "Access token is either invalid or not present"
        )
      );
  }

  const token = authHeader.split(" ")[1];

  try {
    const employee = jwt.verify(token, process.env.JWT_SECRET);
    req.mongoID = employee._id;
    req.role = employee.role;
    next();
  } catch (error) {
    return res
      .status(403)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, please try again",
          "Access token could not be verified"
        )
      );
  }
};

module.exports = { authenticateAdmin, authenticateEmployee };
