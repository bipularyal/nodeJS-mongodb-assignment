
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
const cors = require('cors');
// middleware
const app = express();
app.use(express.json());
app.use(cors())

// `npm install mongoose`
const mongoose = require("mongoose");
const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// mongodb+srv://<username>:<password>@cluster0.6vk0qgz.mongodb.net/?retryWrites=true&w=majority
// You guys need to replace with your own server url and correct <username> and <password>

const dbUrl = `mongodb+srv://mernpost:mernpost@cluster0.egwuw9k.mongodb.net/?retryWrites=true&w=majority`;

// Mongo DB connection
mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
});

// Validate DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB Connected successfully");
});

// Schema for Book
let Schema = mongoose.Schema;
let postSchema = new Schema(
  {
    id: {
      type: Number,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);


// Post Model
let PostModel = mongoose.model("posts", postSchema);

app.get('/', (req, res) => {
    res.send('Your are lucky!! server is running...');
});



/** GET API: GETs Books from DB and returns as response */
app.get('/posts', async (req, res) => {
    try {
        let posts = await PostModel.find();
        res.status(200).json({
            status: 200,
            data: posts,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});


/** POST API: Gets new book info from React and adds it to DB */
app.post('/posts', async (req, res) => {
    const inputPost = req.body;
    try {
        let post = new PostModel(inputPost);
        post = await post.save();
        res.json({
          status: 200,
          data: post,
        });
      } catch (error) {
        res.json({
          status: 400,
          message: error.message,
        });
      }
});

/** DELETE API: Gets ID of the book to be deleted from React and deletes the book in db. 
 * Sends 400 if there is no book with given id
 * Sends 500 if there is an error while saving data to DB
 * Sends 200 if deleted successfully
 */
app.delete("/posts/:postId", async (req, res) => {
    try {
        let Post = await PostModel.findByIdAndRemove(req.params.PostId);
        if (Post) {
            res.status(200).json({
                status: 200,
                message: "Post deleted successfully",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "No Post found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});


app.listen(3001);