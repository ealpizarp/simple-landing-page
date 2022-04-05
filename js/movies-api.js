console.log(sessionStorage);

//General variables
const key = 'api_key=f56f32925433bb1f663613c6a6495943';
const url = 'https://api.themoviedb.org/3';
const img = 'https://image.tmdb.org/t/p/w500';

//request for upcoming movies
const req_upcoming = url + '/movie/upcoming?&' + key;

//request for popular movies
const req_popular = url + '/movie/popular?&' + key;

const mainFavs = document.getElementById('favs-movies');
const popupFavs = document.getElementById('wrapper-favs');

const mainLatest = document.getElementById('latest-movies');
const popupLatest = document.getElementById('wrapper-latest');

const mainPopular = document.getElementById('popular-movies');
const popupPopular = document.getElementById('wrapper-popular');

function cleanBtns(section,id) {
    var rateBtns1 = document.querySelectorAll(section+' .rate-1-btn');
    var rateBtns2 = document.querySelectorAll(section+' .rate-2-btn');
    var rateBtns3 = document.querySelectorAll(section+' .rate-3-btn');
    var rateBtns4 = document.querySelectorAll(section+' .rate-4-btn');
    var rateBtns5 = document.querySelectorAll(section+' .rate-5-btn');

    rateBtns1[id].classList.remove('active');
    rateBtns2[id].classList.remove('active');
    rateBtns3[id].classList.remove('active');
    rateBtns4[id].classList.remove('active');
    rateBtns5[id].classList.remove('active');
}

function init(section) {
    var popularPopup_cards = document.querySelectorAll(section+' .movie-id');
    var movies_id = Object.keys(sessionStorage);

    for (i=0; i<popularPopup_cards.length; i++){
        for (j=0; j<movies_id.length; j++){
            if (popularPopup_cards[i].value==movies_id[j]){
                cleanBtns(section, i);
                var btn = JSON.parse(sessionStorage.getItem(movies_id[j]));
                var btns = document.querySelectorAll(section+' .'+ btn.rate);

                btns[i].classList.add('active');
            }
        }
    }
}

/*function initPopular() {
    var popularPopup_cards = document.querySelectorAll('.popular .movie-id');
    var movies_id = Object.keys(sessionStorage);

    for (i=0; i<popularPopup_cards.length; i++){
        for (j=0; j<movies_id.length; j++){
            if (popularPopup_cards[i].value==movies_id[j]){
                cleanBtns('.popular', i);
                var btn = JSON.parse(sessionStorage.getItem(movies_id[j]));
                var btns = document.querySelectorAll('.popular .'+ btn.rate);

                btns[i].classList.add('active');
            }
        }
    }
}

function initLatest() {
    var popularPopup_cards = document.querySelectorAll('.upcoming .movie-id');
    var movies_id = Object.keys(sessionStorage);

    for (i=0; i<popularPopup_cards.length; i++){
        for (j=0; j<movies_id.length; j++){
            if (popularPopup_cards[i].value==movies_id[j]){
                cleanBtns('.upcoming', i);
                var btn = JSON.parse(sessionStorage.getItem(movies_id[j]));
                var btns = document.querySelectorAll('.upcoming .'+ btn.rate);

                btns[i].classList.add('active');
            }
        }
    }
}*/

function getFavsMovies() {
    
    var favs = Object.keys(sessionStorage);
    showFavsMovies(favs);
}

let favsPromise = new Promise((resolve)=>{
    
    if(mainFavs){
        getFavsMovies();
        resolve('Exito!');
    }    

});


