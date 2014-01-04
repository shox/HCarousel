if( DEBUG ){
    test('HCarousel()', function() {

        // Creation check
        ok( typeof HCarousel == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).showNextImage == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).showPrevImage == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).getNextImage == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).option == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).getUserId == 'function' ,'Check if HCarousel is object');
        ok( typeof (new HCarousel()).prevIndex == 'function' ,'Check if HCarousel is object');

    });

    test('HCarousel option method', function() {
        //test option method
        var ca = new HCarousel();
        equal(ca.option('maxRetry'),1,'check option method maxRetry ');
        equal(ca.option('imgSelector'),'img','check option method imgSelector');
        equal(ca.option('parentSelector'),'.carousel','check option method parentSelector');
        equal(ca.option('foo'), undefined,'check option method not exists');
    });

    test('HCarousel nextUser/prevUser method', function() {
        var ca = new HCarousel();
        ca.nextUser();
        equal(ca.getUserId(),2,'next user id');
        ca.nextUser();
        equal(ca.getUserId(),3,'next user id');
        ca.nextUser();
        equal(ca.getUserId(),4,'next user id');
    });


    asyncTest('HCarousel next/prev index test', function(){
        var ca = new HCarousel();
        ca.reset();
        ca.prevIndex();
        equal(ca._activeIndex,-1,'prevIndex prev zero');

        ca.nextIndex();
        equal(ca._activeIndex,-1,'next index method');

        ca.getNextImage(function(){
            start();
            ca.nextIndex();
            equal(ca._activeIndex,1,'next index method');
        });


    });


    asyncTest('HCarousel appendNewImgTest', function(){

        var ca = new HCarousel();
        ca.reset();
        ca.getNextImage(function(){
            start();
            notEqual($('.carousel').html(),'','Empty content');
            //equal($('.carousel').html(),'<img src="https://www.google.ps/images/srpr/logo11w.png" data-user-id="1" class="active">','Empty content');
        });


    });
}