const mongoose = require('mongoose')


module.exports = (dbname) => {
    mongoose.connect(`mongodb://localhost/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`Successfully connected to ${dbname}`))
        .catch(err => console.log(err))
}