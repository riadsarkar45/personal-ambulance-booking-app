const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('ambulance booking server is running');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});


const uri = "mongodb+srv://ambulance-booking-app:A2GPimIGFX7T2qPL@cluster0.lu7tyzl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db('ambulance-booking-app')
        const ambulanceDetails = database.collection("ambulance-details")
        const comments = database.collection("comments")
        const commentReply = database.collection("commentReplies")

        app.get('/all-users', async (req, res) => {
            const result = await ambulanceDetails.find().toArray();
            res.send(result);

        });

        app.post('/api/search/detail', async (req, res) => {
            const { text, filterType } = req.body;
            const result = await ambulanceDetails.find().toArray();


            if (filterType === "location") {
                const filterLocation = result?.filter(loc => loc.location.includes(text));
                return res.send(filterLocation);
            }

            if (filterType === "driverName") {
                const filterDriverName = result?.filter(driverName => driverName.driverName.includes(text));
                return res.send(filterDriverName);
            }

            if (filterType === "ambuNumber") {
                const filterLocation = result?.filter(ambulanceNumber => ambulanceNumber.ambulanceNumber.includes(text));
                return res.send(filterLocation);
            }

            if (filterType === "category") {
                const filterLocation = result?.filter(ambulanceType => ambulanceType.type === text);
                return res.send(filterLocation);
            }

            return res.status(400).send("Invalid filterType.");
        });

        app.get('/api/ambulance/detail/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };

            const data = await ambulanceDetails.findOne(query);

            const comment = await comments.find().toArray();

            const commentObjectIDs = comment.map(comment => new ObjectId(comment._id));

            const filterComments = comment.filter(comment => comment.postId === id);

            const commentReplies = comment.filter(comment => commentObjectIDs.toString().includes(comment.parent_Id));

            const responseData = {
                ambulanceDetails: data,
                comments: filterComments,
                replyComments: commentReplies
            };
            res.status(200).send(responseData)
        });

        app.post('/api/new/comment', async (req, res) => {
            const data = req.body;
            console.log(data)
            if (data.type === "singleComment") {
                const singleCommentData = {
                    texts: data.texts,
                    postId: data.postId,
                    parent_Id: null,
                    userName: data.userName
                }
                const insertNewComment = await comments.insertOne(singleCommentData)
                res.send(insertNewComment)
            } else {
                const replyCommentData = {
                    texts: data.texts,
                    parent_Id: data.parent_Id,
                    ml: data.ml,
                    repliedName: data.userName,
                    repliedUserName: data.repliedUserName
                }
                const insertReplyComment = await comments.insertOne(replyCommentData)
                res.send(insertReplyComment)
            }

        })

        app.post('/api/submit/comments', async (req, res) => {
            try {
                const { text, commentType, replyId, postId } = req.body;

                if (commentType === "reply") {
                    // Find the parent comment by its ID
                    const parentComment = await comments.findOne({ _id: replyId });
                    if (!parentComment) {
                        return res.status(404).json({ message: "Parent comment not found" });
                    }

                    // Create the new reply object
                    const reply = {
                        _id: new ObjectId(),
                        text,
                        postId,
                        replies: [] // Initialize empty replies array for the reply
                    };

                    // Add the new reply to the parent comment's replies array
                    parentComment.replies.push(reply);

                    // Update the parent comment in the database
                    await comments.updateOne({ _id: parentComment._id }, { $set: { replies: parentComment.replies } });

                    return res.status(201).json(reply);
                } else {
                    // Handle regular comment submission
                }
            } catch (error) {
                console.error("Error submitting comment:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });













        //await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);