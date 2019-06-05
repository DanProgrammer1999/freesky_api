import { buildSchema } from "graphql";

module.exports = buildSchema(`
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

  type RootQuery {
    uavs: [UAV!]!
    uav_models: [UAVModel!]!
    user_credentials: [UserCredentials!]!
    user_identities: [UserIdentity!]!
  }

  type RootMutation {
    createUAV(uavInput: UAVParams): UAV
    createUAVModel(uavModelInput: UAVModelParams): UAVModel
    createCredentials(credentialsInput: CredentialsParams): UserCredentials
    createIdentity(identityInput: IdentityParams): UserIdentity
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
