const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');
const cookieParser = require('cookie-parser');
const passport = require('./middleware/passport');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const { env } = require('process');
require('dotenv').config();

const options = {
  key: fs.readFileSync(process.env.KEY_URL),
  cert: fs.readFileSync(process.env.CERT_URL)
};

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
//app.use(passport.session());
// Allow cross-origin requests
app.use(cors({
  origin: 'https://localhost:5173', // Update with the frontend's URL
  credentials: true, // Allow cookies to be sent
  //methods: 'GET,POST,PUT,DELETE,OPTIONS',
  //allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/api/auth', authRoutes);
app.use('/api/blog', passport.authenticate('jwt', { session: false }), blogRoutes);
/*
app.use('/api/blog', (req, res, next) => {
  console.log('Cookies:', req.cookies); // Log cookies to ensure token is present
  next();
}, (req, res, next) => {
  console.log('Middleware hit');
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
          console.error('Authentication Error:', err);
          return res.status(500).json({ message: 'Authentication error' });
      }
      if (!user) {
          console.error('Authentication Failed:', info);
          return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
  })(req, res, next);
}, blogRoutes);
*/

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

https.createServer(options, app).listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

module.exports = app;
