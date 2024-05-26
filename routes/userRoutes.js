const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', userController.register)
router.get('/', auth.checkAuth, auth.isAdmin, userController.getUsers);


router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/profile', auth.checkAuth, userController.getUser); // GET /users/profile
router.put('/profile', auth.checkAuth, userController.updateUser);
router.delete('/profile', auth.checkAuth, userController.deleteUser)


router.get('/:id', auth.checkAuth, auth.isAdmin, userController.getUserById);
router.put('/:id', auth.checkAuth, auth.isAdmin, userController.updateUserById);
router.delete('/:id', auth.checkAuth, auth.isAdmin, userController.deleteUserById);

module.exports = router;