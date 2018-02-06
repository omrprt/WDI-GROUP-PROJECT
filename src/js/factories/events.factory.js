angular
  .module('bringItApp')
  .factory('Event', Event)
  .factory('EventComment', EventComment)
  .factory('EventItem', EventItem);

Event.$inject = ['$resource', 'API'];
function Event($resource, API){
  return $resource(`${API}/events/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}



EventItem.$inject = ['$resource', 'API'];
function EventItem($resource, API) {
  return new $resource(`${API}/events/:eventId/items`, { eventId: '@id' }, {
  });
}

EventComment.$inject = ['$resource'];
function EventComment($resource) {
  // eventId comes from the addComment() function in show.controller
  // could probably inject the API in here too
  return new $resource('/api/events/:eventId/comments/:id', { id: '@id' }, {
    // if update is run, it sends this to the back-end (routes.js)
    update: { method: 'PUT' }
  });
}
