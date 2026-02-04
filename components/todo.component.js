(function() {
    'use strict';

    function TodoController(TodoService) {
        var vm = this;
        vm.todos = [];
        vm.filteredTodos = [];
        vm.filter = 'all';
        vm.editingTodo = null;
        vm.editText = '';
        vm.newTodo = '';
        vm.message = "Welcome to your todo list... add, edit, and save your work plans...";

        vm.refresh = function() {
            vm.todos = TodoService.getTodos();
            vm.filteredTodos = TodoService.getFilteredTodos(vm.filter);
            vm.remaining = TodoService.getRemainingCount();
            vm.completed = TodoService.getCompletedCount();
        };

        vm.addTodo = function() {
            if (vm.newTodo && vm.newTodo.trim()) {
                TodoService.addTodo(vm.newTodo);
                vm.newTodo = '';
                vm.refresh();
            }
        };

        vm.startEdit = function(todo) {
            vm.editingTodo = todo;
            vm.editText = todo.text;
        };

        vm.saveEdit = function() {
            if (vm.editingTodo) {
                TodoService.updateTodo(vm.editingTodo, vm.editText);
                vm.editingTodo = null;
                vm.editText = '';
                vm.refresh();
            }
        };

        vm.cancelEdit = function() {
            vm.editingTodo = null;
            vm.editText = '';
        };

        vm.delete = function(todo) {
            TodoService.deleteTodo(todo);
            vm.refresh();
        };

        vm.setFilter = function(filter) {
            vm.filter = filter;
            vm.refresh();
        };

        vm.$onInit = function() {
            vm.refresh();
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
