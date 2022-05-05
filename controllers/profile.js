const handleProfileGet = (req, res) => {
    const {id} = req.params;
   db.select('*').from('users').where({
       id: id
   })
   .then(users => {
       if(users.length) {
            res.json(users[0]);
       } else {
        res.status(404).json("not found");
       }   
   })
   .catch(e => res.status(404).json("error getting user")) 
}

module.exports = {
    handleProfileGet: handleProfileGet
}