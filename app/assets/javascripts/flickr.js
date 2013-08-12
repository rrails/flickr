$(document).ready(function(){
  var index;
  var photos;
  var timer;
  var page = 1;


  var search_flickr = function(){
    var search = $('#search').val();

    var results = function(data){
      var delay = parseInt($('#delay').val());
      delay = delay * 1000;
      index = 0;
      photos = data.photos.photo;
      if (photos.length > 0){
      timer = setInterval(display_photo, delay);
      };
    };

    var display_photo = function(){
      var photo = photos[index++];
      var width= $('#width').val();
      var height= $('#height').val();
      if (photo !== undefined){
        var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
        var $image = $('<div/>').addClass('image');

        $image.css({
          'background-image': url,
          'background-size': 'cover',
          'width': width,
          'height': height
        });
        // if (index > 1){
        //   $('#images').empty();
        // }

        $('#images').prepend($image);
        $image.hide().fadeIn();
      }else{
        clearInterval(timer);
        page = page + 1;
        $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=17e9c33a8bbdd3eea45a9aebcaa91958&text=' + search + '&per_page=500&page=' + page + '&format=json&jsoncallback=?', results);
      };
    };
        $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=17e9c33a8bbdd3eea45a9aebcaa91958&text=' + search + '&per_page=500&page=' + page + '&format=json&jsoncallback=?', results);
  };


  $('#flickr').click(search_flickr);

  var clear_photos = function(){
    clearInterval(timer);
  };

  $('#stop').click(clear_photos);

});