import { buildSchema } from "graphql";

export default buildSchema(`
  
  scalar Date

  type UAV {
    _id: ID!
    serial_number: String!
    model: UAVModel!
    owner: UserIdentity!
  }

  type UAVModel {
    _id: ID!
    producer: String!
    model: String!
    uav_type: String
    engine_type: String
    engines_number: Int
    fuel_type: String
    size: [Float!]!
    weight: Float
  }

  type UserCredentials {
    _id: ID!
    email: String!
    password: String!
    phone_number: String!
    identity: UserIdentity
  }

  type UserIdentity {
    _id: ID!
    first_name: String!
    last_name: String!
    paternal_name: String
    address: String
    passport: String!
    uavs: [UAV!]
    credentials: UserCredentials!
  }

  type Flight {
    _id: ID!
    uav: UAV!
    coordinates: [String!]
    min_height: Float
    max_height: Float
    main_dates: [Date!]
    reserved_dates: [Date!]
    flight_purpose: String
    operator: UserIdentity!
  }

  input UAVParams {
    serial_number: String!
    model: ID!
    owner: ID!
  }

  input UAVModelParams {
    producer: String!
    model: String!
    uav_type: String
    engine_type: String
    engines_number: Int
    fuel_type: String
    size: [Float!]!
    weight: Float
  }

  input CredentialsParams {
    email: String!
    password: String!
    phone_number: String!
  }

  input IdentityParams {
    first_name: String!
    last_name: String!
    paternal_name: String
    address: String
    passport: String!
    credentials: ID!
  }

  input FlightParams {
    uav: ID!
    coordinates: [String!]
    min_height: Float
    max_height: Float
    main_dates: [Date!]
    reserved_dates: [Date!]
    flight_purpose: String
    operator: ID!
  }

  type RootQuery {
    uavs: [UAV!]!
    uav_models: [UAVModel!]!
    user_credentials: [UserCredentials!]!
    user_identities: [UserIdentity!]!
    flights: [Flight!]!
  }

  type RootMutation {
    createUAV(uavInput: UAVParams): UAV
    createUAVModel(uavModelInput: UAVModelParams): UAVModel
    createCredentials(credentialsInput: CredentialsParams): UserCredentials
    createIdentity(identityInput: IdentityParams): UserIdentity
    createFlight(flightInput: FlightParams): Flight
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
