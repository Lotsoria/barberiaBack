const soap = require('soap');
const fs = require('fs');
const path = require('path');

const wsdlPathService = path.join(__dirname, '../utils/contratos/service.wsdl');
const wsdlService = fs.readFileSync(wsdlPathService, 'utf8');

const wsdlPathClients = path.join(__dirname, '../utils/contratos/clientes.wsdl');
const wsdlClients = fs.readFileSync(wsdlPathClients, 'utf8');

const wsdlPathServicios = path.join(__dirname, '../utils/contratos/servicios.wsdl');
const wsdlServicios = fs.readFileSync(wsdlPathServicios, 'utf8');

const servicesController = require('../controllers/servicesController');
const clientesController = require('../controllers/clientesController');
const serviciosController = require('../controllers/serviciosControllers');



module.exports = function(app) {
  soap.listen(app, '/wsdl', servicesController, wsdlService);
  soap.listen(app, '/clientes', clientesController, wsdlClients);
  soap.listen(app, '/servicios', serviciosController, wsdlServicios);
};