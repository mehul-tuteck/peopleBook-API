const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authentication");

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeByDepartment,
  getEmployeeBySearchTerm,
  getEmployeeByRole,
} = require("../controllers/employeeController");

router.route("/view/all").get(getAllEmployees);
router.route("view/:id").get(getEmployeeById);
router.route("/search/:term").get(getEmployeeBySearchTerm);
router.route("search/department/:department").get(getEmployeeByDepartment);
router.route("search/role/:role").get(getEmployeeByRole);
router.route("/create").post(createEmployee);
router.route("edit/:id").patch(editEmployee);
router.route("/delete/:id").delete(deleteEmployee);

module.exports = router;
