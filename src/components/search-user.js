import { debounce } from 'lodash';

const { __ } = wp.i18n

import { Component, Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components'

export default class SearchUser extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			results: [],
			loading: true,
		};

		this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
	}

	componentDidMount() {
		console.log( this.props )
	}

	onSearch( search ) {
		console.log( search )
	}

	render() {
		const { results } = this.state
    	return (
      		<Fragment>
				<TextControl
					type="search"
					placeholder={ __( 'Test search' ) }
					onChange={ this.debouncedOnSearch }
				/>
      		</Fragment>
    	)
	}

}
