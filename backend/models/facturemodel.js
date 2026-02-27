const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({ 
    client: {
        type: mongoose.Schema.Types.ObjectId,      // Reference to the Client model
        ref: 'Client',            // Reference to the Client model
        required: true     // Client is required        
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,    
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number
    },  
    date: {
        type: Date,
        default: Date.now
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
});
module.exports = mongoose.model('Facture', factureSchema);