const FollowToggle = require('./follow_toggle.js');

$(function() {
    $('button.followToggle').each((i, search) => new UsersSearch(search));
});