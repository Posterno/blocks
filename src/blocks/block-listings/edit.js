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
import SearchUser from '../../components/search-user/search-user'
import TaxonomyFilter from '../../components/taxonomy-filter'

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
			sort_by,
			user_id,
			layout,
			taxonomies,
			terms,
		} = attributes;

		const sortByOptions = posterno_blocks.query_sort_by
		const layoutOptions = posterno_blocks.layout_options

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
				),
				el(
					SelectControl, {
						label: posterno_blocks.labels.listings.sort_by,
						value: sort_by,
						options: sortByOptions,
						onChange: (value) => props.setAttributes({
							sort_by: value
						}),
					}
				),
				el(
					SearchUser, {
						label: posterno_blocks.labels.search_user_label,
						placeholder: posterno_blocks.labels.placeholder_search_user,
						existing_id: user_id,
						onChange: (value) => props.setAttributes({
							user_id: value.user_id
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
				el(
					SelectControl, {
						label: posterno_blocks.labels.listings.layout,
						value: layout,
						options: layoutOptions,
						onChange: (value) => props.setAttributes({
							layout: value
						}),
					}
				),
			),

			el(
				PanelBody, {
					title: posterno_blocks.labels.listings.panel_taxonomy,
					initialOpen: false
				},
				el(
					TaxonomyFilter, {
						selectedTaxonomies: taxonomies,
						selectedTerms: terms,
						onTaxSelection: (value) => props.setAttributes({
							taxonomies: value.taxonomies
						}),
						onTermsSelection: ( value ) => {
							setAttributes({
								terms: JSON.stringify( value.terms.terms )
							});
						},
					}
				)
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
