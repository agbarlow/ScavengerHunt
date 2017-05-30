/*Code below removes the New Team field if the user
has selected an existing team to join -SB*/
$(document).ready(function() {
    $('#sel1').on('change', function() {
        if (this.value == 'default') {
            $("#new-team").show();
        } else {
        	$("#newTeamName").val('');
            $("#new-team").hide();
        }
    });

  	$('#question0').submit(function() {
  		event.preventDefault();
 		alert($('input[name=optradio]:checked', '#question0').val()); 
    });
    
    $('#question1').submit(function() {
      event.preventDefault();
      alert($('input[name=optradio]:checked', '#question1').val());
  	});
});
