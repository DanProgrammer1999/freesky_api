/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';

import responseHelper from '../../helpers/response-helper';
import UAV from '../../models/uavs/uavs';
import UAVModel from '../../models/uavs/models';
import UserIdentity from '../../models/users/identity';
import UserCredentials from '../../models/users/credentials';
import Flight from '../../models/flights';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const find_uavs = uavIds => {
  return UAV.find({ _id: { $in: uavIds } })
    .then(uavObjects =>
      uavObjects.map(uav => ({
        ...uav._doc,
        _id: uav.id,
        owner: find_identity.bind(this, uav._doc.owner),
        model: find_uav_model.bind(this, uav._doc.model)
      }))
    )
    .catch(err => {
      throw err;
    });
};

const find_uav = uavId =>
  UAV.findById(uavId).then(uav => ({
    ...uav._doc,
    model: find_uav_model.bind(this, uav._doc.model),
    owner: find_identity.bind(this, uav._doc.owner)
  }));

const find_identity = identityId => {
  return UserIdentity.findById(identityId)
    .then(user => ({
      ...user._doc,
      uavs: find_uavs.bind(this, user._doc.uavs),
      credentials: find_credentials.bind(this, user._doc.credentials)
    }))
    .catch(err => {
      throw err;
    });
};

const find_credentials = id => {
  return UserCredentials.findById(id)
    .then(credentials => ({
      ...credentials._doc,
      _id: credentials.id.toString(),
      uavs: find_uavs.bind(this, credentials._doc.uavs)
    }))
    .catch(err => {
      throw err;
    });
};

const find_uav_model = modelId => UAVModel.findById(modelId);

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),

  flights: () =>
    Flight.find().then(flights =>
      flights.map(flight => ({
        ...flight._doc,
        uav: find_uav.bind(this, flight._doc.uav),
        operator: find_identity.bind(this, flight._doc.operator)
      }))
    ),

  uavs: () =>
    UAV.find()
      .then(listOfUAVs =>
        listOfUAVs.map(uav => ({
          ...uav._doc,
          _id: uav.id,
          owner: find_identity.bind(this, uav.owner),
          model: find_uav_model.bind(this, uav.model)
        }))
      )
      .catch(err => {
        throw err;
      }),
  uav_models: () =>
    UAVModel.find().catch(err => {
      throw err;
    }),
  user_identities: () =>
    UserIdentity.find()
      .then(identities =>
        identities.map(data => ({
          ...data._doc,
          _id: data._doc._id.toString(),
          uavs: find_uavs.bind(this, data._doc.uavs),
          credentials: find_credentials.bind(this, data._doc.credentials)
        }))
      )
      .catch(err => {
        throw err;
      }),
  user_credentials: () =>
    UserCredentials.find()
      .then(credentials_list =>
        credentials_list.map(credentials => ({
          ...credentials._doc,
          _id: credentials._doc._id.toString()
        }))
      )
      .catch(err => {
        throw err;
      }),

  createFlight: args => {
    const input = args.flightInput;
    const flight = new Flight(input);

    return flight.save().then(res => ({
      ...res._doc,
      uav: find_uav.bind(this, input.uav),
      operator: find_identity.bind(this, input.operator)
    }));
  },

  createUAV: args => {
    const uav = new UAV({
      serial_number: args.uavInput.serial_number,
      color: args.uavInput.color,
      photo_ability: args.uavInput.photo_ability,
      model: args.uavInput.model,
      owner: args.uavInput.owner
    });
    let createdUAV;
    return uav
      .save()
      .then(result => {
        createdUAV = {
          ...result._doc,
          owner: find_identity.bind(this, result._doc.owner),
          model: find_uav_model.bind(this, result._doc.model)
        };
        return UserIdentity.findById(result._doc.owner);
      })
      .then(user => {
        user.uavs.push(uav);
        return user.save();
      })
      .then(_ => createdUAV)
      .catch(err => {
        throw err;
      });
  },
  createUAVModel: args => {
    return new UAVModel({
      producer: args.uavModelInput.producer,
      model: args.uavModelInput.model,
      uav_type: args.uavModelInput.uav_type,
      engine_type: args.uavModelInput.engine_type,
      fuel_type: args.uavModelInput.fuel_type,
      size: args.uavModelInput.size,
      weight: args.uavModelInput.weight
    }).save();
  },
  createCredentials: args => {
    const input = args.credentialsInput;
    return UserCredentials.findOne({ email: input.email })
      .then(credentials => {
        if (credentials) {
          throw new Error(responseHelper.CREDENTIALS_ALREADY_EXIST);
        }

        return bcrypt.hash(input.password, 9);
      })
      .then(hashPassword => {
        const newCredentials = new UserCredentials({
          email: input.email,
          phone_number: input.phone_number,
          password: hashPassword
        });

        return newCredentials.save();
      });
  },
  createIdentity: args => {
    const input = args.identityInput;

    const identity = new UserIdentity({
      first_name: input.first_name,
      last_name: input.last_name,
      paternal_name: input.paternal_name,
      address: input.address,
      passport: input.passport,
      credentials: input.credentials
    });

    return identity.save().then(result => {
      UserCredentials.findById(input.credentials, (_, credentials) => {
        credentials.identity = result.id;
        credentials.save();
      });

      return {
        ...identity._doc,
        credentials: find_credentials.bind(this, input.credentials)
      };
    });
  }
};