function showFavsMovies(data){
    mainFavs.innerHTML= '';

    data.forEach(movies => {
        const {id, name, overview, imgs, rate} = JSON.parse(sessionStorage.getItem(movies));
        const movie = document.createElement('div');
        const info = document.createElement('div');

        //Creates a movie card
        movie.classList.add('movie-card');
        movie.innerHTML = `
        <h2 class="name">${name}</h2>
        <a class="popup-btn">Ver más</a>
        <img src="${imgs}" alt="" class="movie-img">
        `;

        mainFavs.appendChild(movie);

        //Creates popup for the movie card
        info.classList.add('popup-view');
        info.innerHTML= `
        <div class="popup-card">
            <input class="movie-id" type="hidden" value="${id}">
            <a><i class="fas fa-times close-btn"></i></a>
            <div class="movie-img">
                <img src="${imgs}" alt="">
            </div>
            <div class="info">
                <h2 class="movie-name">${name}</h2>
                <p class="movie-description">${overview}</p>
                <h3>Puntúa esta película</h3>
                <div class="star-rating">
                    <a><li class="far fa-frown rate-1-btn"></li></a>
                    <a><li class="far fa-frown-open rate-2-btn"></li></a>
                    <a><li class="far fa-meh rate-3-btn"></li></a>
                    <a><li class="far fa-surprise rate-4-btn"></li></a>
                    <a><li class="far fa-smile-beam rate-5-btn"></li></a>
                </div>
            </div>
        </div>
        `;

        popupFavs.appendChild(info); //Add the modal of the before movie.
    });

    
    //Modal Views
    createModals();

    //rate
    rate(".favs");

    //load changes
    init('.favs');
}


function getLatestMovies(url) {
    
    fetch(url).then(res => res.json()).then(data => {
        showLatestMovies(data.results);
    });
}

let latestPromise = new Promise((resolve)=>{
    
    if(mainLatest){
        getLatestMovies(req_upcoming);
        resolve('Exito!');
    }    

});

function showLatestMovies(data){

    mainLatest.innerHTML = '';

    data.forEach(movies => {

        const {id, title, poster_path, overview} = movies;
        const movie = document.createElement('div');
        const info = document.createElement('div');

        //Creates a movie card
        movie.classList.add('movie-card');
        movie.innerHTML = `
        <h2 class="name">${title}</h2>
        <a class="popup-btn">Ver más</a>
        <img src="${img + poster_path}" alt="" class="movie-img">
        `;

        mainLatest.appendChild(movie); //Add new movie to the section latest-movies.

        //Creates popup for the movie card
        info.classList.add('popup-view');
        info.innerHTML= `
        <div class="popup-card">
            <input class="movie-id" type="hidden" value="${id}">
            <a><i class="fas fa-times close-btn"></i></a>
            <div class="movie-img">
                <img src="${img + poster_path}" alt="">
            </div>
            <div class="info">
                <h2 class="movie-name">${title}</h2>
                <p class="movie-description">${overview}</p>
                <h3>Puntúa esta película</h3>
                <div class="star-rating">
                    <a><li class="far fa-frown rate-1-btn"></li></a>
                    <a><li class="far fa-frown-open rate-2-btn"></li></a>
                    <a><li class="far fa-meh rate-3-btn"></li></a>
                    <a><li class="far fa-surprise rate-4-btn"></li></a>
                    <a><li class="far fa-smile-beam rate-5-btn"></li></a>
                </div>
            </div>
        </div>
        `;

        popupLatest.appendChild(info); //Add the modal of the before movie.
    });

    //Modal Views
    createModals();

    //Implements Carousel
    createCarousel();

    //rate
    rate(".upcoming");
    
    //load changes
    init(".upcoming");
}

function getPopularMovies(url) {
    
    fetch(url).then(res => res.json()).then(data => {
        showPopularMovies(data.results);
    });
}

let popularPromise = new Promise((resolve)=>{

    
    if(mainPopular){
        getPopularMovies(req_popular);
        resolve('Exito!');
    }    

});

