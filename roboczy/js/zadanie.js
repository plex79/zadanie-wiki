var app = angular.module('appWyszukiwarka', ['ngSanitize']).config(function($sceDelegateProvider) {
		  $sceDelegateProvider.resourceUrlWhitelist([
		    // Allow same origin resource loads.
		    'self',
		    // Allow loading from our assets domain.  Notice the difference between * and **.
		    'https://en.wikipedia.org/**'
		  ]);
		});

		app.controller('searchController', ['$scope', '$http', '$document', function(scope, http, document){

			var showSugestionsFlag;

			scope.showSugestionsFlag = false;
			scope.showSuggestions = showSuggestions;
			scope.searchMore = searchMore;
			scope.search = search;
			scope.isShowSuggestionFlagTrue = isShowSuggestionFlagTrue;


			function searchMore (title) {
				scope.searchField = title;
			}

			function search () {
				var charCount = scope.searchField.length;
												
				if (charCount > 1)	{
				
					var ua = window.navigator.userAgent;
					
				    var adres = 'https://en.wikipedia.org/w/api.php?';

					http({
					    url: adres,
					    method: 'jsonp',
					    headers: ua,
					    params: {
				            format: "json",
				            action: "query",
				            prop: 'extracts|pageimages|images|info',
				            piprop: "original",
				            generator: 'search',
		                    gsrsearch: 'intitle:'+scope.searchField,
		                    pilimit: 'max',
		                    redirects: '',
		                    exchars: 2500,
		                    exlimit: 'max',
		                    explaintext: true,
		                    exintro: true,
		                    inprop: 'url'
				        }

					}).then(function(response) {
						console.log(response);
					    if(!response.data.query) {
					    	scope.dataObj ='';
					    } else {
					    	scope.dataObj = response.data.query.pages;
					    }
					    console.log(scope.dataObj);
					}, function errorCallback(response){
						console.log(response);
					});

				} else {
					scope.dataObj = '';
				}
			}


			function showSuggestions(event) {
				event.stopPropagation();
				setShowSuggestionFlagTrue();	
			}

			function setShowSuggestionFlagTrue() {
				showSugestionsFlag = true;
			}

			function setShowSuggestionFlagFalse() {
				showSugestionsFlag = false;
			}

			function isShowSuggestionFlagTrue() {
				return showSugestionsFlag;
			}

			document.on('click', function(){
				setShowSuggestionFlagFalse();
				scope.$apply();	
			});	

		}]);