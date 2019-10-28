/**
 * Listings query block.
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block editor settings
import EditBlock from './edit';

// Register the block.
registerBlockType( 'posterno/listings', {
	title: posterno_blocks.labels.listings.title,
	description: posterno_blocks.labels.listings.description,
	icon: 'grid-view',
	category: 'posterno',
	keywords: posterno_blocks.labels.listings.keywords,

	attributes: posterno_blocks.attributes.listings,

	edit: EditBlock,

	save() {
		return null;
	}
});
