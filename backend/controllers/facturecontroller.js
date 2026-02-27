const factureModel = require('../models/facturemodel');

// Create a new facture
const createFacture = async (req, res) => {
    try {
        const { client, products, totalAmount } = req.body;
        const facture = new factureModel({
            client,
            products,
            totalAmount,
            order: req.body.order
        });
        await facture.save();
        res.status(201).json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllFactures = async (req, res) => {
    try {
        const factures = await factureModel.find().populate('client').populate('products.product');
        res.status(200).json(factures);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getFactureById = async (req, res) => {
    try {
        const facture = await factureModel.findById(req.params.id).populate('client').populate('products.product');
        if (!facture) {
            return res.status(404).json({ message: 'Facture not found' });
        }
        res.status(200).json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteFacture = async (req, res) => {
    try {
        const facture = await factureModel.findByIdAndDelete(req.params.id);
        if (!facture) {
            return res.status(404).json({ message: 'Facture not found' });
        }
        res.status(200).json({ message: 'Facture deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateFacture = async (req, res) => {
    try {
        const facture = await factureModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('client').populate('products.product');
        if (!facture) {
            return res.status(404).json({ message: 'Facture not found' });
        }
        res.status(200).json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = { createFacture, getAllFactures, getFactureById, deleteFacture, updateFacture };     