

function home() {
            var text = jQuery('#home-template').html();
            
            var template = Handlebars.compile(text);
            
            var content = template(data);
            
            jQuery('#app').html(content);
}

function page(number) {
            var text = jQuery('#page-template').html();
            
            var template = Handlebars.compile(text);
            
            var content = template(data.results[number]);
            
            jQuery('#app').html(content);
}
        

function donate(number) {
    var text = jQuery('#donate-template').html();

    var template = Handlebars.compile(text);
    
    var content = template(data.results[number]);
    
    jQuery('#app').html(content);
}

function addDonation(e) {
    e.preventDefault();
    var name = e.target['name'].value,
        amount = e.target['amount'].value,
        id = parseInt(e.target['id'].value, 10);
        
        data.results[id].donations.push({donor: name, amt: amount, date: Date.now()});
        
        console.log(data.results[id].donations);
        
        window.location.href = '#page/' + id;
}

function addRoute(path, callback) {
    routes[path] = callback;
}

function displayRoute() {
    el = el || document.getElementById('app'),
        route = window.location.hash.split('/');
    
    if (route[0] === '#page') {
        routes[route[0]](parseInt(route[1], 10));
    }
    
    if (route[0] === '#home' || route[0] === '') {
        routes[route[0]]();
    }
    
    if (route[0] === '#donate') {
        routes[route[0]]((parseInt(route[1], 10)));
    }
    
    console.log('displayRoute()');
}

var routes = {}, el;

addRoute('', home);
addRoute('#home', home);
addRoute('#page', page);
addRoute('#donate', donate);
        
window.addEventListener('load', displayRoute, false);
window.addEventListener('hashchange', displayRoute, false);
