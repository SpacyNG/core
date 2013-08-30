/*
 * ownCloud - Core
 *
 * @author Raghu Nayyar
 * @copyright 2013 Raghu Nayyar <raghu.nayyar.007@gmail.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

usersmanagement.controller('prioritygroupController',
	['$scope', '$routeParams', 'GroupService', 'UserService',
	function($scope, $routeParams, GroupService, UserService){

	}
]);

/* Controller for Creating Groups - Left Sidebar */

usersmanagement.controller('creategroupController',
	['$scope', '$http', 'GroupService',
	function($scope, $http, GroupService) {
		var newgroup = {};
		$scope.savegroup = function() {
			GroupService.creategroup().save({ groupname : $scope.newgroup });
			$scope.showgroupinput = false;
			$scope.showbutton = true;
			$scope.newgroup = '';
		}
	}
]);

/* Fetches the List of All Groups - Left Sidebar */

usersmanagement.controller('grouplistController',
	['$scope', '$resource', '$routeParams', 'GroupService', 'UserService', 'GroupModel',
	function($scope, $resource, $routeParams, GroupService, UserService, GroupModel) {
		$scope.loading = true;
		$scope.groups = GroupModel.getAll();
		$scope.routeParams = $routeParams;
		GroupService.getAllGroups().then(function(response) {
			$scope.loading = false;

			// Deletes the group.
			$scope.deletegroup = function(group) {
				$scope.groups.splice($scope.groups.indexOf(group), 1);
				GroupService.removegroup(group);
			}
		});
	}
]);

/* Asynchronously creates user */

usersmanagement.controller('addUserController',
	['$scope', '$http', 'UserService', 'GroupService',
	function($scope, $http, UserService, GroupService) {
		var newuser,password = {};
		var groups = [];
		$scope.saveuser = function() {
			UserService.createuser().save({ username : $scope.newuser }, { password : $scope.password }, { group : $scope.selectedgroup });
		}
		// Takes Out all groups for the Chosen dropdown
		$scope.allgroups = GroupService.getByGroupId().get();
	}
]);

usersmanagement.controller('setQuotaController',
	['$scope', 'QuotaService',
	function($scope, QuotaService) {
<<<<<<< HEAD
			
=======
		$scope.quotavalues =[
								{show : '5GB', quotaval : '5gb'},
								{show : '10GB', quotaval : '10gb'},
								{show : '10GB', quotaval : '20gb'},
								//{show : '10 GB', quotaval : 'Unlimited'},
								//{show : 'Custom', quotaval : 'Custom'}
							];
>>>>>>> partially fixes setquota controller and service.
		// Default Quota
		$scope.selectdefaultQuota = function(defaultquota) {
			console.log(defaultquota.quotaval);
			QuotaService.setDefaultQuota(defaultquota.quotaval);
		}
	}
]);

/* Fetches the List of All Users and details on the Right Content */

usersmanagement.controller('userlistController',
	['$scope', 'UserService', 'GroupService', '$routeParams',
	function($scope, UserService, GroupService, $routeParams) {
		$scope.loading = true;
		UserService.getAllUsers().then(function(response) {
			$scope.users = UserService.getUsersInGroup($routeParams.groupId);
			$scope.loading = false;

			/* Takes Out all groups for the Chosen dropdown */

			$scope.allgroups = GroupService.getByGroupId().get();
			
			$scope.updateDisplayName = function(userid,displayname) {
				UserService.updateName().save({ username : userid }, { displayName : displayname })
			}
			
			/* Updates User Quota */
			$scope.updateUserQuota = function(userid,userQuota) {
				QuotaService.setUserQuota(userid,userQuota);
			}
			
			/* Deletes Users */
			$scope.deleteuser = function(user) {
				$scope.users.splice($scope.users.indexOf(user), 1);
				UserService.removeuser(user);
			};
		});
	}
]);
