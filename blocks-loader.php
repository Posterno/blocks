<?php
/**
 * Hooks the blocks component to WordPress.
 *
 * @package     posterno-blocks
 * @copyright   Copyright (c) 2019, Sematico, LTD
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       0.1.0
 */

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

	}
);
