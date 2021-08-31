function openAddMenu() {
    var x = document.getElementById("addBook");
    x.style.display = "block";
    var y = document.getElementById("searchResults");
    y.style.display = "none";
    var z = document.getElementById("pochList");
    z.style.display = "block";
}

function closeAddMenu() {
    var x = document.getElementById("addBook");
    x.style.display = "none";
    var y = document.getElementById("searchResults");
    y.style.display = "none";
    var z = document.getElementById("pochList");
    z.style.display = "block";
}


function addBookMark(book) {
    var valueId = book.getAttribute('id');
    if (sessionStorage.getItem(valueId)) {
        alert("Ce livre est déjà présent dans la PochList' !");
    }
    else {
        cloneBook(book);
        var clonePochBook = document.getElementById(valueId);
        console.log(clonePochBook);
        sessionStorage.setItem(valueId, clonePochBook.innerHTML);
    }
}

function removeBookMark(book) {
    console.log(book);
    var valueId = book.getAttribute('id');
    sessionStorage.removeItem(valueId);
    var pochlist = document.getElementById("pochList");
    pochlist.removeChild(book);
}

function cloneBook(book) {
    let pochList = document.getElementById("pochList");
    var pochMain = document.createElement("div");
    pochMain.setAttribute("class", "pochList__Book");
    pochMain.setAttribute("id", book.getAttribute("id"));
    var pochTitle = document.createElement("div");
    pochTitle.setAttribute("class", "pochList__Book_Title");
    pochTitle.textContent = book.querySelector(".searchResults__Book_Title").textContent;
    var pochId = document.createElement("div");
    pochId.setAttribute("class", "pochList__Book_Id");
    pochId.textContent = book.getElementsByTagName("SPAN")[0].textContent;
    var pochAuthor = document.createElement("div");
    pochAuthor.setAttribute("class", "pochList__Book_Author");
    pochAuthor.textContent = book.querySelector(".searchResults__Book_Author").textContent;
    var pochDescription = document.createElement("div");
    pochDescription.setAttribute("class", "pochList__Book_Description");
    pochDescription.textContent = book.querySelector(".searchResults__Book_Description").textContent;
    var pochImage = document.createElement("img");
    pochImage.setAttribute("class", "pochList__Book_bookElement--img");
    pochImage.setAttribute("src", book.querySelector(".searchResults__Book_bookElement--img").getAttribute("src"));
    pochMain.innerHTML = '<button id="bookmark" onclick="removeBookMark(' + book.getAttribute("id") + ')" ><i class="fas fa-trash"></i></button>';
    pochMain.appendChild(pochTitle);
    pochMain.appendChild(pochId);
    pochMain.appendChild(pochAuthor);
    pochMain.appendChild(pochDescription);
    pochMain.appendChild(pochImage);
    pochList.appendChild(pochMain);
}

function openSearchResults() {
    let inauthor = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + title + "+inauthor:" + inauthor)
        .then(function (res) {
            if (res.ok) {
                SearchResults();
                console.log(res);
                return res.json();
            }
        })
        .then(function (value) {
            for (let i = 0; i <= 9; i++) {
                var item = value.items[i];
                showResults(item);
            }
            console.log("value", value);
        })
        .catch(function (err) {
            var bookMain = document.createElement("div");
            console.log('Il n\'y a a pas de livre trouvé ' + err.message);
            bookMain.textContent = "Aucun livre n’a été trouvé";
            error.appendChild(bookMain);
        });
}
function SearchResults() {

    var x = document.getElementById("searchResults");
    x.style.display = "block";
    var z = document.getElementById("pochList");
    z.style.display = "none";
}


function pochList() {
    var x = document.getElementById("searchResults");
    x.style.display = "none";
    var z = document.getElementById("pochList");
    z.style.display = "block";
}

// function showPochList() {
//     var pochListBook = sessionStorage.getItem(valueId);
//}

function showResults(result) {

    let searchResults = document.getElementById("searchResults");
    var bookMain = document.createElement("div");

    bookMain.setAttribute("class", "searchResults__Book");
    bookMain.setAttribute("id", result.id);
    var bookTitle = document.createElement("div");
    bookTitle.setAttribute("class", "searchResults__Book_Title");
    bookTitle.textContent = "Titre : " + result.volumeInfo.title;
    var bookId = document.createElement("div");
    bookId.setAttribute("class", "searchResults__Book_Id");
    var bookidentity = document.createElement("span");
    bookidentity.textContent = "Id : " + result.id;
    bookId.textContent = result.id;
    var bookAuthor = document.createElement("div");
    bookAuthor.setAttribute("class", "searchResults__Book_Author");
    if (result.volumeInfo.authors === undefined) {
        bookAuthor.textContent = "Auteur : Information manquante";
    }
    else {
        bookAuthor.textContent = "Auteur : " + result.volumeInfo.authors;
    }
    var bookDescription = document.createElement("div");
    bookDescription.setAttribute("class", "searchResults__Book_Description");
    if (result.volumeInfo.description === undefined) {
        bookDescription.textContent = "Description : Information manquante";
    }
    else {
        bookDescription.textContent = "Description : " + result.volumeInfo.description;
    }
    var bookImage = document.createElement("img");
    bookImage.setAttribute("class", "searchResults__Book_bookElement--img");
    if (result.volumeInfo.imageLinks.thumbnail === undefined) {
        bookImage.setAttribute("src", "unavailable.png");
    }
    else {
        bookImage.setAttribute("src", result.volumeInfo.imageLinks.thumbnail);
    }
    bookMain.innerHTML = '<button id="bookmark" onclick="addBookMark(' + result.id + ')" ><i class="fas fa-bookmark"></i></button>';
    bookMain.appendChild(bookTitle);
    bookMain.appendChild(bookidentity);
    bookMain.appendChild(bookAuthor);
    bookMain.appendChild(bookDescription);
    bookMain.appendChild(bookImage);
    searchResults.appendChild(bookMain);
}

window.onload = function () {
    for (var i = 0; i < sessionStorage.length; i++) {

        var book = sessionStorage.getItem(sessionStorage.key(i));
        var pochlist = document.getElementById("pochList");
        var pochMain = document.createElement("div");
        pochMain.setAttribute("class", "pochList__Book");
        pochMain.setAttribute("id", sessionStorage.key(i));
        pochMain.innerHTML = book;
        pochlist.appendChild(pochMain);
    }
};
