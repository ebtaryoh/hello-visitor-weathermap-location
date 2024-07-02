const express = require("express");
const getHelloVisitor = require("./helloVisitorController");

const router = express.Router();

router.route("/hello").get(getHelloVisitor);

module.exports = router;
