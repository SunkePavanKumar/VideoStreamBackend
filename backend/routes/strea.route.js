// routes/streamRoutes.js
import express from "express";
const router = express.Router();
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from "fs";
router.get("/video", (req, res) => {
  const videoPath =
    "C:/Users/pavan/Desktop/videoStreamApplciation/backend/videos/big_buck_bunny_240p_30mb.mp4";
  const videoSize = fs.statSync(videoPath).size;

  // Check if the video file exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).send({ error: "Video not found" });
  }

  // Set default headers
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for a year

  // Handle range requests
  const range = req.headers.range;
  if (range) {
    // Extract the start and end values from the range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunkSize = end - start + 1;

    // Set headers specific for partial content
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Content-Length": chunkSize,
    });

    // Create a stream for the range
    const stream = fs.createReadStream(videoPath, { start, end });
    stream.on("open", function () {
      stream.pipe(res);
    });
    stream.on("error", function (error) {
      console.error("Stream Error:", error);
      res.status(500).send({ error: "Video stream error" });
    });
  } else {
    // No range header present, stream the whole video
    res.writeHead(200, {
      "Content-Length": videoSize,
    });
    const stream = fs.createReadStream(videoPath);
    stream.on("open", function () {
      stream.pipe(res);
    });
    stream.on("error", function (error) {
      console.error("Stream Error:", error);
      res.status(500).send({ error: "Video stream error" });
    });
  }
});

router.get("/audio", (req, res) => {
  // Logic to stream audio
});

export default router;
