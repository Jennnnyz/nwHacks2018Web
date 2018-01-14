$(document).ready(function(){
    $("button").click(function(){
        $.ajax({
            type: "POST",
            url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en",
            data: {
                "url": "https://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg",
            },
            success: function(result) {
                alert('ok');
            },
            error: function(result) {
                alert('error');
            }
        });
    });
});
