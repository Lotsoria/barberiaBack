const db = require("../database/db");

const serviciosController = {
    ServiciosService: {
        ServiciosPort: {
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
        }
    }
};


module.exports = serviciosController;