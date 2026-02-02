var app = angular.module('myApp', []);

app.controller('work', function ($scope) {
    $scope.message = "Welcome to your todo list app"
    //store
    $scope.todos = JSON.parse(localStorage.getItem('todos')) || [];
    $scope.newTodo = '';
    $scope.filter = 'all';

    //add
    $scope.addTodo = function () {
        if ($scope.newTodo.trim()) {
            $scope.todos.push({
                text: $scope.newTodo.trim(),
                completed: false
            });
            $scope.newTodo = '';
            $scope.saveTodos();
        }
    };
     //delete
    $scope.deleteTodo = function (index) {
        var filteredTodos = $scope.getFilteredTodos();

        $scope.saveTodos();
    };
      //save
    $scope.saveTodos = function () {
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
      //active
    $scope.getRemainingCount = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.completed;
        }).length;
    };
     //completed
    $scope.getCompletedCount = function () {
        return $scope.todos.filter(function (todo) {
            return todo.completed;
        }).length;
    };
     //filter
    $scope.setFilter = function (filter) {
        $scope.filter = filter;
    };

    $scope.getFilteredTodos = function () {
        switch ($scope.filter) {
            case 'active':
                return $scope.todos.filter(function (todo) {
                    return !todo.completed;
                });
            case 'completed':
                return $scope.todos.filter(function (todo) {
                    return todo.completed;
                });
            default:
                return $scope.todos;
        }
    };

})
