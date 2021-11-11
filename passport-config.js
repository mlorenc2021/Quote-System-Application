const localStrategy = require('passport-local').Strategy

function initialize(passport){
    const authenticateUser = (email, password, done) => {
        const user = getUserByName(username)
        if (user == null) {
            return done(null, false, {message: 'No user with that email' })
        }
    }

    try {
        if (await bcrypt.compare(password, user.password)) {

        }else {
            return done(null, false, {  message: 'Password incorrect' })
        }
    }
    catch(e) {
        return done(e)
    }

    passport.use(new localStrategy({ usernameField: 'username' }), authenticateUser)
    passport.serializeUser((user,done)=> {  })
    passport.deserializeUser((id, done) => {  })
}

module.exports