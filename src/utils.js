const { fileURLToPath } = require('url')
const path = require('path')
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const passport = require('passport')
const { userModel } = require('./models/users.model.js');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt')
const cookieParser = require('cookie-parser')

const JWT_SECRET = 'mi_pequeño_secreto';


passport.use(
    'current',
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.userId);

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);


exports.cookieParserMiddleware = cookieParser()
passport.use('cookie', passport.authenticate('jwt', { session: false }))


module.exports.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports.isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)



// Función para generar un token JWT
exports.generateToken = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
};


exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
};



module.exports.__dirname 