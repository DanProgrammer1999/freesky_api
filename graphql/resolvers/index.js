/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import bcrypt from "bcryptjs";

import responseHelper from "../../helpers/response-helper";
import UAV from "../../models/uav";
import Owner from "../../models/users/owner";
import Controller from "../../models/users/controller";

const uavs = uavIds => {
  return UAV.find({ _id: { $in: uavIds } })
    .then(uavObjects =>
      uavObjects.map(uav => ({
        ...uav._doc,
        _id: uav.id,
        owner_id: find_owner.bind(this, uav.owner_id)
      }))
    )
    .catch(err => {
      throw err;
    });
};

const find_owner = ownerId => {
  return Owner.findById(ownerId)
    .then(user => ({
      ...user._doc,
      _id: user.id,
      uavs: uavs.bind(this, user._doc.uavs)
    }))
    .catch(err => {
      throw err;
    });
};

module.exports = {
  uavs: () =>
    UAV.find()
      .then(listOfUAVs =>
        listOfUAVs.map(uav => ({
          ...uav._doc,
          _id: uav.id,
          creator: find_owner.bind(this, uav._doc.owner)
        }))
      )
      .catch(err => {
        throw err;
      }),
  controllers: () =>
    Controller.find()
      .then(controller =>
        controller.map(controller => ({
          ...controller._doc,
          _id: controller._doc._id.toString()
        }))
      )
      .catch(err => {
        throw err;
      }),
  owners: () =>
    Owner.find()
      .then(owners =>
        owners.map(owner => ({
          ...owner._doc,
          _id: owner._doc._id.toString(),
          uavs: uavs.bind(this, owner._doc.uavs)
        }))
      )
      .catch(err => {
        throw err;
      }),
  createUAV: args => {
    const uav = new UAV({
      serial_id: args.uavInput.serial_id,
      model: args.uavInput.model,
      owner: args.uavInput.owner
    });
    let createdUAV;
    return uav
      .save()
      .then(result => {
        createdUAV = {
          ...result._doc,
          _id: result._doc._id.toString(),
          owner: find_owner.bind(this, result._doc.owner)
        };
        return Owner.findById(result._doc.owner);
      })
      .then(user => {
        if (!user) {
          throw new Error(responseHelper.OWNER_DOESNT_EXIST);
        }
        user.uavs.push(uav);
        return user.save();
      })
      .then(_ => createdUAV)
      .catch(err => {
        throw err;
      });
  },
  createController: args => {
    return Controller.findOne({ email: args.controllerInput.email })
      .then(user => {
        if (user) {
          throw new Error(responseHelper.CONTROLLER_ALREADY_EXISTS);
        }
        return bcrypt.hash(args.controllerInput.password, 12);
      })
      .then(hashPassword => {
        const contr = new controller({
          email: args.controllerInput.email,
          password: hashPassword,
          first_name: args.controllerInput.first_name,
          last_name: args.controllerInput.last_name,
          address: args.controllerInput.address,
          phone_number: args.controllerInput.phone_number
        });
        return contr.save();
      })
      .then(result => ({
        ...result._doc,
        _id: result._doc._id.toString()
      }))
      .catch(err => {
        throw err;
      });
  },
  createOwner: args => {
    return Owner.findOne({ email: args.ownerInput.email })
      .then(user => {
        if (user) {
          throw new Error(responseHelper.OWNER_ALREADY_EXISTS);
        }

        return bcrypt.hash(args.ownerInput.password, 12);
      })
      .then(hashPassword => {
        const owner = new Owner({
          email: args.ownerInput.email,
          password: hashPassword,
          first_name: args.ownerInput.first_name,
          last_name: args.ownerInput.last_name,
          address: args.ownerInput.address,
          phone_number: args.ownerInput.phone_number
        });
        return owner.save();
      })
      .then(result => ({
        ...result._doc,
        _id: result._doc._id.toString()
      }))
      .catch(err => {
        throw err;
      });
  }
};
