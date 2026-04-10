<?php
if (!defined('ABSPATH')) {
	/**
	 * Exit if accessed directly.
	 */
	exit;
}

global $wp_query;
$query = $wp_query;
/**
 * Recent posts
 * @author Ait Attman
 * Render callback / template for the dynamic block
 *
 * Available variables:
 * - $attributes  array   Block attributes (from editor)
 */
/**
 * available hooks:
 * filter: "ait_block_query_args" => works only for custom query
 * filter: "ait_block_query_class"
 * action: "ait_blocks_query_before_post_content"
 * action: "ait_blocks_query_after_post_content"
 * action: "ait_blocks_recent_posts_no_posts"
 */
$currentPage = max(1, get_query_var('paged', 1));
$itemsPerPage = $query?->get('posts_per_page');
$searchValue = $query?->get('s');
$useDefaultQuery = $attributes['defaultQuery'];
if (!$useDefaultQuery) {
	// $currentPage = preg_match('/^[1-9]\d*$/', $_GET['current-page'] ?? '') ? (int) $_GET['current-page'] : 1;
	$itemsPerPage = $attributes["numPosts"] ?? 5;
	$offset = ($currentPage - 1) * $itemsPerPage;
	$searchValue = get_query_var('s', '');
	$args = [
		'posts_per_page' => $itemsPerPage,
	];
	if (!empty($attributes['usePagination'])) {
		$args['offset'] = $offset;
		$args['paged'] = $currentPage;
	}
	if (!empty($attributes['isRelatedPosts']) && is_single()) {
		$args['post_type'] = get_post_type();
		$categories = get_the_category();
		// get terms/categories
		$terms = get_the_terms(get_the_ID(), $attributes['taxonomy'] ?? 'category');
		if (!empty($terms)) {
			$terms = array_map(fn($cat) => $cat->term_id, $terms);
			$args['tax_query'] = [
				[
					'taxonomy' => $attributes['taxonomy'] ?? 'category',
					'field' => 'term_id',
					'terms' => $terms
				]
			];
		}
		$args['post__not_in'] = [get_the_ID()];
	} else {
		$attributes['postType'] ?? "post";
		if (!empty($attributes['category'])) {
			$args['tax_query'] = [
				[
					'taxonomy' => $attributes['taxonomy'] ?? 'category',
					'field' => 'slug',
					'terms' => $attributes['category']
				]
			];
		}
	}

	if ($attributes['useSearch'] && $searchValue)
		$args['s'] = $searchValue;
	$args = apply_filters('ait_block_query_args', $args, $attributes['anchor'] ?? '');
	$query = new WP_Query($args);
}
$classNames = ['ait-query'];
if (!empty($attributes['className']))
	$classNames[] = $attributes['className'];
/**
 * filter: ait_block_query_class
 */
$classNames = apply_filters('ait_block_query_class', $classNames, $attributes['anchor'] ?? '');
$postsCount = $query->found_posts;
$totalPages = ceil($postsCount / $itemsPerPage);
$getPageUrl = function ($pageNum) {
	return get_pagenum_link($pageNum);
};
if ($attributes['showItemsFoundMessage']) {
	/* translators: %d: number of posts found */
	$message = sprintf(esc_html__('Found %d items', "aitattman-blocks"), $postsCount);
	echo '<p class="rp-items-found-message">' . str_replace($postsCount, '<b>' . $postsCount . '</b>', $message) . '</p>';
}
?>

<?php if ($query->have_posts()): ?>
	<div<?php echo empty($classNames) ? '' : ' class="' . esc_attr(implode(' ', $classNames)) . '"'; ?><?php echo empty($attributes['anchor']) ? '' : ' id="' . esc_attr(trim($attributes['anchor'])) . '"'; ?>>
		<?php while ($query->have_posts()):
			$query->the_post();
			$thumbnail_url = get_the_post_thumbnail_url(null, $attributes["thumbnailSize"] ?? 'large');
			if (!empty($attributes['showAuthorName'])) {
				$author_name = [];
				if ($first_name = get_the_author_meta('first_name'))
					$author_name[] = $first_name;
				if ($last_name = get_the_author_meta('last_name'))
					$author_name[] = $last_name;
				$author_name = implode(' ', $author_name);
			} else {
				$author_name = '';
			}
			?>
			<?php do_action('ait_blocks_query_before_post_content', $attributes['anchor'] ?? ''); ?>
			<div class="post-content">
				<?php if ($thumbnail_url): ?>
					<div class="thumbnail">
						<img src="<?php echo esc_url($thumbnail_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
					</div>
				<?php endif; ?>
				<div class="post-info">
					<div class="post-title"><a href="<?php echo esc_attr(get_the_permalink()); ?>">
							<h2><?php the_title(); ?></h2>
						</a></div>
					<?php if (!empty($author_name)): ?>
						<div class="author"><span><?php echo esc_html($author_name); ?></span></div>
					<?php endif; ?>
					<?php if (!empty($attributes['showDate'])): ?>
						<div class="post-date"><span><?php echo esc_html(get_the_date('M j, Y')); ?></span></div>
					<?php endif; ?>
					<?php if (!empty($attributes['showExcerpt']) && $excerpt = get_the_excerpt()): ?>
						<div class="post-snippet">
							<span><?php echo esc_html(mb_substr($excerpt, 0, $attributes['excerptLength'] ?? 100, 'UTF-8')); ?></span>
						</div>
					<?php endif; ?>
				</div>
			</div>
			<?php do_action('ait_blocks_query_after_post_content', $attributes['anchor'] ?? ''); ?>
		<?php endwhile;
		// important – restore global $post
		wp_reset_postdata();
		if (!empty($attributes['usePagination'])):
			?>
			<div class="pagination">
				<ul>
					<?php
					if ($currentPage > 4) {
						echo "<li><a class='first' href='" . esc_attr($getPageUrl(1)) . "'>" . esc_html__('First', "aitattman-blocks") . "</a></li>";
					}
					for ($i = max(1, $currentPage - 3); $i < $currentPage; $i++) {
						echo "<li><a href='" . esc_attr($getPageUrl($i)) . "'>" . esc_html($i) . "</a></li>";
					}
					if ($currentPage) {
						echo '<li class="current"><span>' . esc_html($currentPage) . '</span></li>';
					}
					for ($i = $currentPage + 1; ($i <= $totalPages) && $i < ($currentPage + 4); $i++) {
						echo "<li><a href='" . esc_attr($getPageUrl($i)) . "'>" . esc_html($i) . "</a></li>";
					}
					if ($currentPage < $totalPages - 3) {
						echo "<li><a class='last' href='" . esc_attr($getPageUrl($totalPages)) . "'>" . esc_html__('Last', "aitattman-blocks") . "</a></li>";
					}
					?>
				</ul>
			</div>
		<?php endif; ?>
		</div>
	<?php else: ?>
		<?php do_action('ait_blocks_recent_posts_no_posts', $attributes['anchor'] ?? ''); ?>
	<?php endif; ?>
