const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      max: [127, "Max Length is 127 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email ID"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 40,
    },
    employeeID: {
      type: String,
      required: [true, "Please enter the employee ID"],
    },
    department: {
      type: String,
      required: [true, "Please enter the department"],
      enum: [
        "Technology Consulting",
        "Product Development",
        "Administration",
        "Corporate",
        "HR",
        "Quality Assurance",
        "Technology Advisory",
        "SEN Advisory",
      ],
    },
    role: {
      type: String,
      required: [true, "Please enter the role"],
      enum: ["Super Admin", "Admin", "Employee"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
