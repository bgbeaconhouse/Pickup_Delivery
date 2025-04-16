require("dotenv").config()

const express = require("express")
const app = express();

const prisma = require("./prisma");

const cors = require("cors");
const PORT = 3000

app.use(express.json());
app.use(require("morgan")("dev"));

app.use(cors({ origin: "http://localhost:5173" }));

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const verifyToken = require("./verify")

app.use("/api", require("./api"));

app.post("/api/register", async (req, res, next) => {
    const {email, password} = req.body
    const newUser = await prisma.user.create({
      data: {email, password: await bcrypt.hash(password, 5)}
    })
    const token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET)
  
    res.status(201).json(token)
  })



app.post("/api/login", async (req, res, next) => {
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
      where: {email}
    })
    if (!user) return res.status(400).json("User not found.")
      console.log(user);
      
    const passwordMatch = await bcrypt.compare(password, user.password)
  
    if (!passwordMatch) return res.status(401).json("Account not found")
      const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
  
    res.status(201).json(token)
  })


  

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal server error';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})