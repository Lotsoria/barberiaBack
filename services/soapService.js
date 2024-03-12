const soap = require('soap');
const fs = require('fs');
const path = require('path');

const wsdlPath = path.join(__dirname, '../utils/contratos/service.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');

const wsdlPath2 = path.join(__dirname, '../utils/contratos/clientes.wsdl');
const wsdl2 = fs.readFileSync(wsdlPath2, 'utf8');

const servicesController = require('../controllers/servicesController');
const clientesController = require('../controllers/clientesController');



module.exports = function(app) {
  soap.listen(app, '/wsdl', servicesController, wsdl);
  soap.listen(app, '/cliente', clientesController, wsdl2);
};