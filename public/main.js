
$(document).ready(function() {
// write your code here
 $.getJSON("http://localhost:3000/data", function(data) {       
    var name;
    var description;
    var location;
    var select = document.getElementById("start")
   
        $.each(data, function (index, spots) {
        var tbl_row ='<tr>';
         name = spots.name;
         description = spots.description;
         location = spots.location;
          tbl_row += "<td>" + name + "</td>";
          tbl_row += "<td>" + description + "</td>";
          tbl_row += '<td><a id="google_maps" class="btn btn-primary btn-sm" href="https://www.google.com/maps?q='+location +'">Open in Google Maps' + '</a></td>';
          tbl_row += '</tr>';
          $("#t-body").append(tbl_row);
          
          var options = document.createElement('option');
          options.innerHTML = spots.name;
          options.value = spots.name;
          select.appendChild(options); 
        
        });
       
 });
});
var pos, infoWindow;
var lat;
    var lng;
function initMap() {
        
       var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: new google.maps.LatLng(32.727827, -117.145326),
        });
        
       directionsDisplay.setMap(map);
       var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
          
        }
        document.getElementById('start').addEventListener('change', onChangeHandler);
        
  
    $.getJSON('http://localhost:3000/data', function(data){
      //var lat;
      //var lng;
      infoWindow = new google.maps.InfoWindow();

      $.each(data, function (index, spots) {
      lat = spots.location[0];
      lng = spots.location[1];
    
      var latlng = new google.maps.LatLng(lat,lng);
      var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: spots.name
      });

    (function(marker, data) {

  // Attaching a click event to the current marker
  google.maps.event.addListener(marker, "mouseover", function(e) {
    infoWindow.setContent("<b>"+spots.name + "</b>: " +spots.description);
    infoWindow.open(map, marker);
    });

    })(marker, data);
      
    });
  });
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('location found');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        } 
         
        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: pos,
          destination: document.getElementById('start').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
       

    
}