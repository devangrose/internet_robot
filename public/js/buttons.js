
$(document).ready(function () {

    var numberOfCommands = 0;
    // Attach listeners to arrows
    $('#arrow-forward').click(function (e) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-forward img').attr('src','/img/arrow-forward-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-forward.png');
            newImage.addClass('queue-image');
            $('#queue').append(newImage);
            var commString = $('#command-string').val();
            commString += ' forward';
            $('#command-string').val(commString);
        }
    });
    $('#arrow-backward').click(function (e) {
        clearClasses();
        numberOfCommands++;
        $('#arrow-backward img').attr('src','/img/arrow-backward-red.png');
        if(numberOfCommands < 10) {
            var newImage = $('<img>');
            newImage.attr('src','/img/arrow-backward.png');
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
    $('.delete-btn').click(function (e) {
        var id = $(this).data('id');
        console.log(id);
        var url = "/commands/" + id;
        console.log(url);
        $.ajax({
            method: "DELETE",
            url: url 
        }).done(function (e) {
            window.location="/profile";
        }).fail(function (err) {
            console.log(err);  
        });
    });
});

function clearClasses() {
   $('#arrow-forward img').attr('src','/img/arrow-forward.png');
   $('#arrow-backward img').attr('src','/img/arrow-backward.png');
   $('#arrow-left img').attr('src','/img/arrow-left.png');
   $('#arrow-right img').attr('src','/img/arrow-right.png');
}
