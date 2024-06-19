const express = require('express');
const bodyParser = require('body-parser');
const Collection = require('../models/Collection');
const passport = require('passport');
const authenticate = require('../authen/authenticate');

const collectionRouter = express.Router();
collectionRouter.use(bodyParser.json());

// Route to create a new collection  //Done
collectionRouter.post('/', authenticate.verifyUser, (req, res, next) => {
  const newCollection = new Collection({
    userId: req.user._id,
    name: req.body.name,
    numberOfQuestion: req.body.numberOfQuestion,
    price: req.body.price
  });

  newCollection.save()
    .then(collection => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.json(collection);
    })
    .catch(err => next(err));
});

// Route to get all collections of the authenticated admin  //Done
collectionRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Collection.find({})
    .then(collections => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(collections);
    })
    .catch(err => next(err));
});

// Route to get a specific collection by ID //Done
collectionRouter.get('/:id', authenticate.verifyUser, (req, res, next) => {
  Collection.find({ userId: req.params.id })
    .then(collection => {
      if (collection) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(collection);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Collection not found' });
      }
    })
    .catch(err => next(err));
});

// Route to update a collection by ID //Done
collectionRouter.put('/:id', authenticate.verifyUser, (req, res, next) => {
    Collection.findOneAndUpdate(
      { userId:  req.params.id, _id: req.body._id },
      { $set: req.body },
      { new: true }
    )
      .then(collection => {
        if (collection) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(collection);
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.json({ error: 'Collection not found' });
        }
      })
      .catch(err => next(err));
  });
  

// Route to delete a collection by ID   //Done
collectionRouter.delete('/:id', authenticate.verifyUser, (req, res, next) => {
  Collection.findOneAndDelete({ userId:  req.params.id, _id: req.body._id })
    .then(collection => {
      if (collection) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Collection deleted' });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Collection not found' });
      }
    })
    .catch(err => next(err));
});

module.exports = collectionRouter;
