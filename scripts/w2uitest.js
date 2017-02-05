angular.module('myApp', ['ngSanitize']);

angular.module('myApp').controller('MyController', ['$scope', function($scope){
}]);

angular.module('myApp')
.directive('myTab', function(){
    return {
        //restrict: 'E',
        //replace: true,
        //template: '<div></div>',
        link: function(scope, element, attrs) {
            $('#'+attrs.id).w2tabs({
                name:'tabs',
                active: 'tab1',
                tabs:[
                    { id:'tab_top', caption:'Top' },
                    { id:'tab_kakeibo', caption:'家計簿' },
                    { id:'tab_graph', caption:'グラフ' },
                    { id:'tab_setting', caption:'設定' }
                ]
            });
        }
    }
});

angular.module('myApp')
.directive('myTable', function(){
    return {
        //restrict: 'A',
        //replace: true,
        //template: '<div></div>',
        link: function(scope, element, attrs) {
            $('#'+attrs.id).w2grid({
                name:'grid',
                header:'List of Names',
                multiSearch:true,
                show: {
                    toolbar: true,
                    footer: true,
                    toolbarReload: false,
                    toolbarColumns: false
                    //toolbarSearch: true
                },
                searches: [
                    { field: 'sdate', caption: 'date', type: 'date'}
                ],
                columns:[
                    { field: 'sdate', caption: '日付', size: '80px', render:'date:yyyy/mm/dd', editable: {type: 'date'} },
                    { field: 'fname', caption: '費目', size: '10%' },
                    { field: 'lname', caption: '内訳', size: '10%' },
                    { field: 'product', caption: '品名', size: '10%' },
                    { field: 'check', caption:'済', editable: {type:'checkbox'}, size: '30px' },
                    { field: 'income', caption: '収入', render:'int', editable: {type:'int'}, size: '10%' },
                    { field: 'outgo', caption: '支出', render:'int', editable: {type:'int'}, size: '10%' },
                    { field: 'balance', caption: '残高', render:'int', editable: {type:'int'}, size: '10%' },
                    { field: 'email', caption: '備考', size: '30%' },
                ],
                records:[
                    { recid: 1, sdate:"01/12/2017", fname:"Peter", lname:"Jeremia", income:1000 },
                    { recid: 2, fname:"Bruce", lname:"Wilkerson"}
                ]
            });
            
        }
    }
});
