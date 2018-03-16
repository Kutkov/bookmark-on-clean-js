// Listen form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// test if bookmarks is null
	if(localStorage.getItem('bookmarks')==null){
		// init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}else{
		//  Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	// Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
	console.log('url= ' + url);
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop throught bookmarks
	for(var i=0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks(){
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResult = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="jumbotron">'+
									  '<h3>' + name +
									  '<a class="btn btn-default" target="_blank" href="'+url+'">Visits</a>' +
									  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
									  '</h3>' +
									  '</div>';
	}
}


function validateForm(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Заполните форму');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}