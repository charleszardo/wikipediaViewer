$(document).ready(function() {
	var randomUrl;
	
  var currentRecs = [];
	
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
	
	function recommendations(results) {
		var titles = results[1],
				links = results[3],
				len = titles.length;
				
				for (var i = 0; i < len; i++) {
					var title = titles[i],
							link = links[i]
							console.log(currentRecs.includes(title));
							currentRecs.push(title);
				}
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
						
						wikipediaSearch(title, true, 10, false);
				  }	
				});
	}
	
	function randomRedirect(results) {
		var links = results[3],
					url = links[0];
				
				randomUrl = url;
				$("#random").prop("disabled",false);
	}
	
	function wikipediaSearch(str, random, limit, dropdown) {
		console.log('firin!');
		var random = (random || false),
				baseUrl = "https://en.wikipedia.org/w/api.php",
				search = "&search=" + str,
				urlTrail = "&format=json",
				namespace = "&namespace=0",
				limit = "&limit=" + (limit || 10),
				action = "?action=opensearch",
				fullUrl;
				
	 		 	fullUrl = baseUrl + action + search + limit + namespace + urlTrail;
		
		$.ajax({
		  dataType: "jsonp",
		  url: fullUrl,
		  success: function(data) {
				if (random) {
					randomRedirect(data);
				} else if (dropdown) {
					console.log(data);
					recommendations(data);
				} else {
					populateResults(data);
				}
		  }
		});
	}
	
	$("#query").keyup(function() {
		var val = $("#query").val();
		// wikipediaSearch(val, false, 10, true);
	}) 
	
	$("#submit").click(function() {
		var queryString = $("#autocomplete").val();
		wikipediaSearch(queryString, false, 10, false);
	})
	
	$("#random").click(function() {
		OpenInNewTab(randomUrl);
		randomPage();
	})
	
	randomPage();
	
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
	
	// $(function() {
	//     var availableTags = [
	//       "ActionScript",
	//       "AppleScript",
	//       "Asp",
	//       "BASIC",
	//       "C",
	//       "C++",
	//       "Clojure",
	//       "COBOL",
	//       "ColdFusion",
	//       "Erlang",
	//       "Fortran",
	//       "Groovy",
	//       "Haskell",
	//       "Java",
	//       "JavaScript",
	//       "Lisp",
	//       "Perl",
	//       "PHP",
	//       "Python",
	//       "Ruby",
	//       "Scala",
	//       "Scheme"
	//     ];
	//     $( "#query" ).autocomplete({
	//       source: currentRecs
	//     });
	//   });
	// $( "#tags" ).autocomplete({
// 		source: currentRecs
// 	});
})