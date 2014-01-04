HCarousel
=========

###Tests
To run tests please set DEBUG in the index.html to true.
Note: when DEBUG is set to true the main example will not run.

###Usage
JavaScript code:
```
$(document).ready(function(){
    if( DEBUG == false ){
        var ca = new HCarousel();
        ca.init();
    }
});
```
HTML code example:
```
<div class="carousel-container">
    <div class="carousel">

    </div>
    <button class="prev">Prev</button>
    <button class="next">Next</button>
</div>

```
###Options

```
HCarousel({
            'maxRetry':1,//How many retry before fail
            'imgSelector':'img',//img selector in the container
            'parentSelector':'.carousel',//parent element selector
            'nextSelector':'.next',//next button selector
            'prevSelector':'.prev',//prevoius button selector
            'webService':"js/data_seed.json"//webservice url
})
```
