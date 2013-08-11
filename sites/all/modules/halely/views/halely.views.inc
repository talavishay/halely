<?php


function halely_views_data() {

  $data['node_type']['table']['group']  = t('Node: Type Human Name');
  // $data['node_type']['table']['join'] = array(
    // 'node' => array(
      // 'left_field' => 'type',
      // 'field' => 'type',
    // ),
  // );
  $data['node_type']['table']['base'] = array(
    'field' => 'name', // This is the identifier field for the view.
    'title' => t('node type'),
    'help' => t('node type table'),
    'weight' => -10,
  );
  $data['node_type']['table']['join'] = array(
    'node' => array(
      'left_field' => 'type',
      'field' => 'type',
    ),
  );
 

  $data['node_type']['name'] = array(
    'title' => t('Node: Type Human Name'),
    'group' => t('Node'),
    'help' => t('Node type human'),
 	'field' => array(
      'handler' => 'views_handler_field',
      'click sortable' => TRUE, // This is use by the table display plugin.
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_string',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_string',
    ),
  );
 
  return $data;
}