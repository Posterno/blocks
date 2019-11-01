/**
 * External dependencies.
 */
import { findKey } from 'lodash'

/**
 * WordPress dependencies.
 */
import { Component, Fragment } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components'
import { withState } from '@wordpress/compose';

/**
 * Search for terms.
 */
class SearchTerm extends Component {

	constructor() {
		super( ...arguments );
	}

	/**
	 * Because tokens use the names of each term, we need to parse them back to the list of ids
	 * so that we can use it later into the WP_Query into the block.
	 */
	parseTokensNamesToObject( tokens ) {

		let list = []

		Object.keys(tokens).forEach( ( item ) => {
			var key = findKey( this.props.terms, ( v ) => {
				return v === tokens[item];
			});
			list.push( key )
		});

		return list

	}

	render() {

		const MyFormTokenField = withState( {
			tokens: this.props.tokens,
			suggestions: this.props.terms,
		} )( ( { tokens, suggestions, setState } ) => (

			<FormTokenField
				label={ this.props.label }
				value={ tokens }
				suggestions={ suggestions }
				onChange = { tokens => {
					setState( { tokens } )
					this.props.onChange( { terms: this.parseTokensNamesToObject( tokens ) } )
				} }
			/>

		) );

    	return (
      		<Fragment>
				<MyFormTokenField/>
      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
SearchTerm.defaultProps = {
	terms: [],
	label: '',
	tokens: []
};

export default SearchTerm
