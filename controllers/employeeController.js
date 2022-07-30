const validator = require("validator");

const Employee = require("../models/Employee");
const { successResponse, errorResponse } = require("../utils/responseFormat");

const getAllEmployees = async (req, res, next) => {
  try {
    const employeeList = await Employee.find();
    const promises = employeeList.map(async (current) => {
      return {
        ID: current._id,
        "Employee ID": current.employeeID,
        Name: current.name,
        "Email-ID": current.email,
        "Phone Number": current.phoneNumber,
        Department: current.department,
        Role: current.role,
      };
    });

    const response = await Promise.all(promises);
    return res
      .status(200)
      .send(
        successResponse(
          response,
          "Successfully fetched employee details",
          "Successfully fetched employee details"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

const getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const current = await Employee.findById(id);
    if (!current) {
      return res
        .status(404)
        .send(
          errorResponse(
            [],
            "Employee requested doesnt exist",
            "The ID entered does not match with any _id field in the database"
          )
        );
    }

    return res.status(200).send(
      successResponse(
        {
          ID: current._id,
          "Employee ID": current.employeeID,
          Name: current.name,
          "Email-ID": current.email,
          "Phone Number": current.phoneNumber,
          Department: current.department,
          Role: current.role,
        },
        "Fetched requested employee details",
        "Fetched requested employee details"
      )
    );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

const getEmployeesBySearchTerm = async (req, res, next) => {
  const { term } = req.params;

  try {
    const employeeList = await Employee.find({
      $or: [{ name: `/${term}/` }, { employeeID: `/${term}/` }],
    });

    if (employeeList.length === 0) {
      return res
        .status(200)
        .send(
          successResponse(
            [],
            "Did not find anything matching the search term",
            "Did not find anything matching the search term"
          )
        );
    }

    const promises = employeeList.map(async (current) => {
      return {
        ID: current._id,
        "Employee ID": current.employeeID,
        Name: current.name,
        "Email-ID": current.email,
        "Phone Number": current.phoneNumber,
        Department: current.department,
        Role: current.role,
      };
    });

    const response = await Promise.all(promises);

    return res
      .status(200)
      .send(
        successResponse(
          response,
          "Found requested employee details",
          "Found requested employee details"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

const getEmployeesByDepartment = async (req, res, next) => {
  const { department } = req.params;
  try {
    const employeeList = await Employee.find({ department });
    if (employeeList.length === 0) {
      return res
        .status(200)
        .send(
          successResponse(
            [],
            "There are no employees in this department",
            "There are no employees in this department"
          )
        );
    }

    const promises = employeeList.map(async (current) => {
      return {
        ID: current._id,
        "Employee ID": current.employeeID,
        Name: current.name,
        "Email-ID": current.email,
        "Phone Number": current.phoneNumber,
        Department: current.department,
        Role: current.role,
      };
    });

    const response = await Promise.all(promises);

    return res
      .status(200)
      .send(
        successResponse(
          response,
          "Found all employees in requested department",
          "Found all employees in requested department"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again!",
          "Please check data field for the error"
        )
      );
  }
};

const getEmployeesByRole = async (req, res, next) => {
  const { role } = req.params;

  try {
    const employeeList = await Employee.find({ role });
    if (employeeList.length === 0) {
      return res
        .status(200)
        .send(
          successResponse(
            [],
            "There are no employees in this department",
            "There are no employees in this department"
          )
        );
    }

    const promises = employeeList.map(async (current) => {
      return {
        ID: current._id,
        "Employee ID": current.employeeID,
        Name: current.name,
        "Email-ID": current.email,
        "Phone Number": current.phoneNumber,
        Department: current.department,
        Role: current.role,
      };
    });

    const response = await Promise.all(promises);

    return res
      .status(200)
      .send(
        successResponse(
          response,
          "Found all employees by requested role",
          "Found all employees by requested role"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again!",
          "Please check data field for the error"
        )
      );
  }
};

const createEmployee = async (req, res, next) => {
  let { name, email, phoneNumber, role, department, employeeID } = req.body;
  email = email.toLowerCase();

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .send(
        errorResponse(
          [],
          "The email ID you have entered is invalid",
          "Invalid email ID has been entered"
        )
      );
  }

  try {
    const current = await Employee.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (current) {
      return res
        .status(400)
        .send(
          errorResponse(
            current,
            "An employee with this email or phone number already exists",
            "Check data field to see which employee already exists"
          )
        );
    }

    const newEmployee = await Employee.create({
      name,
      email,
      password: email,
      role,
      department,
      employeeID,
      phoneNumber,
    });

    return res
      .status(201)
      .send(
        successResponse(
          newEmployee,
          "New Employee successfully entered into database",
          "Employee created successfully, find the details in the data field"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

const editEmployee = async (req, res, next) => {
  const { id } = req.params;
  let { name, email, phoneNumber, employeeID, department, role } = req.body;
  email = email.toLowerCase();

  try {
    const current = await Employee.findById(id);
    if (!current) {
      return res
        .status(404)
        .send(
          errorResponse(
            [],
            "Requested Employee not found",
            "The ID entered does not match with any _id field in the database"
          )
        );
    }

    const updated = await Employee.findByIdAndUpdate(
      { id },
      {
        name,
        email,
        phoneNumber,
        employeeID,
        department,
        role,
      }
    );

    return res
      .status(200)
      .send(
        successResponse(
          updated,
          "Updated details of employee successfully",
          "Updated details of employee successfully"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    const current = await Employee.findById(id);
    if (!current) {
      return res
        .status(404)
        .send(
          errorResponse(
            [],
            "Requested Employee not found",
            "The ID entered does not match with any _id field in the database"
          )
        );
    }

    const deleted = await Employee.findByIdAndDelete({ id });
    return res
      .status(200)
      .send(
        successResponse(
          deleted,
          "Deleted details of employee successfully",
          "Deleted details of employee successfully"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .send(
        errorResponse(
          error.message,
          "Something went wrong, Please try again",
          "Please check data field for the error"
        )
      );
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeesBySearchTerm,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployeesByRole,
};
