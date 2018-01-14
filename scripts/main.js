var list = [];

function processImage() {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "8b8088dc0ad843ac88b90376867ea123";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

        // Request parameters.
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("imgInput").value;
        document.getElementById("myImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
			document.getElementById("result").style.display = "block";
			var display = null;
			if(data.categories[0] != null ) {
				var category = data.categories[0].name;
				var display = category;

				list.forEach((scavenge_item) => {
					if (category == scavenge_item.id) {
						display = scavenge_item.name;
					}
				})
			}
			else {
				display = "no objects found";
			}
            $("#myText").val(display);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    };

function getList(){
    function populateList(data){
        list = JSON.parse(data);
        for(var i = 0 ; i < list.length; i++){
            document.getElementById("item" + i).innerHTML = list[i].name;
        }
    }
var xhr = new XMLHttpRequest();
    xhr.open("GET","https://2018nwhacks.azurewebsites.net/games/0/items");

    xhr.onload = function() {
            if(this.status === 200){
                populateList(xhr.responseText);
            }
    };
    xhr.send();
}

function submitImg(category){
    function populateList(data){
        var list = JSON.parse(data);
        for(var i = 0 ; i < list.length; i++){
            document.getElementById("item" + i).innerHTML = list[i].name;
        }
    }
var xhr = new XMLHttpRequest();
    xhr.open("GET","https://2018nwhacks.azurewebsites.net/games/0/items");

    xhr.onload = function() {
            if(this.status === 200){
                populateList(xhr.responseText);
            }
    };
    xhr.send();
}

getList();
