const express = require('express');
const bodyParser = require('body-parser');
const CollectionConnect = require('../models/collectionConnect');
const passport = require('passport');
const authenticate = require('../authen/authenticate');

const collectionConnectRouter = express.Router();
collectionConnectRouter.use(bodyParser.json());

// Route to create a new CollectionConnect
collectionConnectRouter.post('/', authenticate.verifyUser, (req, res, next) => {
  CollectionConnect.create(req.body)
    .then(collectionConnect => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.json(collectionConnect);
    })
    .catch(err => next(err));
});

// Route to get all CollectionConnects
collectionConnectRouter.get('/', authenticate.verifyUser, (req, res, next) => {
  CollectionConnect.find({})
    .then(collectionConnects => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(collectionConnects);
    })
    .catch(err => next(err));
});


// Route to get CollectionConnects by collectionId
collectionConnectRouter.get('/:id', authenticate.verifyUser, (req, res, next) => {
  CollectionConnect.find({ collectionId: req.params.id })
    .then(collectionConnects => {
      if (collectionConnects && collectionConnects.length > 0) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(collectionConnects);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'CollectionConnect not found' });
      }
    })
    .catch(err => next(err));
});

// Route to delete a CollectionConnect by questionID and CollectionID  //Done
collectionConnectRouter.delete('/delete', authenticate.verifyUser, (req, res, next) => {
  CollectionConnect.findOneAndDelete({ questionId:  req.body.questionId, collectionId: req.body.collectionId })
    .then(collectionConnect => {
      if (collectionConnect) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'CollectionConnect deleted' });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'CollectionConnect not found' });
      }
    })
    .catch(err => next(err));
});

module.exports = collectionConnectRouter;
