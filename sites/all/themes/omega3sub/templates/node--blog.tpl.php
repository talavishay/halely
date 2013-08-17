<article <?php print $attributes; ?> nodenid="<?php print $nid;?>">
  <?php print $user_picture; ?>
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
  
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
  
  <header>
  	<div class="submitted"><?php print format_date($created, 'custom', 'יום l,t בF Y');  ?></div>
    <h2<?php print $title_attributes; ?>><?php print $title ?></h2>    
  </header>
  <?php endif; ?>  
  
  <div<?php print $content_attributes; ?>>
    <?
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      hide($content['body']);
	  $s = explode("<!--break-->", $body[0]['safe_value']);
	  print '<div class="teaser">'.$s[0].'</div>';
      print render($content["body"]);	  
    ?>
  </div>  
  <div class="clearfix">
  	<div class="comment_count">
  		<?php
  		if($comment_count !== "0" ){
  			print t("@c comments", array("@c" => $comment_count) );  	  			
			if (!empty($content['links'])): ?>
	      		<nav class="links node-links clearfix">
	  				<?php print render($content['links']); ?>
	      		</nav>
    		<?php endif; 
		} else {
			if (!empty($content['links'])): ?>
	      		<nav class="links node-links clearfix" style="display:block">
	  				<?php print render($content['links']); ?>
	      		</nav>
    		<?php endif;
		}
    	?>  		
	</div>    
  </div>
</article>