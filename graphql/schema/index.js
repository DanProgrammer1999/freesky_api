import { buildSchema } from "graphql";

module.exports = buildSchema(`
  type UAV {
    _id: ID!
    serial_id: String!
    model: String!
    owner: Owner!
  }

  type Owner {
    _id: ID!
    email: String
    password: String!
    first_name: String!
    last_name: String!
    address: String!
    phone_number: String!
    uavs: [UAV]    
  }

  type Controller {
    _id: ID!
    email: String
    password: String!
    first_name: String!
    last_name: String!
    paternal_name: String
    address: String
    passport: String!
    uavs: [UAV!]
    credentials: UserCredentials!
  }

  input UAVParams {
    serial_id: String!
    model: String!
    owner: String!
  }

  input OwnerParams {
    email: String
    password: String!
    first_name: String!
    last_name: String!
    address: String!
    phone_number: String!
  }

  input ControllerParams {
    email: String
    password: String!
    first_name: String!
    last_name: String!
    paternal_name: String
    address: String
    passport: String!
    credentials: UserCredentials!
  }

  type RootQuery {
    uavs: [UAV!]!
    owners: [Owner!]!
    controller: [Controller!]!
  }

  type RootMutation {
    createUAV(uavInput: UAVParams): UAV
    createOwner(ownerInput: OwnerParams): Owner
    createController(controllerInput: ControllerParams): Controller
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
