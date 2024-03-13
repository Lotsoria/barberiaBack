const db = require("../database/db");

const serviciosController = {
    ServiciosService: {
        ServiciosPort: {
          getServiciosById: async function (args, callback) {
            try {
              const { id } = args;
              const [rows] = await db.query("SELECT * FROM servicios WHERE id = ?", [id,]);
              const response = {
                servicio: {
                  id: rows[0].id,
                  precio: rows[0].precio,
                  descripcion: rows[0].descripcion,
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
          getServicios: async function (args, callback) {
                console.log("Llamada a getServicios");
                try {
                  const [rows] = await db.query(
                    "SELECT * FROM servicios WHERE estado = 1"
                  );
                  const response = {
                    servicios: rows.map((row) => ({
                      id: row.id,
                      precio: row.precio,
                      descripcion: row.descripcion,
                      estado: row.estado,
                      createdAt: row.createdAt,
                      updatedAt: row.updatedAt,
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
          createServicios: async function (args, callback) {
            try {
              const { precio, descripcion } = args;
    
              const result = await db.query(
                "INSERT INTO servicios (precio, descripcion, estado, createdAt) VALUES (?, ?, 1, NOW())",
                [precio, descripcion]
              );
              callback(null, {
                result: `El servicio ${descripcion}a sido registrado correctamente`,
              });
            } catch (error) {
              callback(error);
            }
          },
          updateServicios: async function (args, callback) {
            try {
              const { id, precio, descripcion } = args;
              const result = await db.query(
                "UPDATE servicios SET precio = ?, descripcion = ? WHERE id = ?",
                [precio, descripcion, id]
              );
              callback(null, { result: "Servicio actualizado correctamente!!" });
            } catch (error) {
              callback(error);
            }
          },
          deleteServicios: async function (args, callback) {
            try {
              const { id } = args;
              const result = await db.query("UPDATE servicios SET estado = 0 WHERE id = ?", [
                id,
              ]);
              callback(null, { result: "Servicio eliminado correctamente!!" });
            } catch (error) {
              callback(error);
            }
          },
        }
    }
};


module.exports = serviciosController;