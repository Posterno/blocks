/**
 * Listings query block editor settings.
 */

const { __ } = wp.i18n;
const el = wp.element.createElement;

import {
	PanelBody,
	QueryControls,
	ToggleControl,
	ServerSideRender,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

// Build the editor settings.
export default function (props) {
		const {
			attributes,
			setAttributes
		} = props;

		const {
			number,
			showpages
		} = attributes;

		const inspectorControls = el(
			InspectorControls,
			null,
			el(
				PanelBody, {
					title: __('List Last Changes Settings')
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
						label: __('Show changed pages'),
						checked: showpages,
						onChange: function () {
							setAttributes({
								showpages: !showpages
							});
						},
					}
				),

			),
		);

		return [
			inspectorControls,
			el(ServerSideRender, {
				block: "posterno/listings",
				attributes: props.attributes,
			}),
		];
	}
