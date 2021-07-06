const express = require("express");
 
const Course = require('./golfCourses/golfCourses-model'); 

const server = express();

//GLOBAL MIDDLEWAR
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.status(200).json(courses); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

server.post("/api/courses", async (req, res) => {
  const courseInfo = req.body; 
  try { 
    const addedCourse = await Course.addCourse(courseInfo); 
    res.status(200).json(addedCourse); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = server;