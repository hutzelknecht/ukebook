"use strict";
angular.module('ukebook')
	.directive('addSong', function() {
		return {
			templateUrl: 'songs/addSong.template.html',
			controller: 'AddSongCtrl',
			controllerAs: 'ctrl'
		};
	});
