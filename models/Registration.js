const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const Event = require("../models/Event");
const protect = require("../middleware/authMiddleware");


// ================= REGISTER FOR EVENT =================
router.post("/:eventId", protect, async (req, res) => {
  try {

    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Prevent duplicate registration
    const alreadyRegistered = await Registration.findOne({
      user: req.user.id,
      event: req.params.eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: req.params.eventId,
    });

    res.status(201).json(registration);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= VIEW MY REGISTRATIONS =================
router.get("/my", protect, async (req, res) => {
  try {

    const registrations = await Registration.find({
      user: req.user.id,
    }).populate("event");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= CANCEL REGISTRATION =================
router.delete("/:id", protect, async (req, res) => {
  try {

    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Only owner can cancel
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await registration.deleteOne();

    res.json({ message: "Registration cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;