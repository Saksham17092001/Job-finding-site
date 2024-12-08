const express = require("express");
const router = express.Router();
const Job = require("../schema/job.schema");
const dotenv = require("dotenv");
const authMiddleware = require("../middleware/auth");
dotenv.config();

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving jobs" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving job" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const {
        companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        remoteOrOffice,
        location,
        jobDescription,
        aboutCompany,
        skillsRequired,
        additionalInfo,
    } = req.body;

    // Check required fields
    if (!companyName || !jobPosition || !salary || !jobType || !remoteOrOffice || !jobDescription ||!aboutCompany|| !skillsRequired) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (remoteOrOffice === "office" && !location) {
        return res.status(400).json({ message: "Location is required for office jobs" });
    }

    try {
        const user = req.user;
        const job = await Job.create({
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteOrOffice,
            location,
            jobDescription,
            aboutCompany,
            skillsRequired,
            additionalInfo,
            user: user.id,
        });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: "Error creating job" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const {
        companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        remoteOrOffice,
        location,
        jobDescription,
        aboutCompany,
        skillsRequired,
        additionalInfo,
    } = req.body;

    try {
        const job = await Job.findById(id);
        const userId = req.user.id;

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (userId !== job.user.toString()) {
            return res.status(401).json({ message: "You are not authorized to update this job" });
        }

        if (remoteOrOffice === "office" && !location) {
            return res.status(400).json({ message: "Location is required for office jobs" });
        }

        await Job.findByIdAndUpdate(id, {
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteOrOffice,
            location,
            jobDescription,
            aboutCompany,
            skillsRequired,
            additionalInfo,
        });
        res.status(200).json({ message: "Job updated" });
    } catch (err) {
        res.status(500).json({ message: "An internal server error occurred" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        const userId = req.user.id;

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (userId !== job.user.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this job" });
        }

        await Job.deleteOne({ _id: id });
        res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: "An internal server error occurred" });
    }
});

module.exports = router;
