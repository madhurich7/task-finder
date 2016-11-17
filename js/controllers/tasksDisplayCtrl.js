app.controller('tasksDisplayCtrl', ['$scope', '$http','$location', function($scope, $http, $location){
	//to disply tasks
	$http.get('http://rest.learncode.academy/api/johnbob/r2-1').success(function(data){
		$scope.tasks = data;
	});

	//adding tasks 
	$scope.addTask = function(){
		//to avoid adding empty tasks
		 if((!$scope.subject || $scope.subject === "") || ($scope.isCompleted === "")) {
		 		$scope.error = "enter a valid task";
    			return;
    		}

		var data = {
			subject: $scope.subject,
			isCompleted: $scope.isCompleted,
			id: $scope.tasks.length + 1
		}

		$http.post('http://rest.learncode.academy/api/johnbob/r2-1', data).success(function(data, status){
			console.log(status);
			console.log(data);
			if(status == 200){
				$scope.message = "task added successfully, reload the page to see the effect";
			}else{
				$scope.error = "task is not added";
			}
		});

		$scope.isCompleted = " ";
		$scope.subject = " ";
		/*$location.path('https://localhost:8080');*/
		
	};
		//removing task, you need to pass in the id of the object to remove it, that is done by
		//passing the object's id from the view to the controller(check how it's passed in the view)
		$scope.removeTask = function(id){
		$http.delete('http://rest.learncode.academy/api/johnbob/r2-1/'+ id).success(function(data, status){
			console.log(data);
			console.log(status);
			if(status == 200){
				$scope.message = "task removed successfully, reload the page to see the effect";
			}else{
				$scope.error = "task is not removed";
			}
		});
		
		/*$location.path('https://localhost:8080');*/
	};

	//to make use of double click
	$scope.redirect = function(id){
		var url = '#/edittask/' + id;
		window.location = url;
		//this takes you to the url when redirect function is invoked on double clicking
		//check this out "http://stackoverflow.com/questions/24857822/how-to-redirect-one-html-page-to-another-using-button-click-event-in-angularjs"
	};



}]);

//edit task's controller
app.controller('editTaskCtrl', ['$scope','$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){
	console.log('guitarId : ' + $routeParams.id)
	$http.get('http://rest.learncode.academy/api/johnbob/r2-1/' +$routeParams.id).success(function(data){
		$scope.task = data;//Remember this stores individual tasks from the JSON into task
		console.log($scope.task);
	});

		//to edit the task
		$scope.editTask = function(id){
		var data = {
			subject: $scope.task.subject,
			isCompleted: $scope.task.isCompleted,
			id: $scope.task.id
			
		};
		//to update the data you need to pass in the id of that particular item and also the
		//updated data
		$http.put('http://rest.learncode.academy/api/johnbob/r2-1/'+$routeParams.id, data).success(function(data, status){
			console.log(status);
			console.log(data);

			if(status == 200){
				$scope.message = "task updated successfully click \"Go Back\" to watch it";
			}else{
				$scope.error = "task is not updated";
			}
		});
		/*$location.path('https://localhost:8080');*/
		//you used $location to automatically reload without manual reloading but the messages you
		//wrote will not be displayed so you commented it
	};

}]);

