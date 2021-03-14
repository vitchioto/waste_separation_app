<?php

function wsbe_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support(
        'post-formats',
        array(
            'link',
            'aside',
            'gallery',
            'image',
            'quote',
            'status',
            'video',
            'audio',
            'chat',
        )
    );
    add_theme_support( 'post-thumbnails' );
}

add_action( 'after_setup_theme', 'wsbe_setup' );

function wsbe_scripts() {
    wp_enqueue_style( 'wsbe-style', get_template_directory_uri() . '/style.css', array(), '1.0.0' );
}

add_action( 'wp_enqueue_scripts', 'wsbe_scripts' );

function acf_to_rest_api($response, $post, $request) {
    if (!function_exists('get_fields')) return $response;

    if (isset($post)) {
        $acf = get_fields($post->id);
        $response->data['acf'] = $acf;
    }
    return $response;
}
add_filter('rest_prepare_bin', 'acf_to_rest_api', 10, 3);
add_filter('rest_prepare_material', 'acf_to_rest_api', 10, 3);

function acf_to_rest_api_trash($response, $post, $request) {
    if (!function_exists('get_fields')) return $response;
	
	$rulesArgs = array(
	  'name'        => 'bratislava',
      'post_type' => 'city_rules',
      'post_status'    => 'publish',
    );
	
	$rulesObject = get_posts($rulesArgs);
	$rules = get_fields($rulesObject[0]->ID);
	$bins = [];
	
    if (isset($post)) {
        $acf = get_fields($post->id);
        $response->data['acf'] = $acf;
		
		foreach($acf['Materials'] as $material) {
			foreach($rules as $key => $binRules) {
    			if(in_array($material, $binRules) AND !in_array($key, $bins)) $bins[] = $key;
			}
		}
		$response->data['bins'] = $bins;
    }
    return $response;
}

add_filter('rest_prepare_trash', 'acf_to_rest_api_trash', 10, 3);

add_filter('acf/load_field/name=Type', 'acf_load_bin_types');

function acf_load_bin_types($field)
{
    $args = array(
      'post_type' => 'bin_types',
      'post_status'    => 'publish',
	  'posts_per_page'=> 9,
    );
	
	$result = [];
			
	foreach ( get_posts( $args ) as $type ) {
      $result[$type->post_title]  = $type->post_title;
    }
	$field['choices'] = $result;

    return $field;
}

add_filter('acf/load_field/name=Materials', 'acf_load_trash_materials');

function acf_load_trash_materials($field)
{
    $args = array(
      'post_type' => 'material',
      'post_status'    => 'publish',
	  'posts_per_page'=> -1,
    );
	
	$result = [];
			
	foreach ( get_posts( $args ) as $type ) {
	  $acf = get_fields($type->ID);	
      $result[$acf['code']]  = $type->post_title;
    }
	$field['choices'] = $result;

    return $field;
}

function my_acf_add_local_field_groups() {
	
	$materialsArgs = array(
      'post_type' => 'material',
      'post_status'    => 'publish',
	  'posts_per_page'=> -1,
    );
	
	$materials = [];
	
	foreach ( get_posts( $materialsArgs ) as $material ) {
	  $acf = get_fields($material->ID);	
      $materials[$acf['code']]  = $material->post_title;
    }
	
	$binArgs = array(
      'post_type' => 'bin_types',
      'post_status'    => 'publish',
	  'posts_per_page'=> 9,
    );
	
	$binTypes = [];
			
	foreach ( get_posts( $binArgs ) as $type ) {
      $binTypes[]  = array (
		'key' => 'bin_'.$type->post_title,
		'label' => 'Bin '.$type->post_title,
		'name' => 'bin_'.$type->post_title,
		'type' => 'checkbox',
		'choices' => $materials,
		'layout' => 'horizontal',
	  );
    }
	
	acf_add_local_field_group(array(
		'key' => 'group_1',
		'title' => 'Map materials into bins',
		'fields' => $binTypes,
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'city_rules',
				),
			),
		),
	));
}

add_action('acf/init', 'my_acf_add_local_field_groups');

function wp_api_encode_acf($data,$post,$context){
	print_r($post);
    $customMeta = (array) get_fields($post['materials']);
	print_r($customMeta);
    $data['meta'] = array_merge($data['meta'], $customMeta );
    return $data;
}

if( function_exists('get_fields') ){
    add_filter('json_prepare_post', 'wp_api_encode_acf', 10, 3);
}

function vv_test($post, $request){
	$params = $request->get_json_params();
	$materials = $params['materials'];
	update_field( 'Materials', $materials, $post->ID );
	return $post;
}

add_filter('rest_after_insert_trash', 'vv_test', 10, 3);