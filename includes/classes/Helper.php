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
			'pno_svg_logo' => PNO_PLUGIN_URL . 'assets/imgs/logo.svg',
			'attributes'   => [
				'listings' => Listings::get_attributes(),
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

}
