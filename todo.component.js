angular.module('myApp')
  .component('todoApp', {
    templateUrl: 'template.html',
    bindings: { title: '@' },
    controller: function (Service) {
      var c = this;
      c.message = "Welcome to your todo list app";
      c.todos = Service.getTodos();
      c.filter = 'all';

      c.refresh = function () {
        c.filteredTodos = Service.getFilteredTodos(c.filter);
        c.remaining = Service.getRemainingCount();
        c.completed = Service.getCompletedCount();
      };

      c.addTodo = function () {
        if (c.newTodo && c.newTodo.trim()) {
          Service.addTodo(c.newTodo.trim());
          c.newTodo = '';
          c.refresh();
        }
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
