var app = angular.module('appWyszukiwarka', ['ngSanitize']).config(function($sceDelegateProvider) {
		  $sceDelegateProvider.resourceUrlWhitelist([
		    // Allow same origin resource loads.
		    'self',
		    // Allow loading from our assets domain.  Notice the difference between * and **.
		    'https://en.wikipedia.org/**'
		  ]);
		});

		app.controller('szukajKontroler', ['$scope', '$http', '$document', function(scope, http, document){

			var showSugestionsFlag;

			scope.showSugestionsFlag = false;
			scope.showSuggestions = showSuggestions;
			scope.szukajWiecej = szukajWiecej;
			scope.Wyszukaj = Wyszukaj;
			scope.isShowSuggestionFlagTrue = isShowSuggestionFlagTrue;


			function szukajWiecej (czego) {
				scope.poleSzukaj = czego;
			}

			function Wyszukaj () {
				var ileZnakow = scope.poleSzukaj.length;
												
				if (ileZnakow > 1)	{
				
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
		                    gsrsearch: 'intitle:'+scope.poleSzukaj,
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
					    	scope.dane ='';
					    } else {
					    	scope.dane = response.data.query.pages;
					    }
					    console.log(scope.dane);
					}, function errorCallback(response){
						console.log(response);
					});

				} else {
					scope.dane = '';
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