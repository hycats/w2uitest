var mymodule = angular.module('myApp', ['ngSanitize']);

mymodule.controller('MyController', ['$scope', function ($scope) {
    $scope.tablist = [
        { id: 'tab_top', caption: 'Top' },
        { id: 'tab_kakeibo', caption: '家計簿' },
        { id: 'tab_graph', caption: 'グラフ' },
        { id: 'tab_setting', caption: '設定' }
    ];

    $scope.grid_config = {
        name: 'grid',
        header: 'List of Names',
        //multiSearch: true,
        show: {
            toolbar: true,
            footer: true,
            toolbarReload: false,
            toolbarColumns: false
            //toolbarSearch: true
        },
        searches: [
            { field: 'sdate', caption: 'date', type: 'date' }
        ],
        columns: [
            { field: 'sdate', caption: '日付', size: '80px', render: 'date:yyyy/mm/dd', editable: { type: 'date' } },
            { field: 'fname', caption: '費目', size: '10%' },
            { field: 'lname', caption: '内訳', size: '10%' },
            { field: 'product', caption: '品名', size: '10%' },
            { field: 'check', caption: '済', editable: { type: 'checkbox' }, size: '30px' },
            { field: 'income', caption: '収入', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'outgo', caption: '支出', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'balance', caption: '残高', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'email', caption: '備考', size: '30%' },
        ],
        records: [
            { recid: 1, sdate: "01/12/2017", fname: "Peter", lname: "Jeremia", income: 1000 },
            { recid: 2, fname: "Bruce", lname: "Wilkerson" }
        ]
    }
}]);

mymodule
    .directive('myTab2', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                name: '@',
                active: '=',
                tabs: '='
            },
            link: function (scope, element, attrs) {
                element.w2tabs({
                    name: scope.name,
                    active: scope.active,
                    tabs: scope.tabs
                });
            }
        }
    });

mymodule
    .directive('myToolbar', function () {
        return {
            link: function (scope, element, attrs) {
                $('#' + attrs.id).w2toolbar({
                    name: 'myToolbar',
                    items: [
                        { type: 'html', id: 'item1', html: '<input id="id_item1">' }
                    ],
                    onRefresh: function (event) {
                        console.log('object' + event.target + ' is refreshed');
                        if (event.target == 'item1') {
                            // w2field in toolbar must be initialized during refresh
                            // see: https://github.com/vitmalina/w2ui/issues/886
                            event.onComplete = function (ev) {
                                $("#id_item1").w2field('date', { format: 'd.m.yyyy' });
                            };
                        }
                    }
                });
            }
        }
    });

mymodule
    .directive('myTable2', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                config: '='
            },
            link: function (scope, element, attrs) {
                element.w2grid(scope.config);
            }
        }
    });
