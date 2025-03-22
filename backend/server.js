// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./appError');

dotenv.config({ path: './config.env' });
const app = require('./app');
const password = encodeURIComponent(process.env.DATABASE_PASSWORD); 
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  password
);

mongoose
  .connect(DB, {
     useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 4000;


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});



app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
