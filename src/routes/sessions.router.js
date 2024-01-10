const { Router } = require('express');
const passport = require('passport');
const { cookieParserMiddleware } = require('../utils.js');

const router = Router();

router.get(
  '/current',
  cookieParserMiddleware,
  passport.authenticate('cookie', { session: false }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const { _id, first_name, last_name, email, age } = req.user;
      res.json({ user: { _id, first_name, last_name, email, age } });
    } catch (error) {
      console.error('Error al obtener el usuario actual', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
);


module.exports = router;
