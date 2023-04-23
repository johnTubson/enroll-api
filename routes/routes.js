const express = require("express");
const router = express.Router();

const {
	enrollUser,
	allEnrolledUsers,
	deleteAllEnrolledUsers,
	getUser,
	updateUserDetails,
	deleteUser,
} = require("../controllers/user-control");
 




router.route("/users")
.get(allEnrolledUsers)
.post(enrollUser)
.delete(deleteAllEnrolledUsers);




router.route("/users/:id")
.get(getUser)
.patch(updateUserDetails)
.delete(deleteUser);


module.exports = router;