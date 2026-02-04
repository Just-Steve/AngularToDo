angular.module('myApp')
  .component('todoApp', {
    templateUrl: 'template.html',
    bindings: { 
      title: '@',
      
     },
    controller: function (Service) {
      var c = this;
      c.message ="Welcome to your todo list... add, edit and save your work plans..."

      c.todos = Service.getTodos();
      c.filter = 'all';
      c.editingTodo = null;
      c.editText = '';

      c.refresh = function () {
        c.filteredTodos = Service.getFilteredTodos(c.filter);
        c.remaining = Service.getRemainingCount();
        c.completed = Service.getCompletedCount();
      };

      c.addTodo = function () {
        if (c.newTodo && c.newTodo.trim()) {
          Service.addTodo(c.newTodo);
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
          Service.updateTodoText(c.editingTodo, c.editText);
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
        Service.deleteTodo(todo);
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
  });
