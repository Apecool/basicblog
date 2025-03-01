const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const jwtSecret = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const opts = {
  jwtFromRequest: (req) => {
    const token = req.cookies.token; // Extract token from cookie
    return token || null;
  },
  secretOrKey: jwtSecret,
  //algorithms: ['HS256']
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.id },
    });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
