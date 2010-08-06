var models = require('./models'),
    Entry = models.Entry,
    Author = models.Author, 
    wilson = require('wilson'),
    shortcuts = wilson.shortcuts,
    renderToResponse = shortcuts.renderToResponse,
    getObjectOr404 = shortcuts.getObjectOr404;

exports.author_list = function(request, response) {
    Author.objects.all(function(objects) {
        renderToResponse(request, response)('blog/author_list.html', {
            'author_list':objects
        });
    });
};

exports.author_entries = function(request, response, author_slug) {
    getObjectOr404(response)(Author, {'username':author_slug}, function(author) {
        renderToResponse(request, response)('blog/author_entries.html', {
            'author':author,
        });
    });
};

exports.detail_view = function(request, response, year, month, day, slug) {
    getObjectOr404(response)(Entry, {'slug':slug}, function(entry) {
        renderToResponse(request, response)('blog/entry_detail.html', {'entry':entry});
    });
};

exports.list_view = function(request, response) {
    Entry.objects.filter({}).limit(5).all(function(objects) {
        renderToResponse(request, response)('blog/entry_list.html', {'entry_list':objects});
    });    
};

