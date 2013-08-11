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
 
 function omega3sub_block_view_alter(&$data, $block){
	if($block->module == "views" && preg_match("/menu/i",$block->delta)){		
	 	$x=0;
	} 			
}

function omega3sub_preprocess_block(&$variables){
	if($variables["block"]->module == "views" && preg_match("/menu/i",$variables["block"]->delta)){
	$variables["data_set"] = $variables["block"]->subject;
	}
}
function omega3sub_preprocess_block__views($v){
	$f = 0 ;
}
