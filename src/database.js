import mongoose from "mongoose"; 

const URL='mongodb+srv://Deadlink-23:4j97F7pD3wfEne5v@cluster0.q96abai.mongodb.net/sanver'

mongoose.connect(URL)
.then(db => console.log('Db is connected sucessfully!!'))
.catch(error => console.log(error));