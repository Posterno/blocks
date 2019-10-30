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

		const TaxonomyCheckboxControl = ( { checked, ...props } ) => {
			const [ isChecked, setChecked ] = useState( checked );
			return (
				<CheckboxControl
					{ ...props }
					checked={ isChecked }
					onChange= { (value) => {
						console.log( value )
					} }
				/>
			);
		};

    	return (
      		<Fragment>
				<p>{ posterno_blocks.labels.listings.taxonomy_select }</p>
				{
					Object.keys( taxonomiesAvailable ).map( taxonomy_id => (
						<TaxonomyCheckboxControl
							label={ taxonomiesAvailable[taxonomy_id].label }
						/>
					))
				}
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
