$(document).ready(function() {

	var titleLinks = [];
	var commentLinks = [];
	var newLinks = [];

	//Links are in td.title
	$('td.title a[href^="http"]').each(function(link) {
		//Loop through each external link
		titleLinks.push($(this).attr('href'));
		//Check that it doesn't go to HN
	});

	//Now get comment links
	$('a[href^="item?id"]').each(function(link) {
		href = $(this).attr('href');
		if ($.inArray(href, titleLinks) < 0) { 
			commentLinks.push($(this).attr('href'));
		}
	});

	//Make toolbar links
	for(i = 0; i < titleLinks.length; i++) {
		titleLink = titleLinks[i];

		commentLink = commentLinks[i];
		commentSplit = commentLink.split("=");
		commentId = commentSplit[1];

		newLink = "http://hntoolbar.herokuapp.com/" + commentId + "?url=" + titleLink;
		newLinks.push(newLink);
	}

	//Replace
	$('td.title a[href^="http"]').each(function(idx, link) {
		current = $(this).attr('href');
		if (current.indexOf("news.yc") < 0 ) {
			$(this).attr('href', newLinks[idx]);
		}
	});		
});