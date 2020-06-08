const express = require('express')
const cors = require('cors')
const port = 8000
const bp = require("body-parser");
const dbname = "foods"
const cookieParser = require("cookie-parser")




const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bp.json({ limit: '16mb' }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static('./public'));




require("./server/config/mongoose.config")(dbname)
require('./server/routes/user.routes')(app)



app.listen(port, () => console.log(`Server has connected successfully ++++++++++++++ on port: ${port}`));

// app.post('/charge', (req, res) => {
//     const amount = 2500
//     stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken
//     })
//         .then(customer => stripe.charges.create({
//             amount,
//             description: 'Some Book',
//             currency: 'usd',
//             customer: customer.id
//         }))
//         .then(charge => res.render('success'))
// })