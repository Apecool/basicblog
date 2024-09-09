const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
//const authenticateToken = require('passport');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Authenticated routes
//router.post('/', authenticateToken, blogController.createBlog);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

/* Middleware: Apply Passport’s authenticate middleware to routes that require authentication:
app.get('/protected-route', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Authenticated route accessed!' });
});
*/