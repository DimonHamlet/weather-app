//import { response } from "express";

(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	$(window).load(function(){

	});

})(jQuery, document, window);

const weatherForm = document.getElementById('weatherForm')
const searchInput = document.getElementById('searchInput')
const weatherResult = document.getElementById('temperature_value')
const rainResult = document.getElementById('rain_value')


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const loc = searchInput.value
	const url = 'http://localhost:3000/weather?address=' + loc
	weatherResult.textContent = '...'
	fetch(url).then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error)
		}
		else {
			console.log(data)
			weatherResult.innerHTML = Math.round(data.forecast.temperature)
			rainResult.innerHTML = data.forecast.rain
		}
		
	})
})
})