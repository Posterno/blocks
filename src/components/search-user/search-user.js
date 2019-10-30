/**
 * External dependencies.
 */
import { debounce, escape } from 'lodash';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n

import { Component, Fragment } from '@wordpress/element';
import { TextControl, Spinner, Notice, Button } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch'

/**
 * Internal dependencies.
 */
import './style.scss'

/**
 * Search for users from the database.
 */
class SearchUser extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			results: [],
			loading: false,
			error: false
		};

		this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
	}

	componentDidMount() {
		console.log( this.props )
	}

	onSearch( search ) {

		if( search.length < 3 ) {
			return
		}

		// Toggle loading status
		this.setState( { loading: true, error: false } )

		apiFetch( { path: '/wp/v2/users/?search=' + escape( search ) } )
		.then( users => {

			this.setState( { loading: false } )

			if ( users.length > 0 ) {
				this.setState( { results: users, error: false } )
			} else {
				this.setState( { results: [], error: true } )
			}

		} );

	}

	render() {
		const { results } = this.state
		const { placeholder, label, help } = this.props

    	return (
      		<Fragment>
				<TextControl
					type="search"
					label={ label }
					placeholder={ placeholder }
					help={ help }
					onChange={ this.debouncedOnSearch }
				/>

				{ this.state.loading && (
					<div class="spinner-wrapper">
        				<Spinner/>
					</div>
				) }

				{ this.state.error && (
					<Notice status="warning" isDismissible={ false }>
						{ posterno_blocks.labels.search_user_error }
					</Notice>
				) }

				{ this.props.existing_id > 0  && (
					<Button isDefault isDestructive onClick={ () => this.props.onChange( { user_id: 0 } ) }>{ posterno_blocks.labels.search_user_selected } [{ this.props.existing_id }]</Button>
				) }

				{ this.state.results.length > 0 && Array.isArray( results ) && (
					<div className="posterno-panel-results">
						<ul>
						{ results.map( user => {
							return (
								<li
									key={user.id}
									onClick={ () => this.props.onChange( { user_id: user.id } ) }
								>
									<img src={ user.avatar_urls['48'] } alt={ user.name } />
									<span>{ user.name }</span>
								</li>
							)
						} ) }
						</ul>
					</div>
				) }

      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
SearchUser.defaultProps = {
	placeholder: '',
	label: '',
	help: '',
};

export default SearchUser
