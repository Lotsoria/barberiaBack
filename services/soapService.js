const soap = require('soap');
const fs = require('fs');
const path = require('path');
//Pruebas WSDL
const wsdlPathPruebas = path.join(__dirname, '../utils/contratos/pruebas.wsdl');
const wsdlPruebas = fs.readFileSync(wsdlPathPruebas, 'utf8');
//Clientes WSDL
const wsdlPathClients = path.join(__dirname, '../utils/contratos/clientes.wsdl');
const wsdlClients = fs.readFileSync(wsdlPathClients, 'utf8');
//Servicios WSDL
const wsdlPathServicios = path.join(__dirname, '../utils/contratos/servicios.wsdl');
const wsdlServicios = fs.readFileSync(wsdlPathServicios, 'utf8');

//Controllers
const pruebasController = require('../controllers/pruebasController');
const clientesController = require('../controllers/clientesController');
const serviciosController = require('../controllers/serviciosControllers');

//Exportar los servicios
module.exports = function(app) {
  soap.listen(app, '/pruebas', pruebasController, wsdlPruebas);
  soap.listen(app, '/clientes', clientesController, wsdlClients);
  soap.listen(app, '/servicios', serviciosController, wsdlServicios);
};