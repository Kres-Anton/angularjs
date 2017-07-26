angular.
module('categoryView',[]).
component('categoryView', {
    templateUrl: 'category-view/category-view.template.html',
    controller: function categoryViewControler($http,$scope){
        var store = this;
        store.categories=[];

        $http.get('/category').then(function(value){
            store.categories=value;
        }, function(response){
            store.categories=response.status;
        });

        store.selectCategory=function (category){
            $scope.$parent.$ctrl.selectedCategory=category ;
        };



    }
});