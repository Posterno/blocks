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
					this.props.onChange( { terms: tokens } )
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
