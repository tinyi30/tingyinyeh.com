//@prepros-prepend matchmedia-ng.js

angular.module('tingyinyeh', ['matchmedia-ng'])

.factory('getProjects', function($http) {
	return (cache = true) => {
		return $http.get('../projects.json', { cache }).then(res => res.data);
	};
})

.controller('PGridCtrl', function(getProjects, matchmedia) {
	const queryTablet = 'only screen and (max-width: 992px)';

	this.projects = null;
	this.imagesPath = null;
	this.projectsTop = null;  // display projects top
	this.projectsBottom = null;  // display projects bottom

	this.getSrcset = (cover, imagesPath) => {
		return `${imagesPath}${cover}.jpg 1x, ${imagesPath}${cover}@2x.jpg 2x`;
	};

	this.updateDisplayProjects = () => {
		if (!this.projects) {
			return;
		}
		if (matchmedia.is(queryTablet)) {
			this.projectsTop = this.projects.slice(0, 2);
			this.projectsBottom = this.projects.slice(2);
		}
		else {
			this.projectsTop = this.projects.slice(0, 4);
			this.projectsBottom = this.projects.slice(4);
		}
	};

	getProjects().then(projects => {
		this.projects = projects.data;
		this.imagesPath = projects.imagesPath;

		this.updateDisplayProjects();
	});

	matchmedia.on(queryTablet, () => {
		this.updateDisplayProjects();
	});
})