$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        $.map(data, function (post, i) {
            $('#result').append
                (
                    '<h3 id="ptit">' + post.title + '</h3><p class="text-truncate d=block font-italic" id="pbo">' + post.body + '</p>' +
                    '<a class="btn btn-primary" id="getInfo" role="button" href="#detailPost" onClick="postDetail(' + post.id + ')">More Details</a>'
                )
        });
    });

    $('#spin').hide();

    $('#submit').click(function (e) {
        console.log('data submitted!');
        $('#spin').show();
    });

    $('#formInput').unbind().submit(function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var body = $('#body').val();
        var url = $(this).attr('action');
        $.post(url, { title: title, body: body }).done(function (data) {
            alert('Your data has been submitted!');
            console.log(data);
            $('#spin').hide(1000);
            $('#result').append
                (
                    '<h3 class="mt-1">' + title + '</h3><p class="text-truncate d=block font-italic">' + body + '</p>' +
                    "<span class='font-weight-bold mb-2'>Because it's a simple example so the new post can only be shown up without the id for more details after the old posts</span>"
                );
            $('#title').val("");
            $('#body').val("");
        });
    });
});




//async function to get the details of a post by id
async function postDetail(id) {
    let resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let data = await resp.json();

    //populate the Post Details section
    //fixed: set some div text to an empty string to prevent from looping them
    $('#info').remove();
    $('#dtitle').text("");
    $('#dId').text("");
    $('#dBody').text("");
    $('#dtitle').text("Post title: " + data.title);
    $('#dId').text("Post Id: " + data.id);
    $('#dBody').append('<h5 class="font-weight-bold">Content:</h5>', data.body);
};
