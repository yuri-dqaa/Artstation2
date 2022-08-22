import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi'; //Data validator module

//Routes
import userRoute from './routes/Users.js'; // Users


const app = express();
app.use(express.json());


app.use("/api/users", userRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));