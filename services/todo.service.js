(function() {
    'use strict';

    function TodoService() {
        var STORAGE_KEY = 'todos_app';
        var todos = loadFromStorage();

        function loadFromStorage() {
            var data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        }

        function saveToStorage() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }

        this.getTodos = function() {
            return todos;
        };

        this.addTodo = function(text) {
            todos.push({ text: text, completed: false, isEditing: false });
            saveToStorage();
        };

        this.deleteTodo = function(todo) {
            var index = todos.indexOf(todo);
            if (index > -1) {
                todos.splice(index, 1);
                saveToStorage();
            }
        };

        this.updateTodo = function(todo, newText) {
            var index = todos.indexOf(todo);
            if (index > -1 && newText.trim()) {
                todos[index].text = newText.trim();
                todos[index].isEditing = false;
                saveToStorage();
            }
        };

        this.getRemainingCount = function() {
            return todos.filter(t => !t.completed).length;
        };

        this.getCompletedCount = function() {
            return todos.filter(t => t.completed).length;
        };

        this.getFilteredTodos = function(filter) {
            if (filter === 'active') return todos.filter(t => !t.completed);
            if (filter === 'completed') return todos.filter(t => t.completed);
            return todos;
        };
    }

    TodoService.$inject = [];
    angular.module('myApp').service('TodoService', TodoService);
})();
