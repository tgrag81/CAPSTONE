const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.put("/update-profile", async (req, res) => {
    try {
        const { userId, username, email, bio } = req.body;

        if (!userId || !username || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, bio },
            { new: true } 
        );

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
