import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Category from "./models/CategoriesModel.js";
import Course from "./models/CoursesModel.js";
import Provider from "./models/ProvidersModel.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/Edu-Flow").then(() => {
  console.log("Connect to database successfully!");
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({ message: "Success", data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/courses-feature", async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true, feature: true })
      .populate({
        path: "category_id",
        select: "cate_name",
      })
      .populate({
        path: "provider_id",
        select: "provider_name",
      })
      .sort({ createdAt: -1 });

    const result = courses.map((c) => ({
      _id: c._id,
      category: c.category_id?.cate_name,
      provider: c.provider_id?.provider_name,
      course_title: c.course_title,
      image_url: c.image_url,
      price: c.price,
      price_promotion: c.price_promotion,
      students: c.students,
      feature: c.feature,
    }));

    return res.status(200).json({
      message: "Lấy danh sách khóa học nổi bật thành công!",
      total: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/providers", async (req, res) => {
  try {
    const providers = await Provider.find();
    return res.json({ message: "success", data: providers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
