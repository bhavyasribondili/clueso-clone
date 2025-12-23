// In-memory feedback storage
const feedbackStore = [];

export const addFeedback = (req, res) => {
  const { productId } = req.params;
  const { user = "Demo User", comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({ message: "Feedback comment is required" });
  }

  const newFeedback = {
    id: Date.now().toString(),
    productId,
    user,
    comment,
    createdAt: new Date().toISOString(),
  };

  feedbackStore.push(newFeedback);
  res.status(201).json(newFeedback);
};

export const getFeedbacks = (req, res) => {
  const { productId } = req.params;

  const productFeedbacks = feedbackStore.filter(
    (f) => f.productId === productId
  );

  res.status(200).json(productFeedbacks);
};
