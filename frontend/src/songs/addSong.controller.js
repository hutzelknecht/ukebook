"use strict";
angular.module('ukebook')
	.controller('AddSongCtrl', function($songs) {
		this.title = '';
		this.addSong = $songs.create;
	});
