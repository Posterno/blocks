/**
 * External dependencies.
 */
import { findKey } from 'lodash';

/**
 * WordPress dependencies.
 */

import { Component, Fragment } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';

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
			if ( props.selectedTerms ) {
				this.termsSelected = JSON.parse( props.selectedTerms )
			}
		}
	}

	/**
	 * Because tokens use the names of each term, we need to parse them back to the list of ids
	 * so that we can use it later into the WP_Query into the block.
	 */
	parseTokensNamesToObject( tokens, taxonomy ) {

		let list = []

		Object.keys(tokens).forEach( ( item ) => {
			var key = findKey( this.props.terms[ taxonomy ], ( v ) => {
				return v === tokens[item];
			});
			list.push( key )
		});

		return list

	}

	updateSelectedTerms( tokens, taxonomy ) {
		this.termsSelected[ taxonomy ] = this.parseTokensNamesToObject( tokens, taxonomy )
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
							disabled={ this.props.disabled }
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
TermsSelector.defaultProps = {
	disabled: false
};

export default TermsSelector
