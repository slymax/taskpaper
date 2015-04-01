$(document).ready(function(){

	var site = new Bamboo();
	var client = new Dropbox.Client({ key: "xl9k48bu88uvp10" });

	// Dropbox Authentication
	client.authenticate(function(error, client) {
		if (error) {
			return showError(error);
		} else {
			get_files();
		}
	});

	// Load Files
	function get_files () {
		client.readdir("/", function(error, entries) {
			if (entries.length === 0) {
				$('#scroller').after('<div class="zero">NO FILES FOUND</div><div class="info">To get started, put some files into the Taskpaper folder inside your Dropbox.</div>');
			};
			if (error) {
		    	return showError(error);
		  	} else {
				for (var i = 0; i < entries.length; i++) {
					$('#list').append('<li id="' + entries[i] + '"><div class="element">' + entries[i] + '</div></li>');
					if (i === 0) {
						$('#list li:first-child').addClass('selected');
					};
				};
				read_file(entries[0]);
		  	}
		});
	}

	// Display File
	function read_file (name) {
		$('#title').text(name);
		client.makeUrl(name, { download: true }, function(error, url) {
			if (error) {
				return showError(error);
			} else {
				new TaskPaperPanel('#scratchTasks', url.url, 0);
			}
		});
	}

	// Switch Lists
	$('#list').on('click','li', function () {
		$('.taskDiv').html('');
	    read_file($(this).text());
	    $("#list li").removeClass("selected");
	    $(this).addClass('selected');
	});

});