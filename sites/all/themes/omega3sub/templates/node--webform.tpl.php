<article<?php print $attributes;?>>
<?
if(isset($field_font_color)){
	if(isset($field_font_color[0])){
		
		print ' <style type="text/css"> .node{color:'.$field_font_color[0]["rgb"].'}';
	}	
	if(isset($field_font_color[1])){
		
		print '.node input[type=text],.node textarea{color:'.$field_font_color[1]["rgb"].'}';
	}	
	if(isset($field_font_color[2])){
		
		print '.node input ,.node textarea{background-color:'.$field_font_color[2]["rgb"].'}';
	}
	if(isset($field_font_color[0])){
		print "</style>";	
	}
		
} 
hide($content["field_font_color"]);
?>
  <?php print $user_picture; ?>
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
  <header>
    <h2<?php print $title_attributes; ?>><?php print $title ?></h2>
  </header>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
  <footer class="submitted"><?php print $date; ?> -- <?php print $name; ?></footer>
  <?php endif; ?>  
  
  <div<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);	          
      print render($content);
	  if($view_mode === "colorbox"){
	  	if(isset($field_project[0])){
	  		if(isset($field_project[0]["tid"])){
		  		print views_embed_view('project','block_1', $field_project[0]["tid"]);
			}
	  	}
	  		
	  }
    ?>
  </div>
  
  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <nav class="links node-links clearfix"><?php print render($content['links']); ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>
</article>