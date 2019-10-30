/**
 * External dependencies.
 */
import { debounce, escape } from 'lodash';

/**
 * WordPress dependencies.
 */
import { Component, Fragment } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element'

/**
 * Search for users from the database.
 */
class TaxonomyFilter extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			selectedTaxonomies: [],
			selectedTerms: [],
			loading: false,
			error: false,
		};

	}

	render() {

		const taxonomiesAvailable = posterno_blocks.registered_taxonomies;

    	return (
      		<Fragment>

				<p>{ posterno_blocks.labels.listings.taxonomy_select }</p>

      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
TaxonomyFilter.defaultProps = {
	selectedTaxonomies: '',
	selectedTerms: '',
};

export default TaxonomyFilter
