import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import path from 'path';

import graphQlSchema from '../graphql/schema/index';
import graphQlResolvers from '../graphql/resolvers/index';
import config from '../config/config';

const app = express();

const pages_dir = path.join(path.dirname(require.main.filename), '../pages');

app.use(bodyParser.json());

app.use(
  `/${config.ROOT_ENDPOINT}/${config.API_VERSION}/${config.GRAPHQL_ENDPOINT}`,
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(config.DATABASE_CLUSTER_URL, { useNewUrlParser: true })
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => {
    throw err;
  });

app.get('*', (_, res) => {
  res.sendFile(path.join(pages_dir, '404.html'));
});