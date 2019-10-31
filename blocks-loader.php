<?php
/**
 * Hooks the blocks component to WordPress.
 *
 * @package     posterno-blocks
 * @copyright   Copyright (c) 2019, Sematico, LTD
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       0.1.0
 */

use PosternoBlocks\Helper;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the Posterno blocks category for the Gutenberg editor.
 */
add_filter(
	'block_categories',
	function( $categories ) {

		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'posterno',
					'title' => 'Posterno',
				),
			)
		);

	}
);

/**
 * Register the script file containing all the blocks for the Gutenberg editor.
 */
add_action(
	'enqueue_block_editor_assets',
	function() {

		wp_enqueue_script(
			'posterno-blocks',
			PNO_PLUGIN_URL . 'vendor/posterno/blocks/build/index.js',
			[
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-components',
				'wp-editor',
			],
			PNO_VERSION,
			true
		);

		wp_enqueue_style( 'posterno-blocks-admin', PNO_PLUGIN_URL . 'vendor/posterno/blocks/build/style.css', [], PNO_VERSION );

		wp_localize_script( 'posterno-blocks', 'posterno_blocks', Helper::get_js_vars() );

	}
);

/**
 * Register server side blocks for the editor.
 */
add_action(
	'init',
	function() {
		Helper::register_server_side_blocks();
	}
);

/**
 * Register the ajax functionality to retrieve taxonomy terms for blocks.
 */
add_action( 'wp_ajax_pno_get_taxonomies_terms_for_block', [ Helper::class, 'get_taxonomies_terms' ] );
