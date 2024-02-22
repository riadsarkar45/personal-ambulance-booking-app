require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ACCESS_TOKEN = "your access token"
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
        const doctorsLists = database.collection('doctors-lists')
        const patientRequest = database.collection("patient-request")
        const users = database.collection("users")

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yourgmail.com',
                pass: 'your app password'
            }
        });


        const verifyToken = (req, res, next) => {
            // console.log('inside verify token', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded;
                next();
            })
        }

        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const query = { email: email };
            const user = await users.findOne(query);
            let admin = false;
            let doctor = false;
            if (user) {
                admin = user?.role === 'admin';
                doctor = user?.role === 'doctor'
            }
            res.send({ admin, doctor });
        })

        const getUserRole = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await users.findOne(query);

            if (user) {
                req.userRole = user.role;
                next();
            } else {
                res.status(403).send({ message: 'Forbidden access' });
            }
        };

        const verifyUserRole = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await users.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

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



        app.get('/api/get/all/doctors/:email', verifyToken, async (req, res) => {
            const email = req.params.email
            const result = await doctorsLists.find().toArray();
            const patientReq = await patientRequest.find().toArray();
            const filter = patientReq?.filter(reqs => reqs.requesterEmail === email)
            const requesterEmails = filter?.map(ids => ids.requestToId.toString())

            res.send({ result, requesterEmails })
        })

        app.get('/api/doctor/request/:doctorEmail', async (req, res) => {
            const doctorEmail = req.params.doctorEmail;
            const reqCollection = await patientRequest.find().toArray();
            const userEmail = reqCollection?.filter(email => email.email === doctorEmail)
            res.send(userEmail)
        })

        app.put('/api/update/request/status', async (req, res) => {
            try {
                const dataToUpdate = req.body;
                const id = dataToUpdate.id
                console.log(id)
                const filter = { _id: new ObjectId(id) };
                const updateStatus = {
                    $set: {
                        status: dataToUpdate.status,
                    }
                };
        
                const update = await patientRequest.updateOne(filter, updateStatus);
        
                res.send(update);

                const mailOptions = {
                    from: 'yourgmail.com',
                    to: `${dataToUpdate.confirmationEmailReceiver}`,
                    subject: 'Your requested accepted',
                    html: `
                    
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f2f2f2; margin: 0; padding: 0;">
    
                        <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <header>
                                <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;"><a href="#" style="color: #007bff; text-decoration: none;">Ambulance Booking App</a></h1>
                            </header>
                            <main>
                                <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Hi ${dataToUpdate.requesterName},</h2>
                                <p style="color: #666; font-size: 16px; margin-bottom: 15px;">Your request was accepted</p>
                                <p style="color: #666; font-size: 16px; margin-bottom: 15px;">Your meeting scheduled in ${dataToUpdate.meetingDate} ${dataToUpdate.meetingTime}</p>
                                <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
                                    <a href=${dataToUpdate.meetLink} style="color: #fff; text-decoration: none;">Start Meeting</a>
                                </button>
                            </main>
                            <footer class="footer" style="margin-top: 20px; font-size: 14px; color: #666;">
                                <p>Thanks,<br>Ambulance booking app team</p>
                            </footer>
                        </div>
                    </body>
                    `
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.status(500).send('Error sending email');
                    } else {
                        console.log('Email sent:', info.response);
                        res.status(200).send('Email sent');
                    }
                });
            } catch (error) {
                console.error('Error updating request status:', error);
                res.status(500).send('Error updating request status');
            }
        });
        

        

        app.post('/api/create/new/request/to/doctor', verifyToken, getUserRole, async (req, res) => {
            const dataToInsert = req.body;
            const insert = await patientRequest.insertOne(dataToInsert);
            res.send(insert)
        })

        app.get('/api/get/my-request/:email', async (req, res) => {
            const params = req.params.email;
            const patientReq = await patientRequest.find().toArray()
            const patientsReq = patientReq.filter(reqEmail => reqEmail.requesterEmail === params)
            res.send(patientsReq)
        })


        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, ACCESS_TOKEN, { expiresIn: '1h' });

            res.send({ token })
        })











        //await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);
