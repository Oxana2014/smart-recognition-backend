const handleSignin = ( db, bcrypt) => (req, res) => {
    // bcrypt.compare("apples", "$2b$10$0LKW9YK.qFPX44hLtegV7.UpvDy29aIMqa/2fp5l4qFNnssZIYnsu", function(err, result) {
    //     console.log("first guess", result)
    // });
    // bcrypt.compare("someOtherPlaintextPassword", "$2b$10$0LKW9YK.qFPX44hLtegV7.UpvDy29aIMqa/2fp5l4qFNnssZIYnsu", function(err, result) {
    //     console.log("second guess", result)
    // });
    const {email, password} = req.body;
    if(!email || !password) {
      return  res.status(400).json("incorrect form submission")
    }

db.select('email', 'hash').from('login')
.where('email', '=', email)
.then(data => {
   const isValid = bcrypt.compareSync(password, data[0].hash);
   if(isValid) {
      return db.select('*').from('users')
       .where('email', '=', email)
       .then(user => {
           res.json(user[0])
       })
       .catch(err => res.status(400).json("unable to get user"))
        }
        else {
            res.status(400).json("wrong credentials")
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}
module.exports = {
    handleSignin: handleSignin
}