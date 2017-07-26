angular.
module('listView',[]).
component('listView', {
    templateUrl: 'list-view/list-view.template.html',
    controller: function listViewControler($http){
        var store = this;
        store.list=[];
        store.selectedCategory={};

        $http.get('/recipte').then(function(value){
            store.list=value;
        }, function(response){
            store.list=response.status;

        });
    }
});