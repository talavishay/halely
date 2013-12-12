Drupal.avishay = {};
Drupal.avishay.isMSIE = /*@cc_on!@*/0;

Drupal.avishay.dealyImg = function(){
	
	var elem = jQuery(".isotope-element ").filter(function() {
    	return jQuery(this).css("opacity") !== '0';
	});
	jQuery(".delayImg", elem ).each(function() {
			if(this.src === ""){
				this.onload = function() {
					jQuery(this).animate({
						opacity : 1
					// }, 1000);
					}, Math.round(Math.random()*10)*400);
				};
				this.src = this.getAttribute("delayedSrc");
			}
		});
}

Drupal.avishay.comment = function() {
	jQuery("[id*=comment]:not(.processed)").each(function(i, val) {
		var id = jQuery(val).attr("id");
		var com = jQuery(val).next();
		jQuery(val).wrap('<div id="' + id + '-wrap" class="comment_wrap"></div>');
		jQuery("#" + id + '-wrap').append(com);

	}).addClass('processed');

	jQuery(".child:not(.processed)").each(function(i, val) {

		var pid = jQuery(val).attr("class").replace(/(.*)child-(.*) (.*)/, "$2");
		var pid_com = jQuery('#comment-' + pid + '-wrap .comment')
		jQuery(pid_com).append(jQuery(val).parents(".comment_wrap"));

	}).addClass('processed');

}
Drupal.avishay.get_comments = function() {
	jQuery("article ").each(function(i, val) {
		var nid = jQuery(val).attr("nodenid");

		jQuery(".comment_count", val).bind("click", function(e) {
			jQuery(".comment_count", val).unbind();
			jQuery(e.currentTarget).append(jQuery('<div id="loading_comment">טוען תגובות</div>'));
			jQuery.ajax({
				"url" : "/get_comments/" + nid,
				"success" : function(data) {
					jQuery("#loading_comment").remove();
					jQuery(".comment_count nav.links", val).before(data);
					jQuery(".comment_count nav.links", val).show();
					jQuery(".comment_count", val).unbind();
				}
			});
		});
	});
}
Drupal.avishay.reshet_sidebar_height = function() {
	var block_menu = jQuery("[class*=block-menus]:visible");
	var bth = jQuery(".block-title", block_menu).height();
	var h = jQuery(".view-reshet").height();
	jQuery(".content", block_menu).css("min-height", h - (bth)+7);
}
function onAfter(curr, next, opts, fwd) {
     var ht = jQuery(this).height();

     //set the container's height to that of the current slide
//     jQuery(this).parent().animate({height: ht});
}
Drupal.avishay.fixSlideshow = function(dialog){
	var count = 0 ;
	timer = window.setInterval(function(){		
		if(count < 20){
			var h = jQuery("div.field-items img", dialog).first().height();
			if(h > 100){
				jQuery(".field-name-field-gallery .field-items", dialog).once().animate({
					"height" : jQuery("div.field-items img", dialog).first().height()
				},"slow",function(){
					jQuery("#nav").show("fast").css("display", "inline");
					window.clearInterval(timer);
				});	
			}
			console.log(h);
//			jQuery(".field-name-field-gallery .field-items", dialog).height();
//			console.log("tick");
			count++;
		} else {
			window.clearInterval(timer);
		}
			
	},100);
}
function open_popup_node(that, nid) {
	// var dialog= jQuery(".ui-dialog");
	var dialog = that;
	jQuery(dialog).load("/get_node/" + nid, function() {
		var images = jQuery(".field-name-field-gallery .field-items .field-item", dialog).length;
//		jQuery(images).imagesLoaded( function() {
//			jQuery(".field-name-field-gallery .field-items", dialog).height(jQuery("div.field-items img", dialog).first().height());
//		   console.log("onload");console.log(dialog);
//			Drupal.avishay.fixSlideshow(dialog)
//		});
		if (images > 1) {
			jQuery(" .field-name-field-gallery ", dialog).append(jQuery('<div id="nav"></div>')).prepend(jQuery('<div id="controls"><div id="first">first</div><div id="next">next</div><div id="last">last</div><div id="prev">prev</div></div>'));
			jQuery(" .field-name-field-gallery .field-items", dialog).cycle({
				fx : 'scrollHorz',
				pagerAnchorBuilder : pagerFactory,
				prev: '#next',
				next: '#prev', 
				pager : '#nav',
				timeout : 0,
				// rev : true,
				 nowrap: 1,
				   before: onAfter,
				   after: Drupal.avishay.fixSlideshow(dialog), 
//					   function(){
//					   var h = jQuery("div.field-items img:visible", dialog).height();
//					   jQuery(".field-type-image .field-items", dialog).height(h);
//					   .css("max-height", h+'px');
//					   console.log("after");
//				   },
				   slideResize: 0,
				   containerResize: 0
				   
			});
			jQuery("#first", dialog).bind("click", function(){
				jQuery(".field-name-field-gallery .field-items ", dialog).cycle(0);
			});
			jQuery("#last", dialog).bind("click", function(){
				jQuery(".field-name-field-gallery .field-items ", dialog).cycle(images-1);
				// jQuery("#nav span:nth-child("+(images-1)+")").addClass("activeSlide");
			});
			
			
		} else {
			jQuery(".ui-dialog .field-name-body").css({
			  "color"	: "#4F4D4D",
			  "font-size": "12px",
			  "height"	: "auto",
			  "margin"	: "0 auto",
			  "overflow": "visible",
			  "width"	: "98%"
			});
		};
		var text = jQuery(".node-title", dialog).text();
		var wrap_right = jQuery('<div id="wrap_right"></div>').append(jQuery('<div class="title">' + text + '</div>')).append(jQuery(".field-name-body", dialog));
		jQuery(".field-name-field-gallery", dialog).after(wrap_right);
		
//		 "more in projects" remove current node 
		 var nt = jQuery('article', dialog).attr("node-type");
		 jQuery('.view-project [nid]', dialog).each(function(i, val){
			 if(jQuery(val).text() === nt){
    			 jQuery(val).remove();
			 }
		 });
		 if(jQuery('.view-project [nid]', dialog).length === 0){
			 jQuery('.view-project', dialog).remove();
		 }
		
		jQuery("#wait, .ui-dialog-titlebar", dialog).remove();
		jQuery('[href^=\\/node]', dialog).bind("click",function(e){
		    e.preventDefault();
		    var nid = e.currentTarget.href.replace(/(.*)\/node\/(d*)/i, "$2");
			open_dialog(nid);
		    return false;
		});
		jQuery(dialog).prepend(jQuery("header",dialog));
		jQuery("article", dialog).prepend(jQuery("button"));
//		jQuery("header",dialog).css("top","-"+jQuery("header", dialog).height()+"px")
		jQuery("html, body").animate({ scrollTop: jQuery(".ui-dialog").offset().top-30 }, 500);
		jQuery(".title", dialog).click(function(){ 
			window.open(jQuery(".field-name-field-link a", dialog).first().attr('href'),'_blank');
		});
	});
}
function open_dialog(nid) {
		jQuery(".ui-dialog-content").dialog("close").remove();
		var width = 760, within = "#isotope-container";
		if (Drupal.omega.getCurrentLayout() == "fluid"){
			width = "100%";
			within = "body";
		}
	jQuery('<div></div>').dialog({
		width : width,
		// height: 4	00,
		position : {
			my : "center",
			at : "top",
			within : within
		},
		resizable : false,
		modal : true,
		draggable : false,
		show : "explode",
		open : function() {
			jQuery(this).append('<img style="margin: 20px auto;display: block;" id="wait" src="/sites/all/themes/omega3sub/images/busy.gif" />');
			jQuery('.ui-dialog').prepend(jQuery(".ui-dialog .ui-button"));
			jQuery(".ui-dialog-titlebar", this).remove();
			open_popup_node(this, nid);

		},
		close : function() {
			jQuery(this).dialog('destroy').remove();
		}
	});
}

