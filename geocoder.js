$(document).ready(function() {
  $("#new_listing").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $(".btn-success").attr("disabled", "disabled");
    // get address from the form
    var address = $("#listing_address").val();
    var city_state = $("#listing_secondary_city_id").find(":selected").text();
    var zip = $("#listing_zip").val();
    // pass this data to geocoder function
    geocoder(address+', '+city_state+', '+zip);
    return false; 
  });
});

function geocoder(full_address) {
  var form$ = $("#new_listing");
  $.ajax({
    dataType: "json",
    url: "http://maps.googleapis.com/maps/api/geocode/json?sensor=false",
    data: { "address": full_address },
    success: function(data, textStatus){
      // insert long/lat in the form before it gets submitted
      form$.append("<input type='hidden' name='listing[longitude]' value='"+data.results.geometry.location.lng+"' />");
      form$.append("<input type='hidden' name='listing[latitude]' value='"+data.results.geometry.location.lat+"' />");
      // and submit
      form$.get(0).submit();
    }, 
    error: function(){
      $(".submit-button").removeAttr("disabled");
      $("#geocode-error").html("An error occured determining your location. Please try again.");
    }
  });
};



