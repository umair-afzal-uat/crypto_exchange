<?php

function ur_theme_start_session()
{
    if (!session_id())
        session_start();
}
add_action("init", "ur_theme_start_session", 1);

function polyline_decode( $string )
{
    $points = array();
    $index = $i = 0;
    $previous = array(0,0);
    while ($i < strlen($string)) {
        $shift = $result = 0x00;
        do {
            $bit = ord(substr($string, $i++)) - 63;
            $result |= ($bit & 0x1f) << $shift;
            $shift += 5;
        } while ($bit >= 0x20);

        $diff = ($result & 1) ? ~($result >> 1) : ($result >> 1);
        $number = $previous[$index % 2] + $diff;
        $previous[$index % 2] = $number;
        $index++;
        $points[] = $number * 1 / pow(10, 5);
    }
    return $points;
}
// Related to strava
function pace( $mps ) {
	if ( ! $mps ) {
		return __( 'N/A', 'wp-strava' );
	}
	// 4 m/s => 14,4 km/h => 4:10 min/km
	$kmh = $mps * 3.6;
	$s   = 3600 / $kmh;
	$ss  = $s / 60;
	$ms  = floor( $ss ) * 60;
	$sec = sprintf( '%02d', round( $s - $ms ) );
	$min = floor( $ss );
	return "{$min}:{$sec}";
}

function speed($avg_speed) {

	$min = floor((1000/$avg_speed)/60);

	$sec = round((((1000/$avg_speed)/60) - $min)*60,0);

	if (strlen($sec) == 1) {
		$sec = '0' . $sec;
	}
	
	$ret = $min . '.' . $sec;

	if ($ret > 0) {
		$ret = $ret * 1;
	}
	return number_format((float)$ret, 2, '.', ',');
 
}
function gpx_speed($distance, $moving) {
	$ret = $distance / $moving * 3.6;
	return str_replace(',', '', number_format($ret, 2));
}

function wgenerate_num($num) {
	$bytes = random_bytes($num);
	$hex = bin2hex($bytes);
	return $hex;
}

function xml_2_string ($xml_object) {
		return (string) $xml_object;
}

function distance($lat1, $lon1, $lat2, $lon2, $unit) {
	
	$theta = $lon1 - $lon2;
	$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
	$dist = acos($dist);
	$dist = rad2deg($dist);
	$miles = $dist * 60 * 1.1515;
	$unit = strtoupper($unit);

	if ($unit == "K") {
		return ($miles * 1.609344);
} else if ($unit == "N") {
	return ($miles * 0.8684);
} else {
		return $miles;
}
}

function wie_split_product_by_guid_cart_items( $cart_item_data, $product_id ){
	$unique_cart_item_key = uniqid();
	$new_value = [];
	$new_value['guid'] = $_POST['guid'];
	$new_value['config'] = $_POST['config'];
	$_SESSION['config'] = $new_value['config'];
	$cart_item_data['unique_key'] = $_POST['guid'];
	return array_merge($cart_item_data, $new_value);
}
 
add_filter( 'woocommerce_add_cart_item_data', 'wie_split_product_by_guid_cart_items', 10, 2 );
 
// -------------------
// 2. Force add to cart quantity to 1 and disable +- quantity input
// Note: product can still be added multiple times to cart
 
// add_filter( 'woocommerce_is_sold_individually', '__return_true' );


add_filter('woocommerce_get_cart_item_from_session', 'wie_get_cart_items_from_session', 1, 3);
function wie_get_cart_items_from_session($item, $values, $key) {
    if (array_key_exists('guid', $values)) {
        $item['guid'] = $values['guid'];
    }
    if (array_key_exists('config', $values)) {
        $item['config'] = $values['config'];
    }
    return $item;
}
add_filter('woocommerce_cart_item_name', 'wie_add_usr_custom_session', 1, 3);
function wie_add_usr_custom_session($product_name, $values, $cart_item_key) {
    $html = '';
    if(isset($values['guid'])) {
    	$html .= '<div>';
    	$html .= '<span><strong>Guid: </strong> ' . $values['guid'] . ' </span>';
    	$html .= '</div>';
    }
    $return_string = $product_name . "<br />" . $html;
    return $return_string;
}




