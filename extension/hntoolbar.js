$(document).ready(function() {

	var titleLinks = [];
	var titleLinkObjects = [];
	var commentLinks = [];
	var newLinks = [];

	//Links are in td.title
	//$('td.title a[href^="http"]').each(function(link) {
		//titleLinks.push($(this).attr('href'));
	//});

	$('td.title').each(function(td) {
		link = $(this).children('a').first();
		href = link.attr('href');
		if (!(typeof href === 'undefined')){
			titleLinkObjects.push(link);
			titleLinks.push(href);
		}
	});

	//Now get comment links
	$('a[href^="item?id"]').each(function(link) {
		href = $(this).attr('href');
		if ($.inArray(href, commentLinks) < 0) { 
			commentLinks.push(href);
		}
	});

	//Make toolbar links
	var minLength = Math.min(commentLinks.length, titleLinks.length);
	for(i = 0; i < minLength; i++) {
		titleLink = titleLinks[i];

		commentLink = commentLinks[i];
		commentSplit = commentLink.split("=");
		commentId = commentSplit[1];

		newLink = "http://hntoolbar.herokuapp.com/" + commentId + "?url=" + titleLink;
		newLinks.push(newLink);
	}

	//Replace
	for(i = 0; i < titleLinkObjects.length; i++) {
		current = titleLinkObjects[i];
		currentLink = current.attr('href');
		if (!isHNLink(currentLink) && !isNextPageLink(currentLink)) {
			current.attr('href', newLinks[i]);
		}
	}

	function isHNLink(link) {
		return (link.indexOf("item?id=") == 0);
	}

	function isNextPageLink(link) {
		return (link.indexOf("/x?") == 0);
	}
	// $('td.title a[href^="http"]').each(function(idx, link) {
	// 	current = $(this).attr('href');
	// 	if (current.indexOf("news.yc") < 0 ) {
	// 		$(this).attr('href', newLinks[idx]);
	// 	}
	// });		
});