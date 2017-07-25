angular.
module('categoryView',[]).
component('categoryView', {
    templateUrl: 'category-view/category-view.template.html',
    controller: function categoryViewControler($http){
        var store = this;
        store.list=[];
        store.selectedCategory={};



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