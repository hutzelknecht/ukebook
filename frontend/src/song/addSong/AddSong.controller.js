"use strict";
angular.module('ukebook')
	.controller('AddSongCtrl', function(songApi) {
		this.title = '';
		this.addSong = songApi.create;
	});
