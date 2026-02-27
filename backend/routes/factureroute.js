const express = require('express');
const { createFacture, getAllFactures, getFactureById, deleteFacture, updateFacture } = require('../controllers/facturecontroller');
const authentificated = require('../middleware/authentificated');
const authorize = require('../middleware/authorized');
const router = express.Router();

router.post('/addfacture', authentificated, authorize('admin'), createFacture);
router.get('/getallfactures', authentificated, getAllFactures);
router.get('/getfacturebyid/:id', authentificated, getFactureById);
router.delete('/deletefacture/:id', authentificated, authorize('admin'), deleteFacture);
router.put('/updatefacture/:id', authentificated, authorize('admin'), updateFacture);
module.exports = router;
