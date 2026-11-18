import express from 'express'
import con from "../utils/db.js";

const router = express.Router()

router.post("/login", (req, res) => {
    const sql = "SELECT * from users WHERE username = ? and password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
      if (err) {
        return res.json({ loginStatus: false, Error: "Query error" });
      }
      if (result.length > 0) {
        const username = result[0].email;
        const token = jwt.sign(
          { role: "user", username: username, id: result[0].id }, // Adjust role for user
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token); // Send token in a cookie
        return res.json({ loginStatus: true });
      } else {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
    });
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})
  

export {router  as UsersRoute}