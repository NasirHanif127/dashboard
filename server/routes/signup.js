import express from 'express';
const router = express.Router();
import User from "../schema/user.js";
import { create } from "../services/token.js";

router.post('/', async function(request, response) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      return response.status(409).json({
        message: "User already exists!"
      });
    }

    const newData = new User(request.body);
    const data = await newData.save();

    response.status(200).json({
      message: "Success",
      token: create({
        name: data.fullname,
        email: data.email,
        mobile: data.mobile,
        userId: data._id
      })
    });
  } catch (err) {
    response.status(500).json({
      message: "Server error occurred!"
    });
  }
});

export default router;
