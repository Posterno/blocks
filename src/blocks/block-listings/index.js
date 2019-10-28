/**
 * Listings query block.
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block editor settings
import EditBlock from './edit';

// Register the block.
registerBlockType( 'posterno/listings', {
	title: __('Listings'),
	description: __('Display listings.'),
	icon: 'grid-view',
	category: 'posterno',
	keywords: [
		__('listing'),
		__('list'),
	],

	attributes: posterno_blocks.attributes.listings,

	edit: EditBlock,

	// Server side render.
	save() {
		return null;
	}
});
