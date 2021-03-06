require('dotenv').config();
require('./config/passport');
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const errorController = require('./controller/error');
const exerciseRoute = require('./route/exercisePosture');
const creditCardRoute = require('./route/creditCard');
const userRoute = require('./route/user');
const courseServiceRoute = require('./route/courseService');
const promotionImageRoute = require('./route/promotionImage');
const customerResultImageRoute = require('./route/customerResultImage');
const contactUsRoute = require('./route/contactUs');
const trainerInfoRoute = require('./route/trainerInfo');
const paymentRoute = require('./route/payment');
const transactionRoute = require('./route/transaction');
const userTrainerRelationalRoute = require('./route/userTrainerRelational');
const inprogressProgramRoute = require('./route/inprogressProgram');
const refreashTokenRoute = require('./route/refreashToken');
const foodImageRoute = require('./route/foodImage');
const foodScheduleRoute = require('./route/foodSchedule');
const colorExercisePostureRoute = require('./route/colorExercisePosture');
const customerInprogressRoute = require('./route/customerInprogress');
const workoutScheduleRoute = require('./route/workoutSchedule');
const relationRoute = require('./route/relation');

app.use(cors());
app.use(express.json());

// Initial passport
app.use(passport.initialize());

app.use('/users', userRoute);
app.use('/exercise', exerciseRoute);
app.use('/course_services', courseServiceRoute);
app.use('/credit_card', creditCardRoute);
app.use('/promotion_image', promotionImageRoute);
app.use('/customer_result_image', customerResultImageRoute);
app.use('/contact_us', contactUsRoute);
app.use('/trainer_info', trainerInfoRoute);
app.use('/payment', paymentRoute);
app.use('/transaction', transactionRoute);
app.use('/user_trainer_relational', userTrainerRelationalRoute);
app.use('/inprogress_program', inprogressProgramRoute);
app.use('/refresh_token', refreashTokenRoute);
app.use('/food_image', foodImageRoute);
app.use('/color_exercise_posture', colorExercisePostureRoute);
app.use('/customer_inprogress', customerInprogressRoute);
app.use('/food_schedule', foodScheduleRoute);
app.use('/workout_schedule', workoutScheduleRoute);
app.use('/relation', relationRoute);

app.use((req, res, next) => {
  res.status(404).json('resource is not found');
});

app.use(errorController);

const port = process.env.PORT || 4001;
const server = app.listen(port, () => console.log(`Serever is running on port ${port}`));

// Test Db and Socket io

// const { sequelize, ExercisePosture } = require('./models');

// sequelize.sync({ force: false });
// const { ExercisePosture, sequelize } = require('./models');
// const run = async () => {
//   const res = await ExercisePosture.findAll({
//     group: 'type',
//     attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count'], 'type'],
//   });
//   console.log(JSON.stringify(res, null, 2));
// };
// run();

// console.log(server);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   socket.on('message', (msg) => {
//     socket.emit('show', msg);
//   });
//   console.log('Some client connected');
// });
