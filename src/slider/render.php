<?php
if (! defined('ABSPATH')) {
	/**
	 * Exit if accessed directly.
	 */
	exit;
}
/**
 * @see slider by Ait Attman: https://github.com/AitAttman/Slider
 * Render callback / template for the dynamic block
 *
 * Available variables:
 * - $attributes  array   Block attributes (from editor)
 */
$args = [
	'post_type' => $attributes['postType'] ?? "post",
	'posts_per_page' => $attributes["numPosts"] ?? 5
];
if (!empty($attributes['category'])) {
	$args['tax_query'] = [
		[
			'taxonomy' => $attributes['taxonomy'] ?? 'category',
			'field' => 'slug',
			'terms' => $attributes['category']
		]
	];
}
$args = apply_filters('ait_blocks_slider_query_args', $args, $attributes['anchor'] ?? '');
$query = new WP_Query($args);
$dataAttributes = [];
foreach ($attributes as $k => $v) {
	if ($k === "autoplay") {
		$dataAttributes[] = sprintf('data-autoplay="%s"', $v ? "true" : "false");
	} elseif ($k === "navDots") {
		$dataAttributes[] = sprintf('data-nav-dots="%s"', $v ? "true" : "false");
	} elseif ($k === "navButtons") {
		$dataAttributes[] = sprintf('data-nav-buttons="%s"', $v ? "true" : "false");
	} elseif ($k === "interval") {
		$dataAttributes[] = sprintf('data-interval="%d"', $v ?? 3000);
	}
}
?>
<?php if ($query->have_posts()): ?>
	<?php do_action('ait_blocks_slider_before', $attributes['anchor'] ?? ''); ?>
	<div
		<?php echo esc_attr(get_block_wrapper_attributes([
			'id' => $attributes['anchor'] ?? null,
			'class' => 'slider'
		])); ?>
		<?php echo esc_attr(implode(' ', $dataAttributes)); ?>>
		<div class="slides">
			<?php do_action('ait_blocks_slider_slides', $attributes['anchor'] ?? ''); ?>
			<?php while ($query->have_posts()):
				$query->the_post();
				$thumbnail_url = get_the_post_thumbnail_url(null, $attributes["thumbnailSize"] ?? 'full');
				if (!$thumbnail_url) continue;
			?>
				<div class="slide">
					<a href="<?php echo esc_attr(get_the_permalink()); ?>"></a>
					<img src="<?php echo esc_attr($thumbnail_url) ?>" title="<?php echo esc_attr(get_the_title()) ?>">
					<?php if ($attributes["caption"]): ?>
						<p class="caption"><?php the_title(); ?></p>
					<?php endif; ?>
				</div>
			<?php endwhile;
			// important – restore global $post
			wp_reset_postdata();
			?>
		</div>
	</div>
	<?php do_action('ait_blocks_slider_after', $attributes['anchor'] ?? ''); ?>
<?php else: ?>
	<?php do_action('ait_blocks_slider_no_posts', $attributes['anchor'] ?? ''); ?>
<?php endif; ?>
