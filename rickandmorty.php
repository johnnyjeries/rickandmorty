<?php
/*
Plugin Name: Rick and Morty Plugin
Description: A WordPress plugin to display data from the Rick and Morty API.
Version: 1.0
Author: Johnny Jeries
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
*/

// Shortcode function to display Rick and Morty data
function rickandmorty_shortcode() {
    ob_start(); ?>
    <div id="rick-and-morty-container"><div id="row-div" class="row"></div></div>
    <script src="<?php echo plugin_dir_url(__FILE__) . 'rickandmorty-script.js'; ?>"></script>
    <?php
    return ob_get_clean();
}

// Enqueue JavaScript file
function enqueue_rickandmorty_script() {
    wp_enqueue_script('rickandmorty-script', plugin_dir_url(__FILE__) . 'rickandmorty-script.js', null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_rickandmorty_script');

// Enqueue jQuery from Google CDN
function enqueue_jquery_from_cdn() {
    if (!is_admin()) {
        // Deregister the built-in jQuery
        wp_deregister_script('jquery');

        // Enqueue jQuery from Google CDN
        wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js', array(), null, true);

    }
}
add_action('wp_enqueue_scripts', 'enqueue_jquery_from_cdn');

// Enqueue Style file
function enqueue_rickandmorty_style() {
    wp_enqueue_style('rickandmorty-style', plugin_dir_url(__FILE__) . 'rickandmorty.css');
}
add_action('wp_enqueue_scripts', 'enqueue_rickandmorty_style');



// Register shortcode
add_shortcode('rickandmorty', 'rickandmorty_shortcode');
