const Event = require('../models/event');

// function indexRoute(req, res, next) {
//   Event
//     .find()
//     .exec()
//     .then((events) => res.json(events))
//     .catch(next);
// }

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Event
    .create(req.body)
    .then((event) => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      res.json(event);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      Object.assign(event, req.body);
      return event.save();
    })
    .then((event) => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      return event.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      const comment = event.comments.create(req.body);
      event.comments.push(comment);

      return event.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      const comment = event.comments.id(req.params.commentId);
      comment.remove();

      return event.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addItemRoute(req, res, next) {

  req.body.createdBy = req.user;

  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      const item = event.items.create(req.body);
      event.items.push(item);

      return event.save()
        .then(() => res.json(item));
    })
    .catch(next);
}

function deleteItemRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      const item = event.items.id(req.params.itemId);
      item.remove();

      return event.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  // index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute,
  addItem: addItemRoute,
  deleteItem: deleteItemRoute
};