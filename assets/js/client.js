

$( document ).ready(function() {

    var $celestBody = $("#celestBody");
    var $star = $('#star');
    var $planet = $('#planet');
    var $moon = $('#moon');
    var $cometAndAsteroid = $('#cometAndAsteroid');

    /* show/hide fields based on celestial body type */
    $celestBody.change(function() {

        if ($(this).val() === "star") {
            $star.show();
        } else {
            $star.hide();
        }

        if ($(this).val() === "planet") {
            $planet.show();
        } else {
            $planet.hide();
        }

        if ($(this).val() === "moon") {
            $moon.show();
        } else {
            $moon.hide();
        }

        if ($(this).val() === "comet" || $(this).val() === "asteroid") {
            $cometAndAsteroid.show();
        } else {
            $cometAndAsteroid.hide();
        }

    });
    $celestBody.trigger("change");

});