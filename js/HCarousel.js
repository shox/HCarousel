(function(){
    /**
     * HCarousel
     *
     * @constructor
     */
    function HCarousel(options){

        this.options = {
            'maxRetry':1,
            'imgSelector':'img',
            'parentSelector':'.carousel',
            'nextSelector':'.next',
            'prevSelector':'.prev',
            'webService':"js/data_seed.json"
        };

        //set default options
        this.options = $.extend(this.options, options);

        this._currentUserID = 1;
        this._activeIndex =-1;

        //cache the jquery object
        this.$el = $(this.option('parentSelector'));

    }

    /**
     * Init
     */
    HCarousel.prototype.init = function(){
        var self = this;
        this.getNextImage();
        this.getNextImage();

        /* Init event listener */
        $(this.option('nextSelector')).click(function(){
            self.getNextImage();
            self.showNextImage();
        });

        $(this.option('prevSelector')).click(function(){
            self.showPrevImage();
        });

    };


    /**
     * option getter
     */
    HCarousel.prototype.option = function(key){
        return this.options.hasOwnProperty(key)?this.options[key]:undefined;
    };


    /**
     * showPrevImage
     */
    HCarousel.prototype.showPrevImage = function(){
        var imgs=this.getImages();
        imgs.eq(this._activeIndex).removeClass('active');
        this.prevIndex();
        imgs.eq(this._activeIndex).addClass('active');
    };


    /**
     * showNextImage
     */
    HCarousel.prototype.showNextImage = function(){
        this.getImages().eq(this._activeIndex).removeClass('active');
        this.nextIndex();
        this.getImages().eq(this._activeIndex).addClass('active');
    };


    /**
     * getImages
     *
     * @returns {object}
     */
    HCarousel.prototype.getImages = function(){
        var parentSelector = this.option('parentSelector'),
            imgSelector=this.option('imgSelector');

        return this.$el.find(imgSelector);
    };


    /**
     * prevIndex
     */
    HCarousel.prototype.prevIndex = function(){
        this._activeIndex = (this._activeIndex>0)?--this._activeIndex:this._activeIndex;
    };


    /**
     * nextIndex
     */
    HCarousel.prototype.nextIndex = function(){
        var imgs=this.getImages(), imgCount=imgs.length;

        this._activeIndex = (this._activeIndex<imgCount && imgCount != 0)?++this._activeIndex:this._activeIndex;//Or zero ?
    };


    /**
     * nextIndex
     */
    HCarousel.prototype.reset = function(){
        this.$el.html('');
        this._currentUserID = 1;
        this._activeIndex =-1;
    };

    /**
     * getNext Image
     * @param cb{function}
     */
    HCarousel.prototype.getNextImage = function(cb){
        var tryCount= 0, userId=this.getUserId(), self=this,cb=cb||function(){};
        //get next user id
        this.nextUser();

        $.getJSON(this.option('webService'),{
            userId:userId
        },function( data ) {
            self.appendNextImg(data['profilePicture'],userId);
            cb();
        }).fail(function(){
                if(tryCount<=self.maxRetry){
                    $.getJSON(this);
                    tryCount++;
                }
                else{
                    alert('Oops, an error happen please try again later!');
                }
            });
    };


    /**
     * nextUser
     */
    HCarousel.prototype.nextUser=function(){
        this._currentUserID = this._currentUserID+1;
    };


    /**
     * appendNextImg
     */
    HCarousel.prototype.appendNextImg = function(imgUrl,userId){
        var randURL = rnd()+'?s=300&d=identicon&r=PG'; // just for generate random images
        this.$el.append('<img src="'+imgUrl+randURL+'" data-user-id="'+userId+'"/>');
        if( this.getImages().length === 1 ){
            this.showNextImage();
        }
    };


    /**
     * getUserId
     */
    HCarousel.prototype.getUserId = function () {
        return this._currentUserID;
    };

    function rnd(){
        return Math.floor(10000*Math.random());
    }
    //expose to outside scope
    window.HCarousel = HCarousel;
})();