const db = require("../database/db");

const clientesController = {
  ClientesService: {
    ClientesPort: {
      getClientsById: async function (args, callback) {
        console.log("Llamada a getClientsById");
        try {
          const { id } = args;
          const [rows] = await db.query("SELECT * FROM clientes WHERE id = ?", [id,]);
          const response = {
            cliente: {
              id: rows[0].id,
              nombres: rows[0].nombres,
              apellidos: rows[0].apellidos,
              nit: rows[0].nit,
              telefono: rows[0].telefono,
              correo: rows[0].correo,
              createdAt: rows[0].createdAt,
              updatedAt: rows[0].updatedAt,
              estado: rows[0].estado,
            },
          };

          const jsonResponse = JSON.stringify(response);
          callback(null, response);
        } catch (error) {
          callback({
            Fault: {
              Code: {
                Value: "SOAP-ENV:Server",
                Subcode: { value: "InternalServerError" },
              },
              Reason: { Text: "Error interno del servidor" },
              statusCode: 500,
            },
          });
        }
      },
      getClients: async function (args, callback) {
        try {
          const [rows] = await db.query(
            "SELECT * FROM clientes WHERE estado = 1"
          );
          const response = {
            clientes: rows.map((row) => ({
              id: row.id,
              nombres: row.nombres,
              apellidos: row.apellidos,
              telefono: row.telefono,
              correo: row.correo,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              estado: row.estado,
            })),
          };
          callback(null, response);
        } catch (error) {
          callback({
            Fault: {
              Code: {
                Value: "SOAP-ENV:Server",
                Subcode: { value: "InternalServerError" },
              },
              Reason: { Text: "Error interno del servidor" },
              statusCode: 500,
            },
          });
        }
      }, 
      createClient: async function (args, callback) {
        try {
          const { nombres, apellidos, telefono, correo } = args;

          const result = await db.query(
            "INSERT INTO clientes (nombres, apellidos, telefono, correo, estado, createdAt) VALUES (?, ?, ?, ?, 1, NOW())",
            [nombres, apellidos, telefono, correo]
          );
          callback(null, {
            result: `El usuario ${nombres} ${apellidos} a sido registrado correctamente`,
          });
        } catch (error) {
          callback(error);
        }
      },
      updateClient: async function (args, callback) {
        try {
          const { id, nombres, apellidos, correo, telefono } = args;
          const result = await db.query(
            "UPDATE clientes SET nombres = ?, apellidos = ?, correo = ?, telefono = ?, updatedAt = NOW() WHERE id = ?",
            [nombres, apellidos, correo, telefono, id]
          );
          callback(null, { result: "Usuario actualizado correctamente!!" });
        } catch (error) {
          callback(error);
        }
      },
      deleteClients: async function (args, callback) {
        try {
          const { id } = args;
          const result = await db.query("UPDATE clientes SET estado = 0 WHERE id = ?", [
            id,
          ]);
          callback(null, { result: "Usuario eliminado correctamente!!" });
        } catch (error) {
          callback(error);
        }
      },
    },
  },
};

module.exports = clientesController;
