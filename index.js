const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://taskmanagement-ms.web.app"],
    credentials: true,
}));


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmec6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const db = client.db("taskmanager");
    const taskCollection = db.collection("tasks");
    const userCollection = db.collection("users");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      const token = authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // app.post("/tasks", verifyToken, async (req, res) => {
    //   try {
    //     const task = { ...req.body, userId: req.decoded.uid, timestamp: new Date() };
    //     const result = await taskCollection.insertOne(task);
    //     res.status(201).json({ message: "Task created", taskId: result.insertedId });
    //   } catch (error) {
    //     res.status(400).json({ error: error.message });
    //   }
    // });

    app.post("/tasks", async(req, res) => {
        console.log("Received task:", req.body); // Debug log
        const task = req.body
        const tasks = await taskCollection.insertOne(task)
      });

      
    // app.get("/tasks", verifyToken, async (req, res) => {
    //   const tasks = await taskCollection.find({ userId: req.decoded.uid }).toArray();
    //   res.json(tasks);
    // });

    app.get("/tasks", async(req, res) => {
        const tasks = await taskCollection.find().toArray();
        res.json(tasks)
    })

    app.put("/tasks/:id", verifyToken, async (req, res) => {
      try {
        const { id } = req.params;
        const updatedTask = await taskCollection.findOneAndUpdate(
          { _id: new ObjectId(id), userId: req.decoded.uid },
          { $set: req.body },
          { returnDocument: "after" }
        );
        if (!updatedTask) return res.status(404).json({ error: "Task not found" });
        res.json(updatedTask);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.delete("/tasks/:id", verifyToken, async (req, res) => {
      try {
        const { id } = req.params;
        const deletedTask = await taskCollection.deleteOne({ _id: new ObjectId(id), userId: req.decoded.uid });
        if (deletedTask.deletedCount === 0) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted successfully" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    const changeStream = taskCollection.watch();
    changeStream.on("change", () => {
      console.log("Task collection updated");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task Management Backend");
});

app.listen(port, () => {
  console.log(`Task Manager running on port ${port}`);
});