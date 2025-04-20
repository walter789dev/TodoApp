import "dotenv/config";
import { connect } from "mongoose";
import express from "express";
import tasks from "./routes/tasks.js";
import sprints from "./routes/sprints.js";
import backlog from "./routes/backlog.js";

connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });

const app = express();

app.use(express.json());

app.use("/tasks", tasks);
app.use("/sprints", sprints);
app.use("/backlog", backlog);

app.get("/", (_, res) => {
  res.send("Aplicacion funcionando");
});

app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));