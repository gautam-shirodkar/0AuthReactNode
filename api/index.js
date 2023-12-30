const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
  tokenSigningAlg: process.env.ALGORITHM,
});

// app.use(jwtCheck);
app.get("/", (req, res) => {
  console.log("without auth success");
  res.status(200).send("success without auth");
});

app.get("/get-profile", jwtCheck, async (req, res) => {
  const url = `https://${process.env.ISSUER}/userinfo`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${req.auth.token}`,
    },
  });
  const userInfo = await response.json();
  console.log(userInfo);
  res.status(200).send(userInfo);
});
app.listen(4000, () => console.log("server running on port 4000"));
