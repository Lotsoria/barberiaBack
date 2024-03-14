const db = require("../database/db");

const citasController = {
  CitasService: {
    CitasPort: {
      getCitasById: async function (args, callback) {
        try {
          const { id } = args;
          const [rows] = await db.query("SELECT * FROM citas WHERE id = ?", [id,]);
          const response = {
            cita: {
              id: rows[0].id,
              fechaReservacion: rows[0].fechaReservacion,
              horaReservacion: rows[0].horaReservacion,
              cliente_id: rows[0].cliente_id,
              servicio_id: rows[0].servicio_id,
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
      getCitas: async function (args, callback) {
        try {
          const [rows] = await db.query(
            "SELECT * FROM citas WHERE estado = 1"
          );
          const response = {
            citas: rows.map((row) => ({
              id: row.id,
              fechaReservacion: row.fechaReservacion,
              horaReservacion: row.horaReservacion,
              cliente_id: row.cliente_id,
              servicio_id: row.servicio_id,
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
      createCitas: async function (args, callback) {
        console.log("Llego a create Citas");
        try {
          const { fechaReservacion, horaReservacion, cliente_id, servicio_id } = args;

          const result = await db.query(
            "INSERT INTO citas (fechaReservacion, horaReservacion, cliente_id, servicio_id, estado, createdAt) VALUES (?, ?, ?, ?, 1, NOW())",
            [fechaReservacion, horaReservacion, cliente_id, servicio_id]
          );
          callback(null, {
            result: `La reservación a sido registrado correctamente`,
          });
        } catch (error) {
          callback(error);
        }
      },
      updateCitas: async function (args, callback) {
        try {
          const { id, fechaReservacion, horaReservacion, cliente_id, servicio_id } = args;
          const result = await db.query(
            "UPDATE citas SET fechaReservacion = ?, horaReservacion = ?, cliente_id = ?, servicio_id = ? WHERE id = ?",
            [fechaReservacion, horaReservacion, cliente_id, servicio_id, id]
          );
          callback(null, { result: "Cita actualizada correctamente" });
        } catch (error) {
          callback(error);
        }
      },
      deleteCitas: async function (args, callback) {
        try {
          const { id } = args;
          const result = await db.query("UPDATE citas SET estado = 0 WHERE id = ?", [id,]);
          callback(null, { result: "Cita eliminada correctamente" });
        } catch (error) {
          callback(error);
        }
      },
    },
  },
};

module.exports = citasController;
