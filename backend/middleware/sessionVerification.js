function sessionVerification (req, res, next){
    req.sessionStore.get(req.session.id, (err, sessionData) =>{
        if(err){
            console.log(err)
            return
        }

        if(!req.cookies || !req.session.username ){
            res.status(401).send('You are not logged in, login to proceed')
            // res.send('kjsdfkjsf')
            // const err = 'You are not logged in'
            // console.log(req.session.username)
            next(err)
            return
        }

        console.log('verified session')
        console.log(sessionData)
        next()
    })

}

module.exports = sessionVerification