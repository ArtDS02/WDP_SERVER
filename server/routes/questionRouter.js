const express = require('express');
const bodyParser = require('body-parser');
const Question = require('../models/question');
const passport = require('passport');
const authenticate = require('../authen/authenticate');

const questionRouter = express.Router();
questionRouter.use(bodyParser.json());

// Route to create a new question //Done
questionRouter.post('/', authenticate.verifyUser, (req, res, next) => {
  Question.create(req.body)
    .then(question => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.json(question);
    })
    .catch(err => next(err));
});

// Route to get all questions (Only admin)  //Done
questionRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Question.find({})
    .then(questions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(questions);
    })
    .catch(err => next(err));
});

// Router to get random number of questions by number //Done
questionRouter.get('/random/:number', authenticate.verifyUser, (req, res, next) => {
  Question.find({})
    .then(questions => {
      if (questions) {
        let randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, req.params.number);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(randomQuestions);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Question not found' });
      }
    })
    .catch(err => next(err));
});

// Route to get a specific question by ID //Done
questionRouter.get('/:id', authenticate.verifyUser, (req, res, next) => {
  Question.findById(req.params.id)
    .then(question => {
      if (question) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Question not found' });
      }
    })
    .catch(err => next(err));
});

// Route to update a question by ID //Done
questionRouter.put('/:id', authenticate.verifyUser, (req, res, next) => {
  Question.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(question => {
      if (question) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Question not found' });
      }
    })
    .catch(err => next(err));
});

// Route to delete a question by ID //Done
questionRouter.delete('/:id', authenticate.verifyUser, (req, res, next) => {
  Question.findByIdAndDelete(req.params.id)
    .then(question => {
      if (question) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Question deleted' });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Question not found' });
      }
    })
    .catch(err => next(err));
});

//Router to delete question in Question and Collection which contain questionId by Id
// questionRouter.delete('/delete/:id', authenticate.verify, (req, res, next) => {
  // Question.findByIdAndDelete(req.params.id)
  //   .then(question => {
  //     if (question) {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'application/json');
  //       res.json({ success: true, message: 'Question deleted' });
  //     } else {
  //       res.statusCode = 404;
  //       res.setHeader('Content-Type', 'application/json');
  //       res.json({ error: 'Question not found' });
  //     }
  //   })
  
// });

// Route to add a list of questions
questionRouter.post('/addListQuestion', authenticate.verifyUser, (req, res, next) => {
  Question.insertMany(req.body)
    .then(questions => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.json(questions);
    })
    .catch(err => next(err));
});

module.exports = questionRouter;
