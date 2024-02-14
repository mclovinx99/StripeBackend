const mongoose = require('mongoose');
require('./userModel');
const Users = mongoose.model('ProductUsers');

mongoose.connect(
	"mongodb+srv://adityarathihestabit:eLF39l1qLqYQgjI4@cluster0.kdaaw5v.mongodb.net/?retryWrites=true&w=majority"
)
	.then(() => {
		console.log("connected for seeding.")
	})
	.catch((err) => {
		console.log(err);
	})

const seedUser1 = {
	picture: "Admin.jpg",
	name: "Aditya",
	email: "aditya.rathi.hestabit@gmail.com",
	previous_school: "DPS"
}

const seedUser2 = {
	role: "User",
	name: "Aditya Rathi",
	email: "aditya@gmail.com",
	password: "Hestabit@123",
	address: {
		line1: "Random",
		postal_code: 201301,
		city: "Noida",
		state: "UP",
		country: "IN"
	},
	product_subscribed: "Not Applicable"
}

const seedUser3 = {
	role: "Teacher",
	name: "Aditya3",
	email: "aditya.rathi.hestabit@gmail.com",
	password: "sk*292njXHOw",
	address: "Noida",
	picture: "amx.jpg",
	current_school: "Amity",
	previous_school: "DPS",
	experience: 2,
	expertise: "SST"
}

// const checkFun = async()=>
// {

//     const teacherData = await Users.findOne({email:'aditya.hestabit@gmail.com'})
//         .exec()
//         .then((res)=>{
//             console.log(res);
//             return res;
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
//         console.log(teacherData);

//         const studentData = await Students.findOneAndUpdate(
//         {email:"aditya.rathi.hestabit@gmail.com"},
//         teacher = teacherData._id)
//         .exec()
//         .then((res)=>{
//             console.log(res);
//             return res;
//         })
//         .catch((err)=>{
//             console.log(err);
//         });

//         const updatedTeacher = await Users.findOneAndUpdate(
//         {email:"aditya.hestabit@gmail.com"},
//         {$push:{assignedStudents:studentData._id}}
//         )
//         .exec()
//         .then((res)=>{
//             console.log(res);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }

const dbSeed = async () => {
	await Users.insertMany(seedUser2);
}

// dbSeed()
// .then(()=>{
//     console.log("seeded into database");
//     mongoose.connection.close();
// })
dbSeed()
	.then(() => {
		console.log("updated");
		mongoose.connection.close();
	})