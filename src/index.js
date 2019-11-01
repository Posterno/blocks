const { __ } = wp.i18n;

/**
 * Import blocks.
 */
import './blocks/block-listings/index.js';
import './style.scss'

// Setup custom icon for the Posterno blocks category.
wp.blocks.updateCategory( 'posterno', { icon: <img style={{ height: '20px', 'margin-top': '-2px' }} src={ posterno_blocks.pno_svg_logo } alt={__('Posterno')} /> });