add_action('woocommerce_checkout_create_order_line_item', 'action_checkout_create_order_line_item', 10, 4 );
function action_checkout_create_order_line_item( $item, $cart_item_key, $values, $order ) {
   

    global $woocommerce, $wpdb, $post;
    $guid  = $values['guid'];
    $wie_gpx = $wpdb->prefix.'wie_gpx';
    $gpx_data = $wpdb->get_row("SELECT * FROM $wie_gpx WHERE config_id = '$guid'");
    $stripslashes = stripslashes($gpx_data->gpx_file_data);
   

    $json_decode = json_decode($stripslashes);
  
    $html = '';
    $html .= '<div>';
    $html .= '<span>'.$guid . ' </span>';
    $html .= '</div>';

    $html1 = '';
    $html1 .= '<div>';
    $html1 .= '<button type="button" className="wie_download_pdf button button-primary" data-guid="'.$guid.'" data-variation="'.$gpx_data->product_variation_id.'">Download PDF</button>';
    $html1 .= '</div>';

    $style .= '<div className="map-block-s">';
    $style .= '<div><strong>Titles:</strong>
    <span><strong>Headline:</strong></span>
    <span>'.$json_decode->design->config->layer->text->headline.'</span>
    <span><strong>Subtitle:</strong></span>
    <span>'.$json_decode->design->config->layer->text->subtitle.'</span>
    <span><strong>Footnote:</strong></span>
    <span>'.$json_decode->design->config->layer->text->footnote.'</span>
    <span><strong>Meta Data</strong></span>
    <span>'.$json_decode->design->config->layer->text->metadata.'</span>
    </div>
    <div><strong>Color Scheme:</strong>
    <span>'.ucfirst($json_decode->design->config->poster->style).'</span>
    </div>
    <div><strong>Material:</strong>
    <span>'.ucfirst($json_decode->design->config->paper->material).'</span>
    </div>
    <div><strong>Layout:</strong>
    <span>'.ucfirst($json_decode->design->config->paper->orientation).'</span>
    </div>
    <div><strong>Size:</strong>
    <span>'.$json_decode->design->config->paper->size.'</span>
    </div>
    <div><strong>Outline:</strong>
    <span>'.ucfirst($json_decode->design->config->layer->outline->type).'</span>
    </div>
    <div><strong>Gradient Overlay:</strong>
    <span>'.ucfirst($json_decode->design->config->layer->overlay->type).'</span>
    </div>
    <div><strong>Line Thickness:</strong>
    <span>'.$json_decode->design->config->font->size.'</span>
    </div>
    <div><strong>Font Family:</strong>
    <span>'.$json_decode->design->config->font->family.'</span>
    </div>
    <div><strong>Font Size:</strong>
    <span>'.$json_decode->design->config->font->size.'</span>
    </div>';
    $style .= '</div>';
   
	$item->update_meta_data('Guid', $html );
	$item->update_meta_data('_map_style_details', $style );
	$item->update_meta_data('_pdf',  $html1 );
}

add_action( 'woocommerce_before_cart_table', 'woo_add_continue_shopping_button_to_cart' );
add_action( 'woocommerce_before_checkout_form', 'woo_add_continue_shopping_button_to_cart' );

function woo_add_continue_shopping_button_to_cart() {
 $shop_page_url = get_site_url().'/custom-map/';
 
 echo '<div className="woocommerce-message">';
 echo ' <a href="'.$shop_page_url.'" className="button">Continue Shopping →</a> Would you like some more maps?';
 echo '</div>';
}