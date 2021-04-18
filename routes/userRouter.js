const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const Users = require('../models/users');
const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
    .get((req,res,next) => {
        Users.find({})
            .then((users) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyuserSchema,(req, res, next) => {
        Users.create(req.body)
            .then((user) => {
                console.log('User Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyuserSchema,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /users');
    })
    .delete(authenticate.verifyuserSchema,(req, res, next) => {
        Users.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

userRouter.route('/:userId')
    .get((req,res,next) => {
        Users.findById(req.params.userId)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyuserSchema,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /users/'+ req.params.userId);
    })
    .put(authenticate.verifyuserSchema,(req, res, next) => {
        Users.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyuserSchema,(req, res, next) => {
        Users.findByIdAndRemove(req.params.userId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = userRouter;