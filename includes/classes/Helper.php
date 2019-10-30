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
			'attributes'            => [
				'listings' => Listings::get_attributes(),
			],
			'query_sorters'         => self::get_query_sorters(),
			'query_sort_by'         => [
				[
					'value' => 'ASC',
					'label' => esc_html__( 'Ascending' ),
				],
				[
					'value' => 'DESC',
					'label' => esc_html__( 'Descending' ),
				],
			],
			'layout_options'        => self::get_layout_options(),
			'registered_taxonomies' => self::get_registered_taxonomies(),
			'labels'                => [
				'listings'                => [
					'title'        => esc_html__( 'Listings' ),
					'description'  => esc_html__( 'Display listings.' ),
					'keywords'     => [
						esc_html__( 'list' ),
						esc_html__( 'listing' ),
					],
					'panel_query'  => esc_html__( 'Query settings' ),
					'panel_layout' => esc_html__( 'Results layout' ),
					'featured'     => esc_html__( 'Show featured listings only' ),
					'pagination'   => esc_html__( 'Show pagination' ),
					'sorter'       => esc_html__( 'Show sorting dropdown' ),
					'sort'         => esc_html__( 'Order listings by' ),
					'sort_by'      => esc_html__( 'Sorting order' ),
					'layout'       => esc_html__( 'Layout' ),
				],
				'search_user_label'       => esc_html__( 'Query listings by specific author' ),
				'placeholder_search_user' => esc_html__( 'Search users' ),
				'search_user_error'       => esc_html__( 'No users where found.' ),
				'search_user_selected'    => esc_html__( 'Remove selected author' ),
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

			if ( $key === 'listings-types' ) {
				continue;
			}

			$tax[ $key ] = [
				'label'        => esc_html( $taxonomy->label ),
				'hierarchical' => esc_html( $taxonomy->hierarchical ),
			];
		}

		return $tax;
	}

}
