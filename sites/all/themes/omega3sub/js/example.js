Drupal.behaviors.halely_omega_subthemeExampleBehavior = {
  attach: function (context, settings) {
	  	var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
		window.addEventListener(orientationEvent, function(e) {
		        jQuery("#isotope-container [trans]").each(function(i, val){
		        	jQuery(val).attr("trans", "");
		        });
		}, false);
  		/*jQuery.getScript("/misc/jquery.ba-bbq.js");*/
    	jQuery(".views-fluidgrid-item-inner .field-content >div").each(function(i, val){
			var cs = jQuery(val).attr("class"); 
			var tit = cs + " -- " +jQuery("img", val).attr("title"); 
			jQuery("img", val).attr("title",tit);
			jQuery(val).bind("mouseover mouseout", function(e){
				jQuery('#'+cs).toggleClass("active-trail");
			});
			jQuery(val).bind("mouseover", function(e){
				var rand = Math.round( Math.random() * (-5 - 5) + 5);
				jQuery(val).css("transform","scale(1.1) rotateZ("+rand+"deg)");
			});
		});
	
	    jQuery("[nid]").live("click", function(e){
	    	jQuery(".isotope-element").css("z-index","1");
	    	var nid = jQuery(e.currentTarget).attr("nid");
	        jQuery.colorbox({href:"/get_node/"+nid,"width": window.innerWidth * 0.80 ,"height":window.innerHeight * 0.80});
	    });
    
		jQuery(".isotope-element").bind("mouseover", function(e){
		    that = jQuery(e.currentTarget);
			if(!jQuery("html").hasClass("no-csstransforms3d")){
				var transform = "transform";
			} 
    		jQuery(".views-field-title,.views-field-type", that).removeClass("fadeout").addClass("fadein");
   		    if(typeof(that.attr("trans")) === "undefined" || that.attr("trans") === ""){    	
   				if (transform !== "transform"){
    				var t = "matrix(1, 0, 0, 1, "+jQuery(that).css("translate").toString(',')+")";	
    			} else {
    				var t = jQuery(that).css("transform");    		    		
    			}
    			jQuery(that).attr("trans",t);
		   	} else {
		   		var t = jQuery(that).attr("trans");
		   	}
   	
   			if(jQuery(that).attr("data-category") === "שותפים"){
   				if (transform === "transform"){
    				jQuery(that).css({transform  : t.replace(/1,/g, '1.5,').replace(/0,/g, Math.random()*(Math.floor(Math.random()*2.01) - 1.00)+',') ,"z-index":"99999"}).addClass("shadow");    
   				}		else	{
    				jQuery(that).css({"-webkit-transform"  : t.replace(/1,/g, '1.5,').replace(/0,/g, Math.random()*(Math.floor(Math.random()*2.01) - 1.00)+',') ,"z-index":"99999"}).addClass("shadow");       			
   				}   		
   			} else {
   				if (transform === "transform"){
    				jQuery(that).css({transform : t.replace(/1,/g, '1.05,') ,"z-index":"99999"}).addClass("shadow");
    			}else{
    				jQuery(that).css({"-webkit-transform" : t.replace(/1,/g, '1.05,') ,"z-index":"99999"}).addClass("shadow");
    			}    	    
   			}
		}).bind("mouseout", function(e){
			that = jQuery(e.currentTarget);	
			t = that.attr("trans");	
			jQuery(that).css({transform : t ,"z-index":"1"}).removeClass("shadow");	    
			jQuery(that).css({"-webkit-transform"  : t, "z-index":"1"}).removeClass("shadow");	    
			// jQuery(that).css({});
		    jQuery(".views-field-title,.views-field-type", that).addClass("fadeout").removeClass("fadein");
		});
	
	if(window.location.pathname === "/"){	
		jQuery('.menu a').each(function(i, val){
			jQuery(val).attr("state", "off");
		    jQuery(val).bind("click", function(e){
		        jQuery("#isotope-container [trans]").each(function(i, val){
		        	jQuery(val).attr("trans", "");
		        });
		        var type = jQuery(e.currentTarget).text().trim();
		        
		        if(type !== "צור קשר" && type !== "בלוג" ){		        	
		        	e.preventDefault(); 
		        	if(jQuery(e.currentTarget).attr("state") === "off" && type !== "הכל"){        	
		        		jQuery(".menu a").attr("state", "off").removeClass('active-i');        	        
		        		jQuery('#isotope-container').isotope({ filter: '.'+type  });
		        		jQuery(e.currentTarget).attr("state", "on").addClass('active-i');
		        	} else {
		        		jQuery(".menu a").attr("state", "off").removeClass('active-i');
		        		if( type === "הכל"){
		        			jQuery(e.currentTarget).attr("state", "on").addClass('active-i');
		        		}
		        		jQuery('#isotope-container').isotope({ filter: '*'  });
		        	}
        			if(jQuery(e.currentTarget).attr("href") !== "/#about"){
	        	 		var href = jQuery(e.currentTarget).attr('href').replace( /^\/#/, '' ),
        	 		    option = jQuery.deparam( href, true );				    
					  	// set hash, triggers hashchange on window
					  	jQuery.bbq.pushState( option );	
		        		return false;
	        		}
	        }
	    });
	});
    jQuery(window).bind( 'hashchange', function( event ){
		jQuery(".menu a").attr("state", "off").removeClass('active-i');
		
  		// get options object from hash
  		var hashOptions = jQuery.deparam.fragment();
  		
		
  		// apply options from hash
  		if(typeof(hashOptions["filter"]) === "undefined" || hashOptions["filter"] === "*" ){
  			jQuery("aside, aside .block-views").hide();
  			jQuery("#region-content").removeClass("grid-10").addClass("grid-12");
  			jQuery('#isotope-container').isotope( { filter : '*'});
  			jQuery(".menu li:first-child a").attr("state", "on").addClass('active-i');
  		} else {
  			jQuery("#region-content").removeClass("grid-12").addClass("grid-10");
  			jQuery("aside").css("display","inline");
  			jQuery("aside .block-views").not("[data-set="+hashOptions["filter"]+"]").hide("slow");
  			jQuery("aside [data-set="+hashOptions["filter"]+"]").show("fast");
  			jQuery("[href*="+hashOptions["filter"]+"]").attr("state", "on").addClass('active-i');
			jQuery('#isotope-container').isotope( { filter : '.'+hashOptions["filter"]});
  		}
  			
		console.log("haschagne = "+hashOptions["filter"]);
	}).trigger('hashchange');
    
	}
	// Blog
	jQuery(".view-id-blog.view-display-id-block a").each(function(i, val){
	    jQuery(val).bind("click", function(e){
	        e.preventDefault();
	        var tid = jQuery(val).attr("href").replace(/\/term\//i, "");
	         jQuery("#block-views-exp-test-page-1 #edit-created-min").val("");
	        jQuery("#block-views-exp-test-page-1 #edit-created-max").val("");
	        jQuery("#block-views-exp-test-page-1 #edit-tid [value="+tid+"]").attr("selected","selected");
	        jQuery("#block-views-exp-test-page-1 #edit-tid").change();
	        return false;
	    });
    });
    jQuery("#block-views-erchives-block a").each(function(i, val){
	    jQuery(val).bind("click", function(e){
	        e.preventDefault();
	        var href= jQuery(val).attr("href").replace(/\/posts-by-date\//i, "");
	        var min_date = href.substr(0,4)+"-"+href.substr(4,6);
	        var max_date = min_date+"-31";
	        jQuery("#block-views-exp-test-page-1 #edit-tid [value=All]").attr("selected","selected");
	        jQuery("#block-views-exp-test-page-1 #edit-created-min").val(min_date);
	        jQuery("#block-views-exp-test-page-1 #edit-created-max").val(max_date).change();
	        return false;
	    });    
	});
    
	jQuery(".delayImg").each(function() {
        this.onload = function() {
            jQuery(this).animate({opacity: 1}, 1000);
        };
        this.src = this.getAttribute("delayedSrc");
    });

}};