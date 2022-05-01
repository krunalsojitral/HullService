 
new WOW().init();

// fixed header
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

$(function(){
	$('[role=dialog]')
		.on('show.bs.modal', function(e) {
			$(this)
				.find('[role=document]')
					.removeClass()
					.addClass('modal-dialog ' + $(e.relatedTarget).data('ui-class'))
	})
})

