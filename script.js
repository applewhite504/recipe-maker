'use strict'


	    let appKeyF = '5e612794d4dd156cef49d38e96d29a10	';
		let appIdF = 'b1dec2c8';
		let appKey = '56dc91c65105b03d1c0b7071bb00e762'
		let appId = 'b8a5a5c3';
		let recipeFinder = 'https://api.edamam.com/search';
		let foodFinder = 'https://api.edamam.com/api/food-database/parser';
	

	    function formatQueryParams(params) {
	        const queryItems = Object.keys(params)
	        .map(key => `${key}=${params[key]}`)
	//`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	            return queryItems.join('&');
		}
		
	//fetch first api call for recipes
	    function getRecipe(query) {
	        const params = {
	            q: query,
	            app_id: appId,
	            app_key: appKey,
	    }
	
	    let queryString = formatQueryParams(params);
	    let urlRecipe = recipeFinder + '?' + queryString;
	
	    fetch(urlRecipe)
	    .then(response => response.json())
	    .then(responseJson => displayResultsRecipe(responseJson))
	    .catch(error => {
	        $('.displayError').html(`Something went wrong. Try again later:
	        ${error.message}`)
	    })
	}

	// fetch second api call for food database
	function getFood(query) {
		const param = {
			ingr: query,
			app_id: appIdF,
			app_key: appKeyF,
	}

	let queryString = formatQueryParams(param);
	let url = foodFinder + '?' + queryString;

	fetch(url)
	.then(response => response.json())
	.then(data => displayResultsFood(data))
	.catch(error => {
		$('.displayError').html(`Something went wrong. Try again later:
		${error.message}`)
		})
	}

	function displayResultsRecipe(responseJson) {
		document.getElementsByClassName(".displayRecipe").innerHTML = "Paragraph changed!";
		for (let j = 0; j < responseJson.hits.length; j++){
			$('.displayRecipe').append(`
				<h2>${responseJson.hits[j].recipe.label}</h2>
				<img src="${responseJson.hits[j].recipe.image}" ><br>
				<a href="${responseJson.hits[j].recipe.url}">${responseJson.hits[j].recipe.source}</a>
			`
		)}
	}
	
	function displayResultsFood(data) {
		for (let i = 0; i < data.hints.length; i++){
			$('.displayFood').append(`
			<h2>${data.hints[i].food.label}</h2>

			<table class="food-tb" style="width:100%;">
				<tr>
					<td width="80">Energy</td>
					<td width="80">Protein</td>
					<td width="80">Fat</td>	
					<td width="80">Carbs</td>
				</tr>
				<tr>
					<td>${data.hints[i].food.nutrients.ENERC_KCAL} kcal</td>
					<td>${data.hints[i].food.nutrients.PROCNT} g</td>
					<td>${data.hints[i].food.nutrients.FAT} g</td>
					<td>${data.hints[i].food.nutrients.CHOCDF} g</td>
				</tr>
			</table>
		`
		)}
	}	
	
	    function watchForm() {
	        $('#getDisplay').click(event => {
	            event.preventDefault();
	            let ingredient = $('#js-search-term').val();
	            
			getRecipe(ingredient);
			getFood(ingredient);
				 $('.displayRecipe').empty();
				 $('.displayFood').empty();
	             
	    });
	}
	$(watchForm);

	
	anime.timeline({loop: true})
	.add({
	  targets: '.ml15 .word',
	  scale: [14,1],
	  opacity: [0,1],
	  easing: "easeOutCirc",
	  duration: 800,
	  delay: (el, i) => 800 * i
	}).add({
	  targets: '.ml15',
	  opacity: 0,
	  duration: 1000,
	  easing: "easeOutExpo",
	  delay: 1000
	});



