/**
 * Listings query block editor settings.
 */

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const el = wp.element.createElement;

import {
	PanelBody,
	QueryControls,
	ToggleControl,
	ServerSideRender,
	SelectControl,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import SortingOptions from '../utils/sortingOptions'

// Build the editor settings.
export default function (props) {

		const {
			attributes,
			setAttributes
		} = props;

		const {
			number,
			show_featured_only,
			pagination,
			sorter,
			sort,
		} = attributes;

		const settings = el(
			InspectorControls,
			null,

			// Query settings panel.
			el(
				PanelBody, {
					title: posterno_blocks.labels.listings.panel_query
				},
				el(
					QueryControls, {
						numberOfItems: number,
						onNumberOfItemsChange: (value) => props.setAttributes({
							number: value
						}),
					}
				),
				el(
					ToggleControl, {
						label: posterno_blocks.labels.listings.featured,
						checked: show_featured_only,
						onChange: function () {
							setAttributes({
								show_featured_only: !show_featured_only
							});
						},
					}
				),
				el(
					SelectControl, {
						label: posterno_blocks.labels.listings.sort,
						value: sort,
						options: SortingOptions,
						onChange: (value) => props.setAttributes({
							sort: value
						}),
					}
				)
			),

			// Layout settings panel.
			el(
				PanelBody, {
					title: posterno_blocks.labels.listings.panel_layout,
					initialOpen: false
				},

				el(
					ToggleControl, {
						label: posterno_blocks.labels.listings.pagination,
						checked: pagination,
						onChange: function () {
							setAttributes({
								pagination: !pagination
							});
						},
					}
				),
				el(
					ToggleControl, {
						label: posterno_blocks.labels.listings.sorter,
						checked: sorter,
						onChange: function () {
							setAttributes({
								sorter: !sorter
							});
						},
					}
				),
			),

		);

		return [
			settings,
			el(ServerSideRender, {
				block: "posterno/listings",
				attributes: props.attributes,
			}),
		];
	}
