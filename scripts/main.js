(function() {
	function updateDateTime() {
		var date = new Date();

		container.innerText = date.toLocaleTimeString();
	}

	var container = document.body.appendChild(document.createElement("h1"));

	updateDateTime();
	setInterval(updateDateTime, 1000);
})();