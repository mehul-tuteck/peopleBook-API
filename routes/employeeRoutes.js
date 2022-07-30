const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authentication");

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployeesBySearchTerm,
  getEmployeesByRole,
} = require("../controllers/employeeController");

router.route("/view/all").get(getAllEmployees);
router.route("view/:id").get(getEmployeeById);
router.route("/search/:term").get(getEmployeesBySearchTerm);
router.route("search/department/:department").get(getEmployeesByDepartment);
router.route("search/role/:role").get(getEmployeesByRole);
router.route("/create").post(createEmployee);
router.route("edit/:id").patch(editEmployee);
router.route("/delete/:id").delete(deleteEmployee);

module.exports = router;
