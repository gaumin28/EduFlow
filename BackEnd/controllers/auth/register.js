import bcrypt from "bcrypt";
import UserModel from "../../models/user.js";

export const register = async (req, res) => {
  try {
    const { email, username, fullName, password, confirmPassword } = req.body;

    const normalizedUsername = (username || fullName || "").trim();

    // ✅ Validate dữ liệu
    if (!email || !normalizedUsername || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // If confirmPassword is provided, enforce match; otherwise rely on frontend validation.
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        message: "Mật khẩu xác nhận không khớp",
      });
    }

    // ✅ Check email tồn tại
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Tạo user theo model
    const newUser = await UserModel.create({
      email,
      username: normalizedUsername,
      password: hashedPassword,
      role: "customer",
      flag: false,
    });

    return res.status(201).json({
      message: "Đăng ký tài khoản thành công!",
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi đăng ký tài khoản!",
      error: error.message,
    });
  }
};
