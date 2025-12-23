import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecretkey";

export const signup = async (req, res) => {
  const { email } = req.body;
  res.status(201).json({ message: "Signup ok", email });
};

export const login = async (req, res) => {
  const { email } = req.body;

  const token = jwt.sign(
    { email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login ok",
    token
  });
};
