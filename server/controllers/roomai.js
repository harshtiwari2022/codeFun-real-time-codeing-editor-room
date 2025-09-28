import generateCodeReview from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ review: "❌ Code is required." });

  try {
    const review = await generateCodeReview(code);
    res.json({ review }); // Send object with 'review' key
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ review: "❌ Failed to get AI review." });
  }
};
