<?php
/**
 * Plugin Name:       AitAttman Blocks
 * Description:       Some essential custom blocks for the Gutenberg Editor to expand WordPress site functionality.
 * Version:           1.2.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Tested up to:      6.9
 * Author:            Ahmed Ait Attman <aitattman@outlook.com>
 * Author URI:        https://aitattman.pages.dev
 * Plugin URI:        https://github.com/AitAttman/aitattman-blocks
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aitattman-blocks
 * Domain Path:       /languages
 *
 */

if (!defined('ABSPATH')) {
	/**
	 * Exit if accessed directly.
	 */
	exit;
}


add_action('init', function () {
	/**
	 * blocks folders names.
	 * Blocks names can be also loaded from "build/blocks-manifest.php" when "--blocks-manifest" is used in
	 * command: wp-scripts build --blocks-manifest
	 */
	$blocks = ['button', 'query', 'searchbox', 'sidepanel', 'slider', 'theme-controllers'];

	/**
	 * Register blocks from the manifest
	 */
	foreach ($blocks as $block_name) {

		$block_folder = plugin_dir_path(__FILE__) . 'build/' . $block_name;

		/**
		 * do not override title and descriptions in second argument and
		 * let Wordpress load translations automatically.
		 */
		register_block_type_from_metadata($block_folder);
	}
}, 10);
