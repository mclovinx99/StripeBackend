const mongoose = require('mongoose');
const Users = require('./userModel');

mongoose.connect(
    "mongodb+srv://adityarathihestabit:eLF39l1qLqYQgjI4@cluster0.kdaaw5v.mongodb.net/?retryWrites=true&w=majority"
)
.then(()=>{
    console.log("connected.")
})
.catch((err)=>{
    console.log(err);
})


module.exports = Users;
module.exports = mongoose;