<?php

/**
 * Plugin Name:       Ait Blocks
 * Description:       Enable Wordpress custom blocks like Side-panel, Search Box, Query Posts, Button, Slider and Theme Controllers
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Tested up to:      6.9
 * Author:            Ahmed Ait Attman <aitattman@outlook.com>
 * Author URI:        https://aitattman.pages.dev
 * Plugin URI:        https://github.com/AitAttman/ait-blocks
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ait-blocks
 *
 */

if (! defined('ABSPATH')) {
	/**
	 * Exit if accessed directly.
	 */
	exit;
}

/**
 * Note: if the plugin is hosted on Wordpress Plugins directory, there is no need for load_plugin_textdomain() function
 * Wordpress loads the text domain automatically
 *==================================
 * load php translations
 * Note: this did not work inside 'init' hook, and used 'plugins_loaded' instead
 * =============================
add_action('plugins_loaded', function () {
	load_plugin_textdomain(
		'ait-blocks',
		false,
		dirname(plugin_basename(__FILE__)) . '/languages'
	);
});
=========================== **/


add_action('init', function () {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');

	/**
	 * load blocks json translations
	 */
	$blocks = include plugin_dir_path(__FILE__) . 'build/blocks-manifest.php';
	foreach ($blocks as $blockName => $data) {
		$handle =  "aitattman-$blockName-editor-script";
		wp_set_script_translations(
			$handle,
			'ait-blocks',
			plugin_dir_path(__FILE__) . 'languages'
		);
	}
});
