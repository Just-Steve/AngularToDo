angular.module('myApp')
.service('Service', function () {
    var todos = [];

    this.getTodos = function () {
        return todos;
    };

    this.addTodo = function (text) {
        todos.push({ text: text, completed: false });
    };

    this.deleteTodo = function (todo) {
        var index = todos.indexOf(todo);
        if (index > -1) todos.splice(index, 1);
    };

    this.getRemainingCount = function () {
        return todos.filter(td => !td.completed).length;
    };

    this.getCompletedCount = function () {
        return todos.filter(td => td.completed).length;
    };

    this.getFilteredTodos = function (filter) {
        if (filter === 'active') return todos.filter(td => !td.completed);
        if (filter === 'completed') return todos.filter(td => td.completed);
        return todos;
    };
});
