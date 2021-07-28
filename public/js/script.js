$(function() {

	$("#search").keypress(keywordSearch);
	
	//mDl8AIUncJLzYsH0nPJwTA
	//jTu8alO6FZH6ssi7GQkUNA
	//getBusiness("jTu8alO6FZH6ssi7GQkUNA");
	//getBusiness("mDl8AIUncJLzYsH0nPJwTA");
	
	//getBusinessReviews("mDl8AIUncJLzYsH0nPJwTA");
	
	function getBusinessReviews(id) {
		
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews",
			headers: {
				Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
			},
			method: "GET",
			dataType: "json",
			data: {
			
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				console.log(data.reviews[1].text);
				console.log(data.reviews[1].user);
			}
		});
	}
	
	function getBusiness(id) {
		
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id,
			headers: {
				Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
			},
			method: "GET",
			dataType: "json",
			data: {
			
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
			}
		});	
	}
	
	function keywordSearch(event) {
		if (event.which == 13) {
			
			var keyword = $(this).val();			
			getBusinesses(keyword);
		}
	}

	function getBusinesses(keyword) {
			
			$.ajax({
				url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
				headers: {
					Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
				},
				method: "GET",
				dataType: "json",
				data: {
					term: keyword,
					location: "Omaha"
				}, 
				error: ajaxError,
				success: function(data) {
					console.log(data);
					buildBusinesses(data);
				}
			});
	}
	
	
	function ajaxError() {
		alert("Ajax Error!");
	}
	
	
	function buildBusinesses(data) {

		$(".card").remove();		
		for (var i = 0; i < data.businesses.length; i++) {
			
			var $bus = data.businesses[i];
			var $business = $("#business-card").clone();
			$business.removeAttr("id");
			$business.addClass("card");
			$business.find(".business-title").append($bus.name);
			$business.find(".business-rating").append($bus.rating);
			$business.find(".review-count").append($bus.review_count);
			
			var numStars = Math.floor($bus.rating);
			for (var ri = 1; ri <= numStars; ri++) {
				$business.find("img:nth-child(" + ri + ")").attr(
				"src", "images/star-filled.png");
			}
			var numStarsString = "" + $bus.rating;
			if (numStarsString.endsWith(".5")) {
				$business.find("img:nth-child(" + (numStars + 1) + ")").attr(
				"src", "images/star-half.png");
			}
			 
			$business.find(".business-image img").attr("src", $bus.image_url);
			$("#businesses").append($business);
		}
		
	}
	
	
	
	
	
	

























});