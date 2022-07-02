const profileModel = require("../Models/ProfileModel");
var jwt = require("jsonwebtoken");

// Create Profile
exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  profileModel.create(reqBody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Fail", data: error });
    }
    res.status(200).json({ status: "Siccess", data: data });
  });
};
// User Login
exports.UserLogin = (req, res) => {
  let reqBody = req.body;
  let UserName = req.body["UserName"];
  let Password = req.body["Password"];
  //  res.status(400).json({ status:"Success", data:UserName +' '+Password })

  profileModel.find(
    { UserName: UserName, Password: Password },
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Error", data: error });
      } else {
        if (data.length) {
          // create Auth Token
          let payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0],
          };
          const token = jwt.sign(payload, "key");
          res.status(200).json({ status: "Success", token: token, data: data });
        } else {
          res.status(401).json({ status: "unauthorized" });
        }
      }
    }
  );
};

exports.getProfile = (req, res) => {
  let UserName = req.headers["username"];
  console.log(UserName);
  profileModel.find({ UserName: UserName }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Fail", data: error });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

exports.upDateProfile = (req, res) => {
  let UserName = req.headers["username"];
  let reqBody = req.body;

  profileModel.updateOne(
    { UserName: UserName },
    { $set: { Country: "Bangladesh" } },
    { upsert: true },
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Fail", data: error });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};
