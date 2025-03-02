const express = require("express");
const Post = require("../model/Post");
const HealthProfile = require("../model/healthProfile");

const router = express.Router();

// ✅ Create a new post (Automatically fetch trimester from HealthProfile)
router.post("/", async (req, res) => {
    try {
        const { userId, content } = req.body;

        // Fetch trimester from HealthProfile
        const healthProfile = await HealthProfile.findOne({ userId });
        if (!healthProfile) {
            return res.status(400).json({ message: "Health Profile not found! Please complete it first." });
        }

        const post = new Post({ userId, trimester: healthProfile.trimester, content });
        await post.save();
        res.status(201).json({ message: "Post created successfully!", post });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get all posts (With user details)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "name email") // Fetch user's name and email
            .populate("replies.userId", "name email");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get posts by trimester (Auto-fetched from HealthProfile)
router.get("/trimester/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user's trimester
        const healthProfile = await HealthProfile.findOne({ userId });
        if (!healthProfile) return res.status(400).json({ message: "Health Profile not found!" });

        const posts = await Post.find({ trimester: healthProfile.trimester }).populate("userId", "name");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Reply to a post
router.post("/:postId/reply", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, content } = req.body;

        console.log(userId);
        console.log(postId);

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.replies.push({ userId, content });
        await post.save();

        res.status(201).json({ message: "Reply added!", post });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Delete my own post
router.delete("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findOne({ _id: postId, userId });
        if (!post) return res.status(403).json({ message: "Unauthorized or Post not found" });

        await Post.findByIdAndDelete(postId);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
