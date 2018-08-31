
$(document).ready(function () {

    var numberOfCommands = 0;
    // Attach listeners to arrows
    $('#arrow-up').click(function (e) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-up img').attr('src','/img/arrow-up-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-up.png');
            newImage.addClass('queue-image');
            $('#queue').append(newImage);
            var commString = $('#command-string').val();
            commString += ' forward';
            $('#command-string').val(commString);
        }
    });
    $('#arrow-down').click(function (xe) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-down img').attr('src','/img/arrow-down-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-down.png');
            newImage.addClass('queue-image');
            $('#queue').append(newImage);
            var commString = $('#command-string').val();
            commString += ' backward';
            $('#command-string').val(commString);
        }
    });
    $('#arrow-left').click(function (xe) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-left img').attr('src','/img/arrow-left-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-left.png');
            newImage.addClass('queue-image');
            $('#queue').append(newImage);
            var commString = $('#command-string').val();
            commString += ' left';
            $('#command-string').val(commString);
        }
    });
    $('#arrow-right').click(function (xe) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-right img').attr('src','/img/arrow-right-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-right.png');
            newImage.addClass('queue-image');
            $('#queue').append(newImage);
            var commString = $('#command-string').val();
            commString += ' right';
            $('#command-string').val(commString);
        }
    });
});

function clearClasses() {
   $('#arrow-up img').attr('src','/img/arrow-up.png');
   $('#arrow-down img').attr('src','/img/arrow-down.png');
   $('#arrow-left img').attr('src','/img/arrow-left.png');
   $('#arrow-right img').attr('src','/img/arrow-right.png');
}
