(function () {
	var input = document.getElementById("images"), 
		formdata = false;

	if (window.FormData) {
  		formdata = new FormData();
  		document.getElementById("btn").style.display = "none";
	}
	
 	input.addEventListener("change", function (evt) {
 	
 		var i = 0, len = this.files.length, img, reader, file;
	
		for ( ; i < len; i++ ) {
			file = this.files[i];
	
				if ( window.FileReader ) {
					reader = new FileReader();
					reader.onloadend = function (e) { 

					};
					reader.readAsDataURL(file);
				}
				if (formdata) {
					formdata.append("images[]", file);
				}
			
		}
	
		if (formdata) {
			$.ajax({
				url: "../editor/scripts/html_upload.php",
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data) {
						
					var name = data.substring(data.lastIndexOf('/')+1);
				
					var filename = name.substring(0,name.lastIndexOf('.'));
					var ext = data.substr( (data.lastIndexOf('.') +1) );
					
					var year = $('#year').val();
					var month = $('#month').val();
					var day = $('#day').val();
					
					$(location).attr('href',data);
				
				}
			});
		}
	}, false);
}());