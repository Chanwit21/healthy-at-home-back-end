const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const { User } = require('../models');

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY,
};

//  Check Admin Strategy
const jwtAdminStrategy = new JWTStrategy(opt, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      if (user.role !== 'ADMIN') {
        done(null, false);
      } else {
        const newUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        done(null, newUser);
      }
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use('jwtAdmin', jwtAdminStrategy);

//  Check Trainer Strategy
const jwtTrainerStrategy = new JWTStrategy(opt, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      if (user.role !== 'TRAINER') {
        done(null, false);
      } else {
        const newUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        done(null, newUser);
      }
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use('jwtTrainer', jwtTrainerStrategy);

//Check Admin or Trainer
const jwtAdminOrTrainer = new JWTStrategy(opt, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      if (user.role === 'CUSTOMER') {
        done(null, false);
      } else {
        const newUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        done(null, newUser);
      }
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use('jwtAdminOrTrainer', jwtAdminOrTrainer);

//  Check All user Strategy
const jwtAllUserStartegy = new JWTStrategy(opt, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      const newUser = { ...user.dataValues };
      delete newUser['password'];
      done(null, newUser);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use('jwtAlluser', jwtAllUserStartegy);
