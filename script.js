'use strict'
	

	    let appKey = '56dc91c65105b03d1c0b7071bb00e762';
	    let appId = 'b8a5a5c3';
	    let recipeFinder = 'https://api.edamam.com/search';
	

	    function formatQueryParams(params) {
	        const queryItems = Object.keys(params)
	        .map(key => `${key}=${params[key]}`)
	//`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	            return queryItems.join('&');
	    }
	

	    function getRecipe(query) {
	        const params = {
	            q: query,
	            app_id: appId,
	            app_key: appKey,
	    }
	

	    let queryString = formatQueryParams(params);
	    let url = recipeFinder + '?' + queryString;
	

	    fetch(url)
	    .then(response => response.json())
	    .then(responseJson => displayResults(responseJson))
	    .catch(error => {
	        $('.displayError').html(`Something went wrong. Try again later:
	        ${error.message}`)
	    })
	    }
	

	    function displayResults(responseJson) {
	    //$('#results-list').empty();
	        for (let i = 0; i < responseJson.hits.length; i++){
	         console.log(responseJson.hits[i].recipe);
	         $('.displayRecipeFinder').append(`
	            <h2>${responseJson.hits[i].recipe.label}</h2>
	            <img src="${responseJson.hits[i].recipe.image}" ><br>
	            <a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.source}</a>
	        `
	        )
	    }
	//     $('#results').removeClass('hidden');
	 }
	

	    function watchForm() {
	        $('#getDisplay').click(event => {
	            event.preventDefault();
	        
	            let ingredient = $('#js-search-term').val();
	            let ingredientTwo = $('#js-search-term-two').val();
	            let ingredientThree = $('#js-search-term-three').val();
	        // let maxResults = $('#js-max-results').val();
	        //console.log(getRecipe(ingredient));
	             getRecipe(ingredient, ingredientTwo, ingredientThree);
	             $('.displayRecipeFinder').empty();
	             
	    });
	}
	$(watchForm);



 
