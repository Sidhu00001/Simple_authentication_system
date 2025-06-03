import express from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET
const users = [];
// function generateTkoen() {
//   const options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];
//   let token = "";
//   for (let i = 0; i < 32; i++) {
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (users.find((user) => user.username === username)) {
    res.json("User already exists");
    return;
  }
  users.push({ username: username, password: password });
  res.json({
    message: "User signed up successfully",
  });
  console.log(users);
});
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let Founduser = users.find((user) => {
    if (user.username === username && user.password === password) {
      return true;
    }
  });

  if (Founduser) {
    const token = jsonwebtoken.sign({
      username:Founduser.username,
    },JWT_SECRET)// generateTkoen();
    // Founduser.token = token;
    res.json({
      message: "User signed in successfully",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
  console.log(users);
});
app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  try {
    const deencryptedToken = jsonwebtoken.verify(token, JWT_SECRET);
    const username = deencryptedToken.username;
    let foundUser = users.find(user => user.username === username);
    if (foundUser) {
      res.json({
        username: foundUser.username,
        message: "User found successfully",
      });
    } else {
      res.status(403).json({
        message: "token invalid",
      });
    }
  } catch (e) {
    res.status(403).json({
      message: "token invalid",
    });
  }
  console.log(users);
  console.log("Token: ", token);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

