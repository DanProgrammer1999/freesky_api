import nodemon from "../nodemon.json";

export default {
  ROOT_ENDPOINT: "api",
  API_VERSION: "v1",
  GRAPHQL_ENDPOINT: "graphql",

  DATABASE_CLUSTER_URL: `mongodb+srv://${
    process.env.MONGO_USER
  }:${
    process.env.MONGO_PASSWORD}@freeskydb-2vrc5.gcp.mongodb.net/${
      process.env.MONGO_DATABASE_NAME_V1}?retryWrites=true`
};
