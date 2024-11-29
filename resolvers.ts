import { Collection, ObjectId } from "mongodb";

import { vuelo, vueloModel } from "./tps.ts";
import { fromModelToFlight } from "./utls.ts";

export const resolvers = {
    Query: {
      getFlight: async (_: unknown, args: { id: string }, context: {flights: Collection<vueloModel>},
      ): Promise<vuelo | null> => {
        const id = args.id;
        const flightmodel = await context.flights.findOne({
            _id: new ObjectId(id),
          });

          if (!flightmodel) {
            return null;
          }

          return fromModelToFlight(flightmodel);
      }
      
    },

    getFlights: async (
        _: unknown,
        args: { origen: string; destino: string },
        context: {flights: Collection<vueloModel>},
      ): Promise<vuelo[]> => {
        const { origen, destino } = args;

        if(origen && destino){
            const flightmodel = await context.flights
        .find({ Origen: origen, Destino: destino })
        .toArray();

        return flightmodel.map((e) =>
            fromModelToFlight(e));

        } else if(origen && !destino){
            const flightmodel = await context.flights
        .find({ Origen: origen })
        .toArray();

        return flightmodel.map((e) =>
            fromModelToFlight(e));
        }

        const flightmodel = await context.flights.find().toArray();
        return flightmodel.map((e) =>
        fromModelToFlight(e)
      );
    },

    Mutation: {
        addFlight: async (
          _: unknown,
          args: { origen: string; destino: string; fecha: string },
          context: {
            flights: Collection<vueloModel>;
          },
        ): Promise<vuelo> => {
          const { origen, destino, fecha } = args;
          const { insertedId } = await context.flights.insertOne({
            Origen: origen,
            Destino: destino,
            Fecha: fecha,
          });
          const flightmodel = {
            _id: insertedId,
            Origen: origen,
            Destino: destino,
            Fecha: fecha,
          };
          return fromModelToFlight(flightmodel!);
        },
    },
};
