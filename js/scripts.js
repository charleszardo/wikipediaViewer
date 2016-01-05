$(document).ready(function() {
	var randomUrl;
	
	function OpenInNewTab(url) {
	  var win = window.open(url, '_blank');
	  win.focus();
	}
	
	function addArticle(title, desc, link) {
		$("#results").append(
			"<div class='result'><a href='" + link + "' target='_blank'>" +
			"<h3 class='title'>" + title + "</h3>" +
			 "<div class='desc'>" + desc + "</div>" +
			"</a></div>"
		)
	}
	
	function populateResults(results) {
		$("#results").empty();
		
		var term = results[0],
				titles = results[1],
				descs = results[2],
				links = results[3],
				len = titles.length;
		
		for (var i = 0; i < len; i++) {
			var title = titles[i],
					desc = descs[i],
					link = links[i];
					
			addArticle(title, desc, link);
		}
	}
	
	function randomPage() {
		var baseUrl = "https://en.wikipedia.org/w/api.php",
				action = "?action=query",
				search = "&list=random";
				redirect = "&rnredirect=true",
				urlTrail = "&format=json",
				limit = "&limit=1",
				fullUrl = baseUrl + action + search + redirect + limit + urlTrail;
				$.ajax({
				  dataType: "jsonp",
				  url: fullUrl,
				  success: function(data) {
						var obj = data.query.random,
							title = obj[0].title;
						
						wikipediaSearch(title, true, 10);
				  }	
				});
	}
	
	function randomRedirect(results) {
		var links = results[3],
					url = links[0];
				// sets global randomUrl to current random url
				randomUrl = url;
				$("#random").prop("disabled",false);
	}
	
	function wikipediaSearch(str, random, limit) {
		var random = (random || false),
				baseUrl = "https://en.wikipedia.org/w/api.php",
				search = "&search=" + str,
				urlTrail = "&format=json",
				namespace = "&namespace=0",
				limit = "&limit=" + (limit || 10),
				action = "?action=opensearch",
				fullUrl = baseUrl + action + search + limit + namespace + urlTrail;
		
		$.ajax({
		  dataType: "jsonp",
		  url: fullUrl,
		  success: function(data) {
				if (random) {
					randomRedirect(data);
				} else {
					console.log(data);
					populateResults(data);
				}
		  }
		});
	}
	
	$("#submit").click(function() {
		var queryString = $("#query").val();
		wikipediaSearch(queryString, false, 10);
	})
	
	$("#random").click(function() {
		OpenInNewTab(randomUrl);
		randomPage();
	})
	
	$("#query").autocomplete({
	    source: function(request, response) {
	        $.ajax({
	            url: "http://en.wikipedia.org/w/api.php",
	            dataType: "jsonp",
	            data: {
	                'action': "opensearch",
	                'format': "json",
	                'search': request.term
	            },
	            success: function(data) {
	                response(data[1]);
	            }
	        });
	    }
	});
	
	// call randomPage on page load so that random url is ready almost immediately
	randomPage();
})