import { vuelo, vueloModel } from "./tps.ts";


export const fromModelToFlight = (model: vueloModel): vuelo => ({
    id: model._id!.toString(),
    Origen: model.Origen,
    Destino: model.Destino,
    Fecha: model.Fecha,
  });