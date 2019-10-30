/**
 * External dependencies.
 */
import { debounce, escape } from 'lodash';

/**
 * WordPress dependencies.
 */
import { Component, Fragment } from '@wordpress/element';

/**
 * Search for users from the database.
 */
class TaxonomyFilter extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			selectedTaxonomies: [],
			loading: false,
			error: false,
		};

	}

	render() {

    	return (
      		<Fragment>
				Test
      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
TaxonomyFilter.defaultProps = {
	placeholder: '',
	label: '',
	help: '',
};

export default TaxonomyFilter
