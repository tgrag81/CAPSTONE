// Create a new post
router.post("/", async (req, res) => {
    const { userId, content, media } = req.body;

    try {
        const post = new Post({ userId, content, media });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "username avatar") // Populate user data
            .sort({ createdAt: -1 }); // Sort by newest first
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like or Unlike a post
router.put("/:id/like", async (req, res) => {
    const { userId } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.includes(userId)) {
            // Unlike if already liked
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            // Like the post
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a comment to a post
router.put("/:id/comment", async (req, res) => {
    const { userId, text } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        const comment = {
            userId,
            text,
            createdAt: new Date(),
        };

        post.comments.push(comment);
        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

