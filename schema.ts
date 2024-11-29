export const schema = `#grapql

type Vuelo {
  id: ID!
  Origen: String!
  Destino: String!
  Fecha: String!
}

type Query {
  getFlights(origen: String, destino: String): [Vuelo!]!
  getFlight(id: ID!): Vuelo
}

type Mutation {
  addFlight(origen: String!, destino: String!, fecha: String!): Vuelo!
}`