//list onclick
function choicebar(option){
	if(option.innerHTML == "Book"){
		document.getElementById('search_button').innerHTML = "Book";
		document.getElementById('blueraylist').style.display = 'none';
		document.getElementById('booklist').style.display = 'block';
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
	}else if(option.innerHTML == "BlueRay"){
		document.getElementById('search_button').innerHTML = "BlueRay";	
		document.getElementById('booklist').style.display = 'none';
		document.getElementById('blueraylist').style.display = 'block';
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
	}
}



//http request
//booklist
var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";

function getBookList(){

	var list = new XMLHttpRequest();

	//var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+term;

	list.open("GET",uri,true);

	list.setRequestHeader("Accept","application/json");
	list.onreadystatechange = function(){
		if (list.readyState == 4 && list.status == 200) {
		//var booklist = document.getElementById("showtest");
		//booklist.innerHTML = xhr.responseText;
		var resp = JSON.parse(list.responseText);
		organizeBookList(resp);
		//console.log(1);
		}
	}
	list.send(null);
}

function organizeBookList(booklists){

	var tableContent = "<tr class='orderTitle'><td colspan='3'>booklists</td></tr>\n"
	for (var i = 0; i < booklists.length; ++i) {
		var books = booklists[i];
		//var author = books.AuthorInitials + "," + books.AuthorSurname;
		var bookId = String(books.Id);
		var bookTitle = books.Title;
		var bookImg = 'http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/bookimg?id='+bookId;
		var imgTag = '<img src='+bookImg+'></img>';
		var buyuri = 'http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id='+bookId; 
		var imgbuy = "<img src='img/buy_photos.jpg' id='img"+bookId+"' style='width:80%;height:15%' onclick='buynow(img"+bookId+")'></img>";
		//alert(imgbuy);
		//var buynow = 'buynow('+bookId+')'
		if(i % 2 == 1){
			tableContent += "<tr class='orderOdd'>";
		} else{
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td>" + bookTitle + "</td><td>"+ imgTag+ "</td><td>"+"<img src='img/buy_photos.jpg' id='buynowimg' style='width:80%;height:15%' onclick='buynow()'></img>"+"</td></tr>\n";
	}
	document.getElementById('booklist').innerHTML = tableContent;
	//alert(buynow);
}

function run(){
	getBookList();
	getBlueRay();
}

//blueray
var uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
function getBlueRay(){

	var list = new XMLHttpRequest();

	//var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+term;

	list.open("GET",uri2,true);

	list.setRequestHeader("Accept","application/json");
	list.onreadystatechange = function(){
		if (list.readyState == 4 && list.status == 200) {
		//var booklist = document.getElementById("showtest");
		//booklist.innerHTML = list.responseText;
		var resp = JSON.parse(list.responseText);
		organizeBlueRay(resp);
		}
	}
	list.send(null);
}

function organizeBlueRay(bluerays){
	var tableContent = "<tr class='orderTitle' ><td colspan='3'>BlueRays</td></tr>\n";
	for (var i = 0; i < bluerays.length; ++i) {
		var bluer = bluerays[i];
		var blueTitle = bluer.Title;
		var blueId = bluer.Id;
		var blueImg = 'http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brimg?id='+blueId;
		var imgTag = '<img src='+blueImg+'></img>'; 

		if(i % 2 == 1){
			tableContent += "<tr class='orderOdd'>";
		} else{
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td>" + blueTitle + "</td><td>"  + imgTag +"</td><td>"  + "<img src='img/buy_photos.jpg' id='buynowimg' style='width:80%;height:15%' onclick='buynow()'></img>"+"</td></tr>\n";
	}
	document.getElementById('blueraylist').innerHTML = tableContent;
}

//filter
function filterlist(e){
	var textfield = document.getElementById(e).value;
	var option = document.getElementById('search_button').innerHTML;
	if( option== "Book "){
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+textfield;
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
		getBookList();	
	}else if (option == "BlueRay"){
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term="+textfield;
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
		getBlueRay();
	}

}



//form submission
var uri3 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/register";
function signup_in(){
	var xhttp = new XMLHttpRequest();
	var username = document.getElementById('username').value;
	var passwd = document.getElementById('password').value;
	var address = document.getElementById('address').value;
	var vars = {
		"Address":username,
		"Name":passwd,
		"Password":address
	}

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		  document.getElementById("success").innerHTML = xhttp.responseText;
		}
	}
	xhttp.open("POST", uri3, true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(vars));
	alert("Thanks for signing up");
}



//comments
var uri4 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/comment?name=";
function comment_submit(){
	var xhttp = new XMLHttpRequest();
	var name = document.getElementById('nametext').value;
	var comment = document.getElementById('commenttext').value;
	var uri_4 = uri4 + name;
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//alert(1);
			document.getElementById('commentdis').innerHTML = xhttp.responseText;
		}
	}
	xhttp.open("POST", uri_4, true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(comment));
	alert("Thanks for ur comment");	
}



//close service
var close_uri1 = "http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=cd001";
function buynow(id){

	var list = new XMLHttpRequest();
	alert(close_uri1);
	//var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+term;
	//alert(1);/
	list.open("GET",close_uri1,true);

	//list.setRequestHeader("Accept","application/json");
	list.onreadystatechange = function(){
		//alert(close_uri1);
	}
	//list.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	list.send(null);
}

