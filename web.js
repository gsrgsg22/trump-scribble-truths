(function () {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = '@font-face { font-family: i eat crayons; src: url("'
		+ chrome.runtime.getURL('fonts/i eat crayons.ttf')
		+ '"); }';
	(document.head || document.documentElement).appendChild(style);

	function isTrumpPost(post) {
		// Look for link containing /@realDonaldTrump in the post
		var links = post.querySelectorAll('a[href*="/@realDonaldTrump"]');
		return links.length > 0;
	}

	function stylePostText(post) {
		// Target Truth Social's markup element that contains the post text
		var textElements = post.querySelectorAll('p[data-testid="markup"]');
		for (var j = 0; j < textElements.length; j++) {
			textElements[j].style.fontFamily = "'i eat crayons', sans-serif";
			textElements[j].style.color = 'darkred';
			textElements[j].style.fontSize = '24px';
		}
	}

	function changeFont() {
		// Look for all post containers (Truth Social uses div[id^="status-"])
		var posts = document.querySelectorAll('div[id^="status-"]');
		
		for (var j = 0; j < posts.length; j++) {
			if (posts[j].dataset.crayonChecked === '1') {
				continue;
			}

			if (isTrumpPost(posts[j])) {
				stylePostText(posts[j]);
			}

			posts[j].dataset.crayonChecked = '1';
		}
	}

	var Observer = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new Observer(function () {
		changeFont();
	});

	observer.observe(document.body || document.documentElement, {
		subtree: true,
		childList: true,
		attributes: false
	});

	changeFont();
})();