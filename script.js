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
		
	// fetch first api call for recipes
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
	    .then(responseJson => displayResults(responseJson))
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
	.then(resJson => displayResults(resJson))
	.catch(error => {
		$('.displayError').html(`Something went wrong. Try again later:
		${error.message}`)
	})
	console.log(resJson, 'beth');
	}
	
	    function displayResults(responseJson, resJson) {
		//$('#results-list').empty();
		console.log(resJson, 'beth');
	        for (let i = 0; i < responseJson.hits.length; i++){
			 //console.log(responseJson.hits[i].recipe);
			 console.log(resJson);
	         $('.displayRecipeFinder').append(`
	            <h2>${responseJson.hits[i].recipe.label}</h2>
	            <img src="${responseJson.hits[i].recipe.image}" ><br>
	            <a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.source}</a>
	        `
			)
			for (let j = 0; j < resJson.length; j++){
				console.log(resJson[i]);
				$('.displayRecipeFinder').append(`
				   <h2>${resJson.food[i].label}</h2>
			   `
			   )
			}
	    }
	//     $('#results').removeClass('hidden');
	 }
	
	    function watchForm() {
	        $('#getDisplay').click(event => {
	            event.preventDefault();
	        
	            let ingredient = $('#js-search-term').val();
	            //let ingredientTwo = $('#js-search-term-two').val();
	            //let ingredientThree = $('#js-search-term-three').val();
	        // let maxResults = $('#js-max-results').val();
	        //console.log(getRecipe(ingredient));
	             getRecipe(ingredient);
	             $('.displayRecipeFinder').empty();
	             
	    });
	}
	$(watchForm);