Drupal.avishay.blog = function() {
	jQuery(".views-row .teaser").bind("click", function(e) {
		var row = jQuery(e.currentTarget).parents(".views-row");
		jQuery(".field-name-body", row).show();
		jQuery(e.currentTarget).hide();
	});
	// Blog
		jQuery(".view-id-blog.view-display-id-block a").each(function(i, val) {
			jQuery(val).bind("click", function(e) {
				e.preventDefault();
				jQuery("#block-views-erchives-block li, #block-views-blog-block li").removeClass("active");
				jQuery(e.currentTarget).parent("li").addClass("active");
				var tid = jQuery(val).attr("href").replace(/\/term\//i, "");
				jQuery("#block-views-exp-test-page-1 #edit-created-min").val("");
				jQuery("#block-views-exp-test-page-1 #edit-created-max").val("");
				jQuery("#block-views-exp-test-page-1 #edit-tid [value=" + tid + "]").attr("selected", "selected");
				jQuery("#block-views-exp-test-page-1 #edit-tid").change();
				jQuery("#block-views-exp-test-page-1 #edit-submit-test").click();
				return false;
			});
		});
		jQuery("#block-views-erchives-block a").each(function(i, val) {
			jQuery(val).bind("click", function(e) {
				e.preventDefault();
				jQuery("#block-views-erchives-block li, #block-views-blog-block li").removeClass("active");
				jQuery(e.currentTarget).parent("li").addClass("active");
				var href = jQuery(val).attr("href").replace(/\/posts-by-date\//i, "");
				var min_date = href.substr(0, 4) + "-" + href.substr(4, 6);
				var max_date = min_date + "-31";
				jQuery("#block-views-exp-test-page-1 #edit-tid [value=All]").attr("selected", "selected");
				jQuery("#block-views-exp-test-page-1 #edit-created-min").val(min_date);
				jQuery("#block-views-exp-test-page-1 #edit-created-max").val(max_date).change();
				jQuery("#block-views-exp-test-page-1 #edit-submit-test").click();
				return false;
			});
		});
}
Drupal.avishay.about = function() {
	if (jQuery(".node-type-about").length) {
		var t = jQuery("#block-views-menus-block-6 .block-title").height();
		var h = jQuery("#block-system-main").height();
		var img = jQuery('<img id="arrow" src="/sites/all/themes/omega3sub/images/studio_arrow.png"/>');
		var close = jQuery('<div id="close_btn"></div').css({
			"position" : "absolute",
			"left" : "10px",
			"top" : "10px"
		}).bind("click", function() {
			jQuery("#node-about-188 .field-name-body .field-items").hide("slow");
			jQuery("#toggle").css("background", "url(/sites/all/themes/omega3sub/images/studio-bird-+.png) no-repeat");
		});
		if (jQuery(".page-node-188").length) {
			var toggle = jQuery('<div id="toggle"></div').css({
				background : 'url("/sites/all/themes/omega3sub/images/studio-bird-~.png") no-repeat scroll center center transparent',
				position : "absolute",
				right : "159px",
				top : "27px",
				width : "29px",
				height : "29px",
				"z-index" : 1,
				cursor : "pointer"
			}).bind("click", function(e) {
				jQuery("#node-about-188 .field-name-body .field-items").show("slow");
				jQuery("#toggle").css("background", 'url("/sites/all/themes/omega3sub/images/studio-bird-~.png") no-repeat scroll center center transparent');
			});
			jQuery("#node-about-188 .field-name-body").before(toggle)
			jQuery("#node-about-188 .field-name-body .field-items .field-item").prepend(img).append(close);
			;

		}
		if (jQuery(".page-node-213").length) {
			var img = jQuery('<img id="about_dog" src="/sites/all/themes/omega3sub/images/about_dog.png"/>');
			jQuery("#block-views-menus-block-6 .content").after(img);
			jQuery("#block-views-menus-block-6 .content").height(h - (t + 13) - 63);
		} else {
			jQuery("#block-views-menus-block-6 .content").height(h - (t + 13));
		}
	}
}
function pagerFactory(idx, slide) {
//	var s = idx > 2 ? ' style="display:none"' : '';
//	return '<span' + s + '><a href="#">' + (idx + 1) + '</a></span>';
	return '<span><a href="#">' + (idx + 1) + '</a></span>';
};
Drupal.behaviors.omega3sub = {
	attach : function(context, settings) {
		if (jQuery("body").hasClass("page-בלוג") | jQuery("body").hasClass("node-type-blog") ) {
			Drupal.avishay.get_comments();
			Drupal.avishay.blog();
		}
		Drupal.avishay.about();
		jQuery(".isotope-element").bind("mouseover", function(e) {
			that = jQuery(e.currentTarget);
			jQuery(".views-field-title,.views-field-type", that).removeClass("fadeout").addClass("fadein");
			if(!Drupal.avishay.isMSIE){
				if ( typeof (that.attr("trans")) === "undefined" || that.attr("trans") === "") {
					if (Drupal.avishay.transform !== "transform") {
						var matrix = "matrix(1, 0, 0, 1, " + jQuery(that).css("translate").toString(',') + ")";
					} else {
						var matrix = jQuery(that).css("transform");
					}
					jQuery(that).attr("trans", matrix);
				} else {
					var matrix = jQuery(that).attr("trans");
				}
				if (Drupal.avishay.transform === "transform") {// Firefox
					jQuery(that).css({
						transform : matrix.replace(/1,/g, '1.05,'),
						"z-index" : "9"
					}).addClass("shadow");
				} else {// Chrome
					jQuery(that).css({
						"-webkit-transform" : matrix.replace(/1,/g, '1.05,'),
						"z-index" : "9"
					}).addClass("shadow");
				}
			}
		}).bind("mouseout", function(e) {
			that = jQuery(e.currentTarget);
			jQuery(".views-field-title,.views-field-type", that).addClass("fadeout").removeClass("fadein");
			if(!Drupal.avishay.isMSIE){
				matrix = that.attr("trans");
				if (Drupal.avishay.transform === "transform") {// Firefox
					jQuery(that).css({
						transform : matrix,
						"z-index" : "1"
					}).removeClass("shadow");
				} else {// Chrome
					jQuery(that).css({
						"-webkit-transform" : matrix,
						"z-index" : "1"
					}).removeClass("shadow");
				}
			}
		}).bind("click", function(e) {
			var nid = jQuery(".views-field-nid", e.currentTarget).text();
			nid = nid.trim();
			var path = jQuery(".views-field-nid >div", e.currentTarget).attr("path");
			if (jQuery(e.currentTarget).attr("data-category") != "אודות") {
				open_dialog(nid);
			} else {
				window.location.href = path;
			}
		});

		if ( window.location.pathname === "/category") {
			jQuery('.menu a:not(#all)').not("#all").each(function(i, val) {
				jQuery(val).bind("click", function(e) {
					// clear transform history on elements
					jQuery("#isotope-container [trans]").each(function(i, val) {
						jQuery(val).attr("trans", "");
					});
					var type = jQuery(e.currentTarget).text().trim();
					if (type !== "צרו קשר" && type !== "בלוג") {
						e.preventDefault();
						if (type !== "הכל") {
							jQuery(".menu a").attr("state", "off").removeClass('active-i');
							jQuery('#isotope-container').isotope({
								filter : '.' + type
							});
							jQuery(e.currentTarget).attr("state", "on").addClass('active-i');
						} else {
							jQuery(".menu a").attr("state", "off").removeClass('active-i');
							if (type === "הכל") {
								jQuery(e.currentTarget).attr("state", "on").addClass('active-i');
							}
							jQuery('#isotope-container').isotope({
								filter : '*'
							});
						}
						if (jQuery(e.currentTarget).attr("href") !== "/#about") {
							var href = jQuery(e.currentTarget).attr('href').replace(/^\/#/, '');
							href = href.replace(/\/category#/, '');
							
							var option = jQuery.deparam(href, true);
							// set hash, triggers hashchange on window
							jQuery.bbq.pushState(option);
							return false;
						}
					}
				});
			});
			jQuery(window).bind('hashchange', function(event) {
				jQuery(".menu a").removeClass('active-i');
				jQuery(".ui-dialog").remove();
				
				// get options object from hash
				var hashOptions = jQuery.deparam.fragment();

				// apply options from hash
				if ( typeof (hashOptions["filter"]) === "undefined" || hashOptions["filter"] === "*") {
					jQuery("aside, aside .block-views").hide();
					jQuery("#region-content").removeClass("grid-10").addClass("grid-12");
					jQuery('#isotope-container').isotope({
						filter : '*'
					}, (function(){
						try{
							if(jQuery('.isotope-element').length >= 1){
									Drupal.avishay.dealyImg();
						
								var transition_duration = jQuery('.isotope').first().css("transition-duration").replace(/s/i, "")*1000;
								setTimeout(function(){
						
								}, transition_duration);
							}
						} catch(e){		}
						})());
					jQuery(".menu li:first-child a").attr("state", "on").addClass('active-i');
					
				} else {
					jQuery("#region-content").removeClass("grid-12").addClass("grid-10");
					jQuery("aside").css("display", "inline");
					jQuery("aside .block-views").not("[data-set=" + hashOptions["filter"] + "]").hide("slow");
					jQuery("aside [data-set=" + hashOptions["filter"] + "]").show("fast");
					jQuery("[href*=" + hashOptions["filter"] + "]").attr("state", "on").addClass('active-i');
					jQuery('#isotope-container').isotope({
						"filter" 	: '.' + hashOptions["filter"],
						"onLayout"	: Drupal.avishay.reshet_sidebar_height(),
						"complete"	: Drupal.avishay.reshet_sidebar_height(),
					}, (function(){
						try{
							if(jQuery('.isotope-element').length >= 1){
									Drupal.avishay.dealyImg();
						
								var transition_duration = jQuery('.isotope-element').first().css("transition-duration").replace(/s/i, "")*1000;
								window.setTimeout(function(){
									Drupal.avishay.reshet_sidebar_height();
								}, transition_duration);
							}
						} catch(e){		}
						})()
					);					
				}
				// jQuery("html, body").animate({ scrollTop: jQuery('#isotope-container').offset().top }, 1000);
				jQuery("html, body").animate({ scrollTop: 0 }, 1000);
				// console.log("haschagne = " + hashOptions["filter"]);
			});
			// }).trigger('hashchange');
		}
		
		

	}
};

jQuery(document).ready(function() {
	// Drupal.avishay.comment();
	var site_name = jQuery(".site-name:not(.done)");
	site_name.html(site_name.html().replace(/עיצוב גראפי/i, "<span>עיצוב גראפי<\span>")).addClass("done");
	jQuery("#block-system-main-menu--2 .menu a[href^='\/#']").removeClass("active");
		
	
	if (!jQuery("html").hasClass("no-csstransforms3d")) {
		Drupal.avishay.transform = "transform";
	}
	jQuery("[nid]").live("click", function(e) {		
		var nid = jQuery(e.currentTarget).attr("nid");
		open_dialog(nid);
	});
	
	jQuery("#menu-toggle").live("click", function(e){
		jQuery('.menu_toggle').slideToggle("fast");
		jQuery(e.currentTarget).toggleClass("open");
		console.log("click");
	});
	jQuery('body').bind('responsivelayout', function(e, d) {//    console.log(e);//    console.log(d);	
		console.log(d);
		if(d.to === "narrow" || d.to === "fluid"){
			jQuery("#zone-content").append(jQuery("#region-menu"));
			var img = jQuery('<a id="menu-toggle" class="open"><img src="/sites/all/themes/omega3sub/images/icon-menu-down.png"/></a>');
			var main_menu = jQuery("#block-system-main-menu");
			jQuery(".menu li:nth-child(2), .menu li:nth-child(3), .menu li:nth-child(4), .menu li:nth-child(5), .menu li:nth-child(6)", main_menu).addClass("menu_toggle");
			Drupal.avishay.menu_toggle();			
			jQuery('.menu li:nth-child(6)', main_menu).after(	jQuery("#block-block-2 "));
			jQuery("#block-block-2 p", main_menu).once().prepend(img);
			jQuery("#block-block-2 p a[href^=mail]", main_menu).not(".done").after(jQuery('#about').clone().attr("id", "about_mobile")).addClass("done");
			
			jQuery(".isotope-element").unbind("mouseout mouseover");
		} 
		if(d.to === "normal"){
			jQuery("#block-system-main").after(	jQuery("#block-block-2"));
			jQuery("#region-branding").after(jQuery("#region-menu"));
			
		}
	
		jQuery("#menu-toggle").click();
		if(window.location.pathname === "/"){
			jQuery('#isotope-container').isotope({ filter : '*'});
		}
		jQuery(window).trigger('hashchange');
	});
	jQuery(window).trigger('hashchange');
	
	var supportsOrientationChange = "onorientationchange" in window,
	 orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	 window.addEventListener(orientationEvent, function(e) {
		 jQuery(window).trigger('hashchange');
		 if(window.location.pathname === "/"){
			 jQuery('#isotope-container').isotope({ filter : '*'});
		 }
//		 window.alert(window.location.pathname );
	 });
//	 
//	 jQuery(".רשת").filter(":odd").css("direction","ltr")
//	 jQuery(".רשת").filter(":odd").children().filter(".views-field").css({"right":"0","left":"auto","text-align":"right"})
}); 
Drupal.avishay.menu_toggle = function(){
	jQuery(".menu_toggle a").once().on("click", function(){
		jQuery("#menu-toggle").click();
//		jQuery(".logo-img").addClass("rotate");
//		window.setTimeout(function(){
//			jQuery(".logo-img").removeClass("rotate");
//		},2000);
		
	});
};
