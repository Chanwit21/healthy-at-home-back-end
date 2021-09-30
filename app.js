require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const exerciseRoute = require('./route/exercisePosture');
app.use(cors());
app.use(express.json());

app.use('/exercise', exerciseRoute);

const port = process.env.PORT || 4001;
const server = app.listen(port, () => console.log(`Serever is running on port ${port}`));

// const { sequelize } = require('./models');
// sequelize.sync({ force: true });
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
