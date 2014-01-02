<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */
 drupal_add_js(drupal_get_path("theme", "omega3sub").'/js/example.js');
 drupal_add_library('system', 'jquery.bbq');
 drupal_add_library('system', 'ui.dialog');
// drupal_add_js("http://desandro.github.io/imagesloaded/imagesloaded.pkgd.min.js");
 if (module_exists('libraries')) {
    $path = libraries_get_path('jquery.cycle');
    if (file_exists($path . '/jquery.cycle.all.min.js')) drupal_add_js($path . '/jquery.cycle.all.min.js');
    elseif (file_exists($path . '/jquery.cycle.all.js')) drupal_add_js($path . '/jquery.cycle.all.js');
 }

function omega3sub_preprocess_block(&$variables){
	if($variables["block"]->module == "views" && preg_match("/menu/i",$variables["block"]->delta)){
	$variables["data_set"] = $variables["block"]->subject;
	}
}
function omega3sub_preprocess_block__views($v){
	$f = 0 ;
}
function omega3sub_page_alter(&$vars) {
	if(isset( $vars["header"]["header"]["menu"])){
	    if(isset( $vars["header"]["header"]["menu"]["system_main-menu"])){
	        $vars["footer"]["footer"]["footer_first"]["footer_main-menu"] = $vars["header"]["header"]["menu"]["system_main-menu"];
	        $vars["footer"]["footer"]["footer_first"]["footer_main-menu"]['#weight'] = 100;
	    }    
	}
	
}
		
function omega3sub_js_alter(&$vars) {
// 	if(arg(0) === "home"){
		unset($vars["sites/all/themes/omega/omega/js/omega-equalheights.js"]);	
// 	}
}
function omega3sub_css_alter(&$vars) {
	unset($vars["sites/all/modules/views_isotope/views_isotope.css"]);
	unset($vars["misc/ui/jquery.ui.dialog.css"]);
	unset($vars["misc/ui/jquery.ui.theme.css"]);
}

function omega3sub_preprocess_comment(&$var){
	if($var["comment"]->pid !== "0"){

		$var["classes_array"][] = "child";
		$var["classes_array"][] = "child-".$var["comment"]->pid;
		 $var["attributes_array"]["pid"] = $var["comment"]->pid;
	}
}

// function e_scholar_module_module_implements_alter(&$implementations, $hook) {
