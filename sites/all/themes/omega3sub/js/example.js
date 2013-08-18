Drupal.avishay = {};
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
	jQuery(".content", block_menu).css("min-height", h - (bth));
}
function open_popup_node(that, nid) {
	// var dialog= jQuery(".ui-dialog");
	var dialog = that;
	jQuery(dialog).load("/get_node/" + nid, function() {
		if (jQuery(".field-name-field-gallery .field-items .field-item", dialog).length > 1) {
			jQuery(" .field-name-field-gallery ", dialog).append(jQuery('<div id="nav"></div>'));
			jQuery(" .field-name-field-gallery .field-items", dialog).cycle({
				fx : 'scrollHorz',
				pagerAnchorBuilder : pagerFactory,
				pager : '#nav',
				timeout : 0,
				rev : true
			});
			var text = jQuery(".node-title", dialog).text();
		var wrap_right = jQuery('<div id="wrap_right"></div>').append(jQuery('<div class="title">' + text + '</div>')).append(jQuery(".field-name-body", dialog));
		jQuery(".field-name-field-gallery", dialog).after(wrap_right);
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
		
		jQuery("#wait", dialog).remove();
		jQuery(dialog).prepend(jQuery("header",dialog));

	});
}
function open_dialog(nid) {
	jQuery('<div></div>').dialog({
		width : 760,
		// height: 4	00,
		position : {
			my : "center",
			at : "top",
			within : "#isotope-container"
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
				jQuery("#block-views-erchives-block a, #block-views-blog-block a").removeClass("active");
				jQuery(e.currentTarget).addClass("active");
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
				jQuery("#block-views-erchives-block a, #block-views-blog-block a").removeClass("active");
				jQuery(e.currentTarget).addClass("active");
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
		if (jQuery(".page-node-187").length) {
			var img = jQuery('<img id="about_dog" src="/sites/all/themes/omega3sub/images/about_dog.png"/>');
			jQuery("#block-views-menus-block-6 .content").after(img);
			jQuery("#block-views-menus-block-6 .content").height(h - (t + 13) - 63);
		} else {
			jQuery("#block-views-menus-block-6 .content").height(h - (t + 13));
		}
	}
}
function pagerFactory(idx, slide) {
	var s = idx > 2 ? ' style="display:none"' : '';
	return '<span' + s + '><a href="#">' + (idx + 1) + '</a></span>';
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

		}).bind("mouseout", function(e) {
			that = jQuery(e.currentTarget);
			jQuery(".views-field-title,.views-field-type", that).addClass("fadeout").removeClass("fadein");
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
		}).bind("click", function(e) {
			var nid = jQuery(".views-field-nid", e.currentTarget).text().trim();
			var path = jQuery(".views-field-nid >div", e.currentTarget).attr("path").trim();
			if (jQuery(that).attr("data-category") != "אודות") {
				open_dialog(nid);
			} else {
				window.location.href = path;
			}
		});

		if (window.location.pathname === "/") {
			jQuery('.menu a').each(function(i, val) {
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
							var href = jQuery(e.currentTarget).attr('href').replace(/^\/#/, ''), option = jQuery.deparam(href, true);
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
					});
					jQuery(".menu li:first-child a").attr("state", "on").addClass('active-i');
					
				} else {
					jQuery("#region-content").removeClass("grid-12").addClass("grid-10");
					jQuery("aside").css("display", "inline");
					jQuery("aside .block-views").not("[data-set=" + hashOptions["filter"] + "]").hide("slow");
					jQuery("aside [data-set=" + hashOptions["filter"] + "]").show("fast");
					jQuery("[href*=" + hashOptions["filter"] + "]").attr("state", "on").addClass('active-i');
					jQuery('#isotope-container').isotope({
						filter : '.' + hashOptions["filter"]
					});
					Drupal.avishay.reshet_sidebar_height();
				}
				// jQuery("html, body").animate({ scrollTop: jQuery('#isotope-container').offset().top }, 1000);
				jQuery("html, body").animate({ scrollTop: 0 }, 1000);
				// console.log("haschagne = " + hashOptions["filter"]);
			});
			// }).trigger('hashchange');
		}
		

		jQuery(".delayImg").each(function() {
			this.onload = function() {
				jQuery(this).animate({
					opacity : 1
				}, 1000);
			};
			this.src = this.getAttribute("delayedSrc");
		});
		// var supportsOrientationChange = "onorientationchange" in window,
		// orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
		// window.addEventListener(orientationEvent, function(e) {
		// jQuery("#isotope-container [trans]").each(function(i, val){
		// jQuery(val).attr("trans", "");
		// });
		// }, false);

	}
};

jQuery(document).ready(function() {
	// Drupal.avishay.comment();

	jQuery("#block-system-main-menu--2 .menu a[href^='\/#']").removeClass("active");

	if (!jQuery("html").hasClass("no-csstransforms3d")) {
		Drupal.avishay.transform = "transform";
	}
	jQuery("[nid]").live("click", function(e) {
		jQuery(".ui-dialog-content").dialog("close").remove();
		var nid = jQuery(e.currentTarget).attr("nid").trim();
		open_dialog(nid);
	});
	jQuery(window).trigger('hashchange');

}); 