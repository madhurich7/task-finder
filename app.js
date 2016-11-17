var app = angular.module('taskApp', ['ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
			.when('/', {
				templateUrl: 'views/tasks.html',
				controller: 'tasksDisplayCtrl'
			})
			.when('/edittask/:id', {
				templateUrl: 'views/editTask.html',
				controller: 'editTaskCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
}]);