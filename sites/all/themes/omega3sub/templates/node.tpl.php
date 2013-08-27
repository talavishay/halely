<?php 
 $type_obj = node_type_load($node->type);
  $human_readable_type = $type_obj->name;
?>

<article<?php print $attributes; ?> node-type="<?php print $human_readable_type ?>">
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
		if(isset($field_project[0])){
	  		if(isset($field_project[0]["tid"])){
	  			require('phpQuery.php');
		  		$doc = phpQuery::newDocumentHTML( views_embed_view('project','block_1', $field_project[0]["tid"]));
				phpQuery::selectDocument($doc);			 		
				foreach(pq("[nid]") as $li) {					 
					 if(pq($li)->text() === $human_readable_type){
						pq($li)->remove();
					 }
				}
				if(count(pq("[nid]")) != 0){
			  		print $doc->htmlOuter();
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