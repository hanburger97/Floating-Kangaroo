"use strict";

var express = require('express');
var mongoose = require('mongoose');
var Response = mongoose.model('Responses');
var Postback = mongoose.model('Postbacks');
var router = express.Router();

// Set CRUD

function configCrudForResPos (model) {

    const modelName = model.modelName;

    router.get(`/${modelName}`, function (req, res, next) {
        model.find().sort('trigger').exec(function (error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);

        })
    });

    router.post(`/${modelName}`, function (req, res, next) {
        var newData = {
            id: Math.random(),
            trigger: req.body.trigger,
            response: req.body.response,
            action: req.body.action
        };
        var modelData = new model(newData);
        modelData.save(function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(data)
        });

    });

    router.get(`/${modelName}/:id`, function (req, res) {
        model.findOne({id: req.params.id}).exec(function (error, result) {
            if (error) {
                return next(error)
            } else if (!result) {
                res.sendStatus(404);
            } else {
                res.json(result);

            }


        })
    });

    router.put(`/${modelName}/:id`, function (req, res, next) {
        delete req.body._id;
        model.findOneAndUpdate({id: req.params.id}, {
            trigger: req.body.trigger,
            response: req.body.response,
            action: req.body.action
        }, function (err, data) {
            if (err) {
                next(data)
            }
            res.json(data)

        });
    });
    router.delete(`/${modelName}/:id`, function (req, res, next) {
        model.remove({
            id: req.params.id
        }).exec(function (error) {
            if (error) {
                return next(error)
            }
            res.sendStatus(200);
        })
    });
}

configCrudForResPos(Response);

configCrudForResPos(Postback);

module.exports = router;