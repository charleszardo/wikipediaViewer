$(document).ready(function() {
	function addArticle(title, desc, link) {
		$("#results").append(
			"<div class='result'><a href='" + link + "' target='_blank'>" +
			"<h3 class='title'>" + title + "</h3>" +
			 "<div class='desc'>" + desc + "</div>" +
			"</a></div>"
		)
	}
	
	function populateResults(results) {
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
	
	function wikipediaSearch(str, limit) {
		var baseUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=",
				query = encodeURIComponent(str),
				limit = "&limit=" + (limit || 10),
				urlTrail = "&namespace=0&format=json",
				fullUrl = baseUrl + query + limit + urlTrail;
		
		$.ajax({
		  dataType: "jsonp",
		  url: fullUrl,
		  success: function(data) {
				populateResults(data);
		  }
		});
	}
	
	$("#submit").click(function() {
		var queryString = $("#query").val();
		wikipediaSearch(queryString);
	})
})