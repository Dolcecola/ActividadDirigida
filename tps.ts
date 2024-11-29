import {type OptionalId} from "mongodb";

export type vueloModel = OptionalId<{
    Origen: string,
    Destino: string,
    Fecha: string,
}>

export type vuelo = {
    id: string,
    Origen: string,
    Destino: string,
    Fecha: string,
};