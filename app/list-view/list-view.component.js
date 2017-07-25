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

        $http.get('/category').then(function(value){
            store.categories=value;
        }, function(response){
            store.categories=response.status;
        });

        store.selectCategory=function (category){
            store.selectedCategory=category;
        };

        store.isSet=function (category){
            return store.selectedCategory._id===category;
        };

    }
});