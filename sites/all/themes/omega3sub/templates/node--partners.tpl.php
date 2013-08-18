<article<?php print $attributes; ?>>
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
	  hide($content['field_projects']);	   	          
      print render($content);
	  
	if(isset($field_projects) && count($field_projects) !== 0){
		print '<div class="field-name-projects"><h4>'.t("projects").':</h4>';
		foreach($field_projects as $k => $v){
			$node = node_load($v["nid"]);
			$type_obj = node_type_load($node->type);
  			$human_readable_type = $type_obj->name;
			print "<div nid=\"$node->nid\">$node->title  -- $human_readable_type</div></br>";
		}
		print '</div>';		  				
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