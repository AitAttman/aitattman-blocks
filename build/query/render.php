<?php
if ( ! defined( 'ABSPATH' ) ) {
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
$attributes        = $attributes ?? array();
$current_page      = max( 1, get_query_var( 'paged', 1 ) );
$items_per_page    = $query?->get( 'posts_per_page' );
$search_value      = $query?->get( 's' );
$use_default_query = $attributes['defaultQuery'];
if ( ! $use_default_query ) {
	$items_per_page = $attributes['numPosts'] ?? 5;
	$offset         = ( $current_page - 1 ) * $items_per_page;
	$search_value   = get_query_var( 's' );
	$args           = array( 'posts_per_page' => $items_per_page );
	if ( ! empty( $attributes['usePagination'] ) ) {
		$args['offset'] = $offset;
		$args['paged']  = $current_page;
	}
	if ( ! empty( $attributes['isRelatedPosts'] ) && is_single() ) {
		$args['post_type'] = get_post_type();
		$categories        = get_the_category();
		// get terms/categories
		$terms = get_the_terms( get_the_ID(), $attributes['taxonomy'] ?? 'category' );
		if ( ! empty( $terms ) ) {
			$terms             = array_map( fn( $cat ) => $cat->term_id, $terms );
			$args['tax_query'] = array(
				array(
					'taxonomy' => $attributes['taxonomy'] ?? 'category',
					'field'    => 'term_id',
					'terms'    => $terms,
				),
			);
		}
		$args['post__not_in'] = array( get_the_ID() );
	} else {
		$args['post_type'] = $attributes['postType'] ?? 'post';
		if ( ! empty( $attributes['category'] ) ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => $attributes['taxonomy'] ?? 'category',
					'field'    => 'slug',
					'terms'    => $attributes['category'],
				),
			);
		}
	}

	if ( $attributes['useSearch'] && $search_value ) {
		$args['s'] = $search_value;
	}
	$args  = apply_filters( 'ait_block_query_args', $args, $attributes['anchor'] ?? '' );
	$query = new WP_Query( $args );
}
$class_names = array( 'ait-query' );
if ( ! empty( $attributes['className'] ) ) {
	$class_names[] = $attributes['className'];
}
/**
 * filter: ait_block_query_class
 */
$class_names  = apply_filters( 'ait_block_query_class', $class_names, $attributes['anchor'] ?? '' );
$posts_count  = $query->found_posts;
$total_pages  = ceil( $posts_count / $items_per_page );
$get_page_url = function ( $page_num ) {
	return get_pagenum_link( $page_num );
};
if ( $attributes['showItemsFoundMessage'] ) :
	?>
	<p class="rp-items-found-message">
		<?php
		/* translators: %d: number of posts found */
		echo esc_html( sprintf( __( 'Found %d items', 'aitattman-blocks' ), $posts_count ) );
		?>
	</p>
<?php
endif;
?>
<?php if ( $query->have_posts() ) : ?>
	<div<?php echo empty( $class_names ) ? '' : ' class="' . esc_attr( implode( ' ', $class_names ) ) . '"'; ?><?php echo empty( $attributes['anchor'] ) ? '' : ' id="' . esc_attr( trim( $attributes['anchor'] ) ) . '"'; ?>>
		<?php
		while ( $query->have_posts() ) :
			$query->the_post();
			$thumbnail_url = get_the_post_thumbnail_url( null, $attributes['thumbnailSize'] ?? 'large' );
			if ( ! empty( $attributes['showAuthorName'] ) ) {
				$author_name = array();
				$first_name  = get_the_author_meta( 'first_name' );
				if ( $first_name ) {
					$author_name[] = $first_name;
				}
				$last_name = get_the_author_meta( 'last_name' );
				if ( $last_name ) {
					$author_name[] = $last_name;
				}
				$author_name = implode( ' ', $author_name );
			} else {
				$author_name = '';
			}
			?>
			<?php do_action( 'ait_blocks_query_before_post_content', $attributes['anchor'] ?? '' ); ?>
			<div class="post-content">
				<?php if ( $thumbnail_url ) : ?>
					<div class="thumbnail">
						<img src="<?php echo esc_url( $thumbnail_url ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>">
					</div>
				<?php endif; ?>
				<div class="post-info">
					<div class="post-title"><a href="<?php echo esc_attr( get_the_permalink() ); ?>">
							<h2><?php the_title(); ?></h2>
						</a></div>
					<?php if ( ! empty( $author_name ) ) : ?>
						<div class="author"><span><?php echo esc_html( $author_name ); ?></span></div>
					<?php endif; ?>
					<?php if ( ! empty( $attributes['showDate'] ) ) : ?>
						<div class="post-date"><span><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></span></div>
					<?php endif; ?>
					<?php
					$excerpt = get_the_excerpt();
					if ( ! empty( $attributes['showExcerpt'] ) && $excerpt ) :
						?>
						<div class="post-snippet">
							<span><?php echo esc_html( mb_substr( $excerpt, 0, $attributes['excerptLength'] ?? 100, 'UTF-8' ) ); ?></span>
						</div>
					<?php endif; ?>
				</div>
			</div>
			<?php do_action( 'ait_blocks_query_after_post_content', $attributes['anchor'] ?? '' ); ?>
		<?php
		endwhile;
		// important – restore global $post
		wp_reset_postdata();
		if ( ! empty( $attributes['usePagination'] ) ) :
			?>
			<div class="pagination">
				<ul>
					<?php if ( $current_page > 4 ) : ?>
						<li>
							<a class='first' href='<?php echo esc_attr( $get_page_url( 1 ) ); ?>'>
								<?php esc_html_e( 'First', 'aitattman-blocks' ); ?>
							</a>
						</li>
					<?php
					endif;
					for ( $i = max( 1, $current_page - 3 ); $i < $current_page; $i++ ) :
						?>
						<li><a href='<?php echo esc_attr( $get_page_url( $i ) ); ?>'><?php echo esc_html( $i ); ?></a></li>
					<?php
					endfor;
					if ( $current_page ) :
						?>
						<li class="current"><span><?php echo esc_html( $current_page ); ?></span></li>
					<?php
					endif;
					for ( $i = $current_page + 1; ( $i <= $total_pages ) && $i < ( $current_page + 4 ); $i++ ) :
						?>
						<li><a href="<?php echo esc_attr( $get_page_url( $i ) ); ?>"><?php echo esc_html( $i ); ?></a></li>
					<?php
					endfor;
					if ( $current_page < $total_pages - 3 ) :
						?>
						<li>
							<a class='last' href="<?php echo esc_attr( $get_page_url( $total_pages ) ); ?>">
								<?php esc_html_e( 'Last', 'aitattman-blocks' ); ?>
							</a>
						</li>
					<?php endif; ?>
				</ul>
			</div>
		<?php endif; ?>
	</div>
<?php else : ?>
	<?php do_action( 'ait_blocks_recent_posts_no_posts', $attributes['anchor'] ?? '' ); ?>
<?php endif; ?>
