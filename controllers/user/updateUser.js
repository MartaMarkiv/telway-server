const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    console.log("Update profile");
    const userId = req.user.id;
    const { firstName, lastName, oldPassword, newPassword, emailNotification, smsNotification } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = {
      emailNotification,
      smsNotification
    };

    // update name
    if (firstName || lastName) {
      updateData.name = [firstName, lastName].filter(Boolean).join(" ");
    }

    // change password
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required",
        });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.updateUser(userId, updateData);

    const { name, email } = updatedUser;

    return res.status(200).json({
      success: true,
      user: {
        name,
        email,
      },
    });

  } catch (error) {
    console.error("Error while updating user's details:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};