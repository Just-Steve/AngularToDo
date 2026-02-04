(function () {
    'use strict';

    function TodoController(TodoService) {
        var c = this;
        c.todos = [];
        c.filteredTodos = [];
        c.filter = 'all';
        c.editingTodo = null;
        c.editText = '';
        c.newTodo = '';
        c.message = "Welcome to your todo list... add, edit, and save your work plans...";

        c.refresh = function () {
            c.todos = TodoService.getTodos();
            c.filteredTodos = TodoService.getFilteredTodos(c.filter);
            c.remaining = TodoService.getRemainingCount();
            c.completed = TodoService.getCompletedCount();
        };

        c.addTodo = function () {
            if (c.newTodo && c.newTodo.trim()) {
                TodoService.addTodo(c.newTodo);
                c.newTodo = '';
                c.refresh();
            }
        };

        c.startEdit = function (todo) {
            c.editingTodo = todo;
            c.editText = todo.text;
        };

        c.saveEdit = function () {
            if (c.editingTodo) {
                TodoService.updateTodo(c.editingTodo, c.editText);
                c.editingTodo = null;
                c.editText = '';
                c.refresh();
            }
        };

        c.cancelEdit = function () {
            c.editingTodo = null;
            c.editText = '';
        };

        c.delete = function (todo) {
            TodoService.deleteTodo(todo);
            c.refresh();
        };

        c.setFilter = function (filter) {
            c.filter = filter;
            c.refresh();
        };

        c.$onInit = function () {
            c.refresh();
        };
    }

    TodoController.$inject = ['TodoService'];

    angular.module('myApp').component('todoApp', {
        templateUrl: 'templates/todo.template.html',
        controller: TodoController,
        bindings: {
            title: '@'
        }
    });
})();
