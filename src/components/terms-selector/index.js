/**
 * External dependencies.
 */
import { debounce, escape } from 'lodash';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n

import { Component, Fragment } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';
import { withState } from '@wordpress/compose';

/**
 * Search for users from the database.
 */
class TermsSelector extends Component {

	constructor() {
		super( ...arguments );
		this.termsSelected = {}
	}

	componentWillReceiveProps( props ) {
		if ( props.terms !== this.props.terms ) {
			console.log( props )
		}
	}

	updateSelectedTerms( tokens, taxonomy ) {
		this.termsSelected[ taxonomy ] = tokens
		this.props.onChange( { terms: this.termsSelected } )
	}

	render() {

		const taxonomiesAvailable = posterno_blocks.registered_taxonomies;

    	return (
      		<Fragment>

				<div className="pno-terms-selector">
				{
					Object.keys( this.props.taxonomies ).map( taxonomy_index => (

						<FormTokenField
							label={ taxonomiesAvailable[ this.props.taxonomies[ taxonomy_index ] ].label }
							suggestions={ this.props.terms[ this.props.taxonomies[ taxonomy_index ] ] }
							value={ this.termsSelected[ this.props.taxonomies[ taxonomy_index ] ] && this.termsSelected[ this.props.taxonomies[ taxonomy_index ] ].length > 0 ? this.termsSelected[ this.props.taxonomies[ taxonomy_index ] ] : [] }
							onChange = { tokens => {
								this.updateSelectedTerms( tokens, this.props.taxonomies[ taxonomy_index ] )
							} }
						/>

					))
				}
				</div>

      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
TermsSelector.defaultProps = {};

export default TermsSelector
