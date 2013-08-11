(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_cleanup', function () {
    	jQuery("#cboxWrapper .node__title").remove();
    });
	$(document).bind('cbox_complete', function () {
		// jQuery(".isotope-element").css("z-index", "1");
    	jQuery("#cboxWrapper").prepend(jQuery("#colorbox .node__title"));
	   	jQuery("#colorbox, #cboxOverlay, #cboxWrapper").css({"overflow": "visible"});
	 

      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
