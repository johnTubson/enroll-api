
const User = require("../model/enrollDB");
const notifyAdmin = require("./notify-admin");

// Enroll User

async function enrollUser(req, res) {

  const userDetails = req.body;
  const saveUser = new User(userDetails);

  try {
    const newUser = await saveUser.save();
	// notifyAdmin(newUser);
	return await res.status(200).json(newUser);
    
  } catch (error) {
    return res.status(400).json({ error: err });
  }
}


// get all enrolled users

const allEnrolledUsers = async (req, res) => {
	try {
		const foundUsers = await User.find();
	    return await res.status(200).json(foundUsers);
	} catch (error) {
		return res.status(400).json({error: "Error retrieving users"});
	}
	
}
// delete all enrolled users

async function deleteAllEnrolledUsers(req, res) {
	try {
		const deleteMsg = await User.deleteMany();
        return await res.status(200).json(deleteMsg);
	} catch (error) {
		return res.status(400).json({error: "Error deleting users"})
	}
}


// get a particular user id

async function getUser(req, res) {
	try {
		const user = await User.findOne({_id: req.params.id});
	    if(user) {
	       return await res.status(200).json(user);
	    }
	    else {
	        return await res.status(400).json({error: "User doesn't exist"});
	    }
    } catch (error) {
	return res.status(400).json({error: "err retrieving user"});
	}
	
}

// update a particular user details

async function updateUserDetails(req, res) {
	try {
		const updateDetails = req.body
		const confirmedDetails = await User.findOneAndUpdate({_id: req.params.id}, updateDetails, {new: true});
		return await res.status(200).json(confirmedDetails)
	} catch (error) {
		return res.status(400).json({error: "Error updating user details"})
	}
}


// delete a particular user details
async function deleteUser(req, res) {
	try {
	await User.deleteOne({_id:req.params.id});
	return await res.status(200).json("User successfully deleted");
} catch (error) {
	return res.status(400).json("Error deleting user");
}
}

module.exports = {
	enrollUser,
	allEnrolledUsers,
	deleteAllEnrolledUsers,
	getUser,
	updateUserDetails,
	deleteUser,
};