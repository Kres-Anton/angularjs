angular.
module('core').
filter('category', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});