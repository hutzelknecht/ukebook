"use strict";
angular.module('ukebook')
	.directive('addSong', function() {
		return {
			templateUrl: 'song/addSong/addSong.template.html',
			controller: 'AddSongCtrl',
			controllerAs: 'ctrl'
		};
	});
