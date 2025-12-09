const User = require("../models/user");


// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // Create new user
    const user = new User({
      name,
      email,
      password,
    });


    // Save user to database
    const savedUser = await user.save();


    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();


    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;


    const user = await User.findById(id);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};


// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

if (!name||!email||!password) {
      return res.status(404).json({
        success: false,
        message: "all fields",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password }
    );


    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
      } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};
  
// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;


    const deletedUser = await User.findByIdAndDelete(id);


    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

  //patch
  // Patch user by ID (partial update)
const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Single IF for validation
    if (
      (name && name.length < 3) ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      (password && password.length < 6)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: name must be 3+ chars, email valid, password 6+ chars",
      });
    }

    // Build update object only with provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User patched successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  patchUser,



};