const express = require('express');
const cors = require('cors');
const Stripe = require('stripe')
const app = express();

const dotenv = require('dotenv')
dotenv.config({
    path: "server/.env"
    
})


const stripe = new Stripe(`${process.env.STRIPE_SECRET}`);
app.use(express.json());
app.use(cors());

app.post('/api/checkout', async (req, res) => {
    try {
        const { id, amount } = req.body;
        const intent = await stripe.paymentIntents.create({
            amount,
            currency: 'MXN',
            payment_method: id,
            description: "some",
            confirm: true
        })


        res.send({
            message: "Success transaction",
            intent
        })

    } catch (error) {
        res.json({
            message: error
        })

    }
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
});