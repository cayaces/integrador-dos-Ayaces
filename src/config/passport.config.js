const passport = require("passport")
const local = require("passport-local")
const { generateToken, verifyToken } = require('./utils.js');

const LocalStrategy = local.Strategy


const initializePassport = () => {
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'JWT_SECRET',
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

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

}



module.exports = initializePassport