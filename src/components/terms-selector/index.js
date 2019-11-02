/**
 * External dependencies.
 */
import { findKey, each } from 'lodash';

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
				this.termsSelected = this.parseIdsToNames( JSON.parse( props.selectedTerms ), props.terms )
			}
		}
	}

	/**
	 * When receiving selected terms back from the block, we need to convert the IDs to names
	 * so that they can be displayed within the token's selector field.
	 *
	 * @param {*} tokens
	 * @memberof TermsSelector
	 */
	parseIdsToNames( tokens, availableTerms ) {

		let list = {}

		each( tokens, ( selectedTermsList, taxonomyName ) => {
			if ( availableTerms[ taxonomyName ] ) {
				let TermNames = []

				selectedTermsList.forEach( ( termID ) => {
					TermNames.push( availableTerms[ taxonomyName ][ termID ] )
				});

				list[ taxonomyName ] = TermNames
			}
		} );

		return list

	}

	/**
	 * Because tokens use the names of each term, we need to parse them back to the list of ids
	 * so that we can use it later into the WP_Query into the block.
	 */
	parseNamesToIDs( tokens ) {

		let list = {}

		each( tokens, ( selectedTermsList, taxonomyName ) => {

			let TermIDs = []

			selectedTermsList.forEach( ( termName ) => {
				TermIDs.push( findKey( this.props.terms[ taxonomyName ], ( item ) => ( item.indexOf( termName ) !== -1 ) ) )
			});

			list[ taxonomyName ] = TermIDs

		} );

		return list

	}

	updateSelectedTerms( tokens, taxonomy ) {

		this.termsSelected[ taxonomy ] = tokens

		this.props.onChange( { terms: this.parseNamesToIDs( this.termsSelected ) } )

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
