const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth')

const {Signup, Login, edit,changePassword} = require('../Controllers/UserController');

router.post('/signup', Signup);
router.post('/login', Login);
router.put('/update',auth,  edit)
router.put('/password',auth,  changePassword)

router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
  });
module.exports = router;
