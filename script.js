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
	        $('.displayError').html(`Something went wrong. Pleae, try again:
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
			$('.displayError').html(`Something went wrong. Please, try again:
			${error.message}`)
		})
	}

	function displayResultsRecipe(responseJson) {
		document.getElementsByClassName('.displayRecipe').innerHTML = "Paragraph changed!";
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
			let kcal = data.hints[i].food.nutrients.ENERC_KCAL;
			let k = kcal.toFixed(2);

			let procnt = data.hints[i].food.nutrients.PROCNT;
			let p = procnt.toFixed(2);

			let fat = data.hints[i].food.nutrients.FAT;
			let f = fat.toFixed(2);

			let chocdf = data.hints[i].food.nutrients.CHOCDF;
			let c =chocdf.toFixed(2);

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
					<td>${k} kcal</td>
					<td>${p} procnt</td>
					<td>${f} fat</td>
					<td>${c} chocdf</td>
				</tr>
			</table>
		`
		)}
	}	
	
	function watchForm() {
		$("#getDisplay").on('submit', function(event) {
			event.preventDefault();
			let ingredient = $('#js-search-term').val();
	
			// Send the data using post
			let posting = $.post(getRecipe(ingredient));
			// Put the results in a div
			posting.done(function( data ) {
				console.log(data);
				$('.displayRecipe').empty();
 
			$( "#result" ).empty().append( content );
			});
			// function(ingredient){
            // 	getRecipe(ingredient);
            // 	getFood(ingredient);
            // 	$('.displayRecipe').empty();
            // 	$('.displayFood').empty();
			// };
        });
    }
	$(watchForm);
	
// 	
  


// function InvalidMsg(textbox) {
//     if (textbox.value === '') {
// 		(textbox.setCustomValidity);
//     } else if (textbox.validity.typeMismatch){
//         textbox.setCustomValidity('please submit a request');
//     } else {
//        textbox.setCustomValidity('');
//     }

// 	 return false;
// 	}



// function checkAnswersValid(){
// 	let answerIndex = $('input[name=answer]:checked').val()
// 	let answerNotSelected = !answerIndex

// 	if(answerNotSelected) {
// 		alert('You must select an answer, now!!')
// 	} else {
// 		let answer =
// 		STORE[currentQuestionIndex].answers[
// 			Number($('input[name=answer]:checked').val())
// 		]
// 		updateForm({answer, answerIndex})

		
// 	}
// }

	
	anime.timeline({loop: true})
	.add({
	  targets: '.ml15 .word',
	  scale: [14,1],
	  opacity: [0,1],
	  easing: "easeOutCirc",
	  duration: 1000,
	  delay: (el, i) => 800 * i
	}).add({
	  targets: '.ml15',
	  opacity: 0,
	  duration: 3000,
	  easing: "easeOutExpo",
	  delay: 6000
	});



