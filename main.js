$(function() {
  $.getJSON('https://u5ahj50at7.execute-api.us-east-1.amazonaws.com/prod', function(data) {

    $('#frame').animate({'opacity': '1.0'}, 1000);

    var lon = parseFloat(data['coordinates'][0]);
    var lat = parseFloat(data['coordinates'][1]);

    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=false', function(data) {
      $('#address span').html(data['results'][0]['formatted_address']);
    });

    $('#time span').html(data['utc']);
    $('#title').html(data['address']);

    var map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng(lat, lon),
      zoom: 7,
      maxZoom: 7,
      minZoom: 7,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var detailmap = new google.maps.Map(document.getElementById("detailmap"), {
      center: new google.maps.LatLng(lat, lon),
      zoom: 14,
      maxZoom: 14,
      minZoom: 14,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: detailmap
    });
    marker.setIcon(new google.maps.MarkerImage('/images/markers/dot/circle.png'));
  });
});
