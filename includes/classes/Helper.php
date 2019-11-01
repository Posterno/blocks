<?php
/**
 * Helper methods for running the blocks functionalities.
 *
 * @package     posterno-blocks
 * @copyright   Copyright (c) 2019, Sematico, LTD
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       0.1.0
 */

namespace PosternoBlocks;

use PosternoBlocks\Blocks\Listings;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Helper methods for running the blocks functionalities.
 */
class Helper {

	/**
	 * Get the js variables required for the Gutenberg editor.
	 *
	 * @return array
	 */
	public static function get_js_vars() {
		return [
			'pno_svg_logo'          => PNO_PLUGIN_URL . 'assets/imgs/logo.svg',
			'ajax'                  => admin_url( 'admin-ajax.php' ),
			'attributes'            => [
				'listings' => Listings::get_attributes(),
			],
			'query_sorters'         => self::get_query_sorters(),
			'query_sort_by'         => [
				[
					'value' => 'ASC',
					'label' => esc_html__( 'Ascending', 'posterno' ),
				],
				[
					'value' => 'DESC',
					'label' => esc_html__( 'Descending', 'posterno' ),
				],
			],
			'layout_options'        => self::get_layout_options(),
			'registered_taxonomies' => self::get_registered_taxonomies(),
			'labels'                => [
				'listings'                => [
					'title'           => esc_html__( 'Listings', 'posterno' ),
					'description'     => esc_html__( 'Display listings.', 'posterno' ),
					'keywords'        => [
						esc_html__( 'list', 'posterno' ),
						esc_html__( 'listing', 'posterno' ),
					],
					'panel_query'     => esc_html__( 'Query settings', 'posterno' ),
					'panel_layout'    => esc_html__( 'Results layout', 'posterno' ),
					'featured'        => esc_html__( 'Show featured listings only', 'posterno' ),
					'pagination'      => esc_html__( 'Show pagination', 'posterno' ),
					'sorter'          => esc_html__( 'Show sorting dropdown', 'posterno' ),
					'sort'            => esc_html__( 'Order listings by', 'posterno' ),
					'sort_by'         => esc_html__( 'Sorting order', 'posterno' ),
					'layout'          => esc_html__( 'Layout', 'posterno' ),
					'panel_taxonomy'  => esc_html__( 'Filter by taxonomy terms', 'posterno' ),
					'taxonomy_select' => esc_html__( 'Available taxonomies', 'posterno' ),
				],
				'search_user_label'       => esc_html__( 'Query listings by specific author', 'posterno' ),
				'placeholder_search_user' => esc_html__( 'Search users', 'posterno' ),
				'search_user_error'       => esc_html__( 'No users where found.', 'posterno' ),
				'search_user_selected'    => esc_html__( 'Remove selected author', 'posterno' ),
			],
			'nonces'                => [
				'get_terms' => wp_create_nonce( 'pno_get_taxonomies_terms_from_block' ),
			],

		];
	}

	/**
	 * Register Gutenberg blocks that require server side rendering.
	 *
	 * @return void
	 */
	public static function register_server_side_blocks() {

		register_block_type(
			'posterno/listings',
			[
				'attributes'      => Listings::get_attributes(),
				'render_callback' => [ Listings::class, 'render_callback' ],
			]
		);

	}

	/**
	 * Prepare list of query sorting options available for the block.
	 *
	 * @return array
	 */
	private static function get_query_sorters() {

		$sorters   = pno_get_listings_results_order_filters();
		$formatted = [];

		foreach ( $sorters as $key => $sorter ) {
			$formatted[] = [
				'value' => esc_html( $key ),
				'label' => esc_html( $sorter['label'] ),
			];
		}

		return $formatted;

	}

	/**
	 * Get the layout options available.
	 *
	 * @return array
	 */
	private static function get_layout_options() {

		$layouts   = pno_get_listings_layout_available_options();
		$formatted = [];

		foreach ( $layouts as $key => $label ) {
			$formatted[] = [
				'value' => esc_html( $key ),
				'label' => esc_html( $label ),
			];
		}

		return $formatted;

	}

	/**
	 * Get the list of taxonomies registered for the listings post type.
	 *
	 * @return array
	 */
	private static function get_registered_taxonomies() {

		$objects = get_object_taxonomies( 'listings', 'objects' );
		$tax     = [];

		foreach ( $objects as $key => $taxonomy ) {
			$tax[ $key ] = [
				'label'        => esc_html( $taxonomy->label ),
				'hierarchical' => esc_html( $taxonomy->hierarchical ),
			];
		}

		return $tax;
	}

	/**
	 * Get taxonomy terms for the selected taxonomies.
	 *
	 * @return void
	 */
	public static function get_taxonomies_terms() {

		check_ajax_referer( 'pno_get_taxonomies_terms_from_block', 'nonce' );

		if ( ! current_user_can( 'publish_posts' ) ) {
			wp_send_json_error();
		}

		$taxonomies = isset( $_GET['taxonomies'] ) && ! empty( $_GET['taxonomies'] ) ? pno_clean( $_GET['taxonomies'] ) : [];

		if ( empty( $taxonomies ) ) {
			wp_send_json_error();
		}

		$terms = [];

		foreach ( $taxonomies as $taxonomy ) {
			switch ( $taxonomy ) {
				case 'listings-categories':
					$terms[ $taxonomy ] = pno_get_listings_categories_for_association();
					break;
				case 'listings-types':
					$terms[ $taxonomy ] = pno_get_listings_types_for_association();
					break;
				case 'listings-tags':
					$terms[ $taxonomy ] = pno_get_listings_tags_for_association();
					break;
				case 'listings-locations':
					$terms[ $taxonomy ] = pno_get_listings_locations_for_association();
					break;
				default:
					$terms[ $taxonomy ] = self::get_external_taxonomy_terms( $taxonomy );
					break;
			}
		}

		wp_send_json_success( $terms );

	}

	/**
	 * Get terms for the given taxonomy id.
	 *
	 * @param string $taxonomy taxonomy id.
	 * @return array
	 */
	private static function get_external_taxonomy_terms( $taxonomy ) {

		$categories = [];

		$terms = get_terms(
			$taxonomy,
			array(
				'hide_empty' => false,
				'number'     => 999,
				'orderby'    => 'name',
				'order'      => 'ASC',
				'parent'     => 0,
			)
		);

		if ( ! empty( $terms ) ) {
			foreach ( $terms as $listing_cat ) {
				$categories[ absint( $listing_cat->term_id ) ] = esc_html( $listing_cat->name );
			}
		}

		return $categories;

	}

}
