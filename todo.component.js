angular.module('myApp')
    .component('todoApp', {
        template: `
    <div class="container">
      <div class="header">
        <h1><u>{{$ctrl.title}}</u></h1>
        <h2>{{$ctrl.message}}</h2>
      </div>

      <form ng-submit="$ctrl.addTodo()" class="input-group">
        <input type="text" ng-model="$ctrl.newTodo" placeholder="Write your todo" required>
        <button type="submit" ng-disabled="!$ctrl.newTodo">Add Task</button>
      </form>

      <div class="stats" ng-show="$ctrl.todos.length">
        <div>Total: {{$ctrl.todos.length}}</div>
        <div>Active: {{$ctrl.remaining}}</div>
        <div>Completed: {{$ctrl.completed}}</div>
      </div>

      <div class="todo-list">
        <p ng-show="!$ctrl.filteredTodos.length">
          <b>No task found, add one above... </b>
          <b ng-if="$ctrl.filter !== 'all'">No {{$ctrl.filter}} tasks</b>
        </p>

        <div ng-repeat="todo in $ctrl.filteredTodos track by $index" class="todo-item" ng-class="{completed: todo.completed}">
          <input type="checkbox" ng-model="todo.completed" ng-change="$ctrl.refresh()">
          <span>{{todo.text}}</span>
          <button ng-click="$ctrl.delete(todo)">Delete</button>
        </div>
      </div>

      <div class="filter-section" ng-show="$ctrl.todos.length">
        <button ng-click="$ctrl.setFilter('all')" ng-class="{active: $ctrl.filter==='all'}">All</button>
        <button ng-click="$ctrl.setFilter('active')" ng-class="{active: $ctrl.filter==='active'}">Active</button>
        <button ng-click="$ctrl.setFilter('completed')" ng-class="{active: $ctrl.filter==='completed'}">Completed</button>
      </div>
    </div>
  `,
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
