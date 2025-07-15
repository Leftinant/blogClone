const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// GET /api/posts?search=...&page=1&limit=5
router.get("/", async (req, res) => {
  const { search = "", page = 1, limit = 5 } = req.query;
  const query = {
    title: { $regex: search, $options: "i" },
  };
  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ total, posts });
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("category");
  res.json(post);
});

router.post(
  "/",
  auth,
  upload.single("image"),
  body("title").notEmpty(),
  body("content").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const newPost = new Post({
      ...req.body,
      image: req.file ? "/uploads/" + req.file.filename : null,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  }
);

router.put("/:id", auth, upload.single("image"), async (req, res) => {
  const updatedData = req.body;
  if (req.file) updatedData.image = "/uploads/" + req.file.filename;

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  res.json(updatedPost);
});

router.delete("/:id", auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
