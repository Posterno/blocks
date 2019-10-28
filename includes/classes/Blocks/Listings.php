<?php
/**
 * Helper methods for the Listings block.
 *
 * @package     posterno-blocks
 * @copyright   Copyright (c) 2019, Sematico, LTD
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       0.1.0
 */

namespace PosternoBlocks\Blocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Helper methods that handle registration and output of the listings block.
 */
class Listings {

	/**
	 * Retrieve the list of attributes.
	 *
	 * @return array
	 */
	public static function get_attributes() {
		return [
			'number'    => [
				'type'    => 'number',
				'default' => absint( pno_get_listings_results_per_page_options() ),
			],
			'show_featured_only' => [
				'type'    => 'boolean',
				'default' => false,
			],
			'pagination' => [
				'type'    => 'boolean',
				'default' => false,
			],
			'sorter' => [
				'type'    => 'boolean',
				'default' => false,
			],
		];
	}

	/**
	 * Handles output of the block.
	 *
	 * @param array $attributes settings sent through.
	 * @return string
	 */
	public static function render_callback( $attributes ) {

		ob_start();

		print_r( $attributes );

		return ob_get_clean();

	}

}
