var mainController = function ($scope) {
    'use strict';

    var createArray = function () {
        var w = Math.floor(Math.random() * 2) + 4;
        var h = Math.floor(Math.random() * 2) + 4;

        var result = [];
        for (var i=0; i<h; i++) {
            var arr = [];
            for (var j=0; j<w; j++) {
                var r = Math.floor(Math.random() * 2);
                arr.push (r === 0);
            }
            result.push(arr);
        }

        return result;
    };

    var computeRow = function (arr) {
        var result = [];
        for (var i=0; i<arr.length; i++) {
            var cmp = 0;
            var a = [];
            for (var j=0; j<arr[i].length; j++) {
                if (arr[i][j])
                    cmp ++;
                else if (cmp > 0) {
                    a.push (cmp);
                    cmp = 0;
                }
            }
            if (cmp > 0)
                a.push (cmp);
            if (a.length === 0)
                a.push (0);

            result.push (a);
        }

        return result;
    };

    var computeCol = function (arr) {
        var result = [];
        for (var i=0; i<arr[0].length; i++) {
            var cmp = 0;
            var a = [];
            for (var j=0; j<arr.length; j++) {
                if (arr[j][i])
                    cmp ++;
                else if (cmp > 0) {
                    a.push (cmp);
                    cmp = 0;
                }
            }
            if (cmp > 0)
                a.push (cmp);
            if (a.length === 0)
                a.push (0);

            result.push (a);
        }

        return result;
    };

    var createExtendedArray = function (row, col, maxRow, maxCol, painted) {
        var result = [];
        var h = row.length;
        var w = col.length;

        for (var i=0; i<h+maxCol; i++) {
            var l = [];
            for (var j=0; j<w+maxRow; j++) {
                if (i<maxCol && j<maxRow)
                    l.push(-1);
                else if (i<maxCol) {
                    // print col numbers
                    if (maxCol - i > col[j-maxRow].length)
                        l.push(-1)
                    else
                        l.push(col[j-maxRow][i - maxCol + col[j-maxRow].length]);
                }
                else if (j<maxRow) {
                    // print row numbers
                    if (maxRow - j > row[i-maxCol].length)
                        l.push(-1)
                    else
                        l.push(row[i-maxCol][j - maxRow + row[i-maxCol].length]);
                }
                else
                    l.push(painted[i-maxCol][j-maxRow]);
            }
            result.push(l);
        }

        return result;
    };

    var arr = createArray ();
    $scope.row = computeRow (arr);
    $scope.col = computeCol (arr);

    $scope.maxRow = 0;
    $scope.maxCol = 0;
    for (var i=0; i<$scope.row.length; i++)
        if ($scope.row[i].length > $scope.maxRow)
            $scope.maxRow = $scope.row[i].length;
    for (var i=0; i<$scope.col.length; i++)
        if ($scope.col[i].length > $scope.maxCol)
            $scope.maxCol = $scope.col[i].length;

    var logimagePainted = [];
    for (var i=0; i<arr.length; i++) {
        var a = [];
        for (var j=0; j<arr[0].length; j++)
            a.push (false);
        logimagePainted.push (a);
    }
    //$scope.logimageArray = createExtendedArray ($scope.row, $scope.col, $scope.maxRow, $scope.maxCol, arr);
    $scope.logimageArray = createExtendedArray ($scope.row, $scope.col, $scope.maxRow, $scope.maxCol, logimagePainted);

    $scope.clickCase = function (indexX, indexY) {
        if (indexX >= $scope.maxCol && indexY >= $scope.maxRow)
            $scope.logimageArray[indexX][indexY] = !$scope.logimageArray[indexX][indexY];
    };
};

angular.module ('logigame').controller ('mainController', ['$scope', mainController]);
