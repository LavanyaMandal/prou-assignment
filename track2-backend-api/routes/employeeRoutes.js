const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

router.get("/", async (_, res) => res.json(await Employee.find()));
router.post("/", async (req, res) => res.json(await Employee.create(req.body)));
router.put("/:id", async (req, res) =>
  res.json(await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
router.delete("/:id", async (req, res) =>
  res.json(await Employee.findByIdAndDelete(req.params.id))
);

module.exports = router;
