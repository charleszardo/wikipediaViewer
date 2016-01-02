$(document).ready(function() {
	function addArticle(title, desc, link) {
		$("#results").append
	}
	
	function populateResults(results) {
		var term = results[0],
				titles = results[1],
				descs = results[2],
				links = results[3],
				len = titles.length;
		
		for (var i = 0; i < len; i++) {
			
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