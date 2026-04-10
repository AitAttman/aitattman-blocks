<?php

if (!defined('ABSPATH')) {
	/**
	 * Exit if accessed directly.
	 */
	exit;
}

/**
 * Render search box block
 */
$post_type = get_post_type() !== 'page' ? get_post_type() : 'post';
do_action('ait_blocks_searchbox_before_form', $attributes['anchor'] ?? '');
?>
<form <?php echo esc_attr(get_block_wrapper_attributes([
	'id' => $attributes['anchor'] ?? null,
	'action' => '/',
	'data-element' => 'ait_searchbox',
	'method' => 'GET'
])); ?>>
	<div class="container">
		<input type="text" name="<?php echo esc_attr($attributes['inputName'] ?? 's'); ?>"
			placeholder="<?php echo esc_attr(($attributes['placeholder'] ?? null) ?: __('search...', "aitattman-blocks")); ?>"
			value="<?php echo esc_attr(get_search_query()); ?>">
		<button>
			<?php if (!empty($attributes['showIcon'])): ?>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					class="lucide lucide-search-icon lucide-search">
					<path d="m21 21-4.34-4.34" />
					<circle cx="11" cy="11" r="8" />
				</svg>
			<?php else: ?>
				<?php echo esc_html(apply_filters('ait_blocks_searchbox_label', $attributes['searchLabel'] ?? __('Search', "aitattman-blocks"), $attributes['anchor'] ?? '')); ?>
			<?php endif; ?>
		</button>
	</div>
	<input type="hidden" name="post_type" value="<?php echo esc_attr($post_type); ?>" />
</form>
<?php
do_action('ait_blocks_searchbox_after_form', $attributes['anchor'] ?? '');
?>