function showPopularMovies(data){

    mainPopular.innerHTML = '';

    data.forEach(movies => {

        const {id, title, poster_path, overview} = movies;
        const movie = document.createElement('div');
        const info = document.createElement('div');

        //Creates a movie card
        movie.classList.add('movie-card');
        movie.innerHTML = `
        <h2 class="name">${title}</h2>
        <a class="popup-btn">Ver más</a>
        <img src="${img + poster_path}" alt="" class="movie-img">
        `;

        mainPopular.appendChild(movie); //Add new movie to the section latest-movies.

        //Creates popup for the movie card
        info.classList.add('popup-view');
        info.innerHTML= `
        <div class="popup-card">
            <input class="movie-id" type="hidden" value="${id}">
            <a><i class="fas fa-times close-btn"></i></a>
            <div class="movie-img">
                <img src="${img + poster_path}" alt="">
            </div>
            <div class="info">
                <h2 class="movie-name">${title}</h2>
                <p class="movie-description">${overview}</p>
                <h3>Puntúa esta película</h3>
                <div class="star-rating">
                    <a><li class="far fa-frown rate-1-btn"></li></a>
                    <a><li class="far fa-frown-open rate-2-btn"></li></a>
                    <a><li class="far fa-meh rate-3-btn"></li></a>
                    <a><li class="far fa-surprise rate-4-btn"></li></a>
                    <a><li class="far fa-smile-beam rate-5-btn"></li></a>
                </div>
            </div>
        </div>
        `;
        popupPopular.appendChild(info); //Add the modal of the before movie.
    });

    
    //Modal Views
    createModals();

    //rate
    rate(".popular");

    //load changes
    init(".popular");
}

function createModals() {
    var popupViews = document.querySelectorAll('.popup-view');
    var popupBtns = document.querySelectorAll('.popup-btn');
    var closeBtns = document.querySelectorAll('.close-btn');

    var release = function(popupClick){
        popupViews[popupClick].classList.add('active');
    }

    popupBtns.forEach((popupBtn, i) => {
        popupBtn.addEventListener("click", () =>{
            release(i);
        });
    });

    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            popupViews.forEach((popupView) => {
                popupView.classList.remove('active');
            });
        });
    });
}

function createCarousel() {
    $(".latest-movies").owlCarousel({
        margin: 10,
        rewind: true,
        loop: false,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        dots: true,
        lazyLoad: true, //For images
        responsive: {
            0: {
                items: 1
            },
            670: {
                items: 2
            },
            970: {
                items: 3
            },
            1270: {
                items: 4
            },
            1570: {
                items: 5
            },
            1870: {
                items: 6
            },
            2170:{
                items: 7
            },
        }
    });
}

function rate(section) {
    var rateBtns1 = document.querySelectorAll('.rate-1-btn');
    var rateBtns2 = document.querySelectorAll('.rate-2-btn');
    var rateBtns3 = document.querySelectorAll('.rate-3-btn');
    var rateBtns4 = document.querySelectorAll('.rate-4-btn');
    var rateBtns5 = document.querySelectorAll('.rate-5-btn');

    assignEvents(rateBtns1, [rateBtns2, rateBtns3, rateBtns4, rateBtns5], section);
    assignEvents(rateBtns2, [rateBtns1, rateBtns3, rateBtns4, rateBtns5], section);
    assignEvents(rateBtns3, [rateBtns2, rateBtns1, rateBtns4, rateBtns5], section);
    assignEvents(rateBtns4, [rateBtns2, rateBtns3, rateBtns1, rateBtns5], section);
    assignEvents(rateBtns5, [rateBtns2, rateBtns3, rateBtns4, rateBtns1], section);
}

function setActive(btns, id, section) {
    btns[id].classList.add('active');
    var titles = document.querySelectorAll(section+' .movie-name');
    var overviews = document.querySelectorAll(section+' .movie-description');
    var imgs = document.querySelectorAll(section+' .movie-img');
    var identifiers= document.querySelectorAll(section+' .movie-id');

    try {
        var movie = {
            id: identifiers[id].value,
            name: titles[id].textContent,
            overview: overviews[id].textContent,
            imgs: imgs[id].src,
            rate: btns[id].classList[2]
        }
        
        sessionStorage.setItem(movie.id, JSON.stringify(movie));

        if (section == '.upcoming'){
            init('.popular');
        }else{
            init('.upcoming');
        }
    } catch (error) {
        
    }
}

function removeActive(array, id) {
    array.forEach(btns => {
        btns[id].classList.remove('active');
    });
}

function assignEvents(btns, array, section) {
    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            setActive(btns, i, section);
            removeActive(array, i);
        });
    });
}
