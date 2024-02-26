require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const ACCESS_TOKEN = "tokens"
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
        const visits = database.collection("totalVisits")
        const userReviews = database.collection("userReviews")
        const bookings = database.collection("bookings")

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your passs',
                pass: 'app password'
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

        app.post('/api/insert/visitor', async (req, res) => {
            const { date } = req.body;
            const ip = req.ip;
            const query = { date };

            try {

                const existingRecord = await visits.findOne(query);

                if (existingRecord) {

                    await visits.updateOne(query, { $inc: { count: 1 } });
                    const updatedRecord = await visits.findOne(query);
                    res.send(updatedRecord);
                } else {

                    const dataToInsert = {
                        ip,
                        date,
                        count: 1
                    };

                    const insertedRecord = await visits.insertOne(dataToInsert);
                    res.send(insertedRecord);
                }
            } catch (error) {
                console.error("Error occurred:", error);
                res.status(500).send({ error: "Internal server error" });
            }
        });

        app.get('/api/get/visitor/data', async (req, res) => {
            const visitor = await visits.find().toArray()
            res.send(visitor)
        })


        app.get('/api/get/all/users', verifyToken, verifyUserRole, async(req, res) => {
            const user = await users.find().toArray()
            res.send(user)
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
                const filter = { _id: new ObjectId(dataToUpdate.id) };
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

            const mailOptions = {
                to: `${dataToInsert.email}`,
                subject: `${dataToInsert.requesterName} sent you request for health discussion`,
                html: `
                
                <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f2f2f2; margin: 0; padding: 0;">

                    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <header>
                            <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;"><a href="#" style="color: #007bff; text-decoration: none;">Ambulance Booking App</a></h1>
                        </header>
                        <main>
                            <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Hi, ${dataToInsert.requestTo}</h2>
                            <p style="color: #666; font-size: 16px; margin-bottom: 15px;">${dataToInsert.requesterName} sent you a request for health discussion</p>
                            <p style="color: #666; font-size: 16px; margin-bottom: 15px;">Please schedule a meeting or delete the request</p>
                            <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
                                <a href="http://localhost:5173/medic-guide" style="color: #fff; text-decoration: none;">Confirm</a>
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

        app.post('/api/get/user/reviews', verifyToken, verifyUserRole, async (req, res) => {
            const { rating } = req.body;
            const userReviewsCollection = await userReviews.find().toArray();
            const filterReviews = userReviewsCollection?.filter(ratings => ratings.rating === parseInt(rating))
            let numberOfReviews = filterReviews.length;
            let totalNumberOfReviews = 100;
            let percentage = (numberOfReviews / totalNumberOfReviews) * 100;
            res.send({ percentage: percentage })
        })

        app.post('/api/add/new/doctor', verifyToken, verifyUserRole, async (req, res) => {
            const dataToInsert = req.body;
            const insertData = await doctorsLists.insertOne(dataToInsert)
            res.send(insertData)
        })

        app.post('/api/book/ambulance/', async (req, res) => {
            const dataToInsert = req.body;
            const query = { date: dataToInsert.date };
            const findBookingId = await bookings.findOne(query)
            if (findBookingId) {
                res.send({ msg: "Ambulance booked for that date. Try other date." });
                return; // Exit the function to prevent insertion
            }
            const insert = await bookings.insertOne(dataToInsert)
            res.send(insert)

            const mailOptions = {
                to: `${dataToInsert.bookerEmail}`,
                subject: 'Ambulance booking confirmed',
                html: `
                
                    <body style="font-family: serif, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; margin: 0;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <h1 style="font-size: 24px; color: #333; margin-bottom: 20px; text-align: center;">Ambulance Successfully Booked</h1>
                            
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Your ambulance booking has been successfully confirmed.</p>
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">If you need to cancel the booking call this 01744972948 number in 30 minuites</p>
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">For more detail make sure to call this number : 01744972948</p>
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Thank you for choosing our ambulance service.</p>
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">For any inquiries or assistance, please contact us.</p>
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Best regards,<br>Your Ambulance Service Team</p>
                            <div style="text-align: center;">
                                <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px;">Visit Website</a>
                            </div>
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
        })

        //service provider api

        app.get('/api/get/myBookings/:email', async (req, res) => {
            const email = req.params.email;
            const query = { bookerEmail: email }
            const find = await bookings.find(query).toArray();
            res.send(find)
        })

        app.post('/api/add-new/ambulance', verifyToken, getUserRole, async (req, res) => {
            const dataToInsert = req.body;
            const insert = await ambulanceDetails.insertOne(dataToInsert);
            res.send(insert)
            const subject = "Your ambulance uploaded successfully"
            const body = "Your ambulance is uploaded wait Until admin approve your request"
            sendMail(dataToInsert.email, subject, body)

        })

        const sendMail = (emailSentTo, subject, body) => {
            const mailOptions = {
                to: `${emailSentTo}`,
                subject: `${subject}`,
                html: `
                    
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f2f2f2; margin: 0; padding: 0;">
    
                        <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <header>
                                <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;"><a href="#" style="color: #007bff; text-decoration: none;">Ambulance Booking App</a></h1>
                            </header>
                            <main>
                                <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Hi ${body},</h2>
                                <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
                                    <a href=${emailSentTo} style="color: #fff; text-decoration: none;">Start Meeting</a>
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
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        app.patch('/api/update/ambulance',verifyToken, getUserRole, async(req, res) => {
            const dataToUpdate = req.body;
            const query = {_id : new ObjectId(dataToUpdate.id)}
            const updateAmbulance = {
                $set: {
                    ambulanceNumber: dataToUpdate.ambulanceId,
                    driverName: dataToUpdate.driverName,
                    type: dataToUpdate.type,
                    location: dataToUpdate.location,
                    hospitalName: dataToUpdate.hospitalName,
                }
            };
            const update = await ambulanceDetails.updateOne(query, updateAmbulance)
            res.send(update)
            console.log(dataToUpdate);
        })




        //await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);
