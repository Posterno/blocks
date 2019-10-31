/**
 * External dependencies.
 */
import { xor, debounce, includes } from 'lodash';
import axios from 'axios';

/**
 * WordPress dependencies.
 */
import { Component, Fragment } from '@wordpress/element';
import { CheckboxControl, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Get taxonomy terms from the database.
 *
 * I'm no react expert but it seems to be working ¯\_(ツ)_/¯.
 */
class TaxonomyFilter extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			loading: false,
		};

		this.selectedTaxonomies = []
		this.availableTerms = []

		this.debouncedOnTaxonomiesChange = debounce( this.onTaxonomiesChange.bind( this ), 400 );

	}

	/**
	 * Add or remove a taxonomy from the list of selected ones.
	 *
	 * @param {string} taxonomy
	 * @memberof TaxonomyFilter
	 */
	toggleTaxonomy( taxonomy ) {
		this.selectedTaxonomies = xor( this.selectedTaxonomies, [ taxonomy ] )
		this.debouncedOnTaxonomiesChange()
	}

	/**
	 * Get the list of terms available from the database.
	 *
	 * @param {array} taxonomies
	 * @memberof TaxonomyFilter
	 */
	getTerms( taxonomies ) {

		if ( taxonomies.length <=0 ) {
			return
		}

		this.setState( { loading: true } )

		const configParams = {
			nonce: posterno_blocks.nonces.get_terms,
			action: 'pno_get_taxonomies_terms_for_block',
			taxonomies: taxonomies,
		}

		axios.get( posterno_blocks.ajax, {
			params: configParams
		})
		.then( response => {

			console.log( response )

			this.setState( { loading: false } )

		})
		.catch( error => {

			this.setState( { loading: false } )

			throw error

		})

	}

	/**
	 * When taxonomies are changed, reload the list of terms.
	 *
	 * @memberof TaxonomyFilter
	 */
	onTaxonomiesChange() {
		this.props.onTaxSelection( { taxonomies: this.selectedTaxonomies.join(',') } )
		this.getTerms( this.selectedTaxonomies )
	}

	render() {

		const taxonomiesAvailable = posterno_blocks.registered_taxonomies;

		const TaxonomyCheckboxControl = ( { checked, ...props } ) => {
			const [ isChecked, setChecked ] = useState( checked );

			return (
				<CheckboxControl
					{ ...props }
					disabled = { this.state.loading === true }
					checked = { isChecked || includes( this.selectedTaxonomies, props.taxonomy ) === true }
					onChange = { (value) => {
						setChecked
						this.toggleTaxonomy( props.taxonomy )
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
							taxonomy={ taxonomy_id }
						/>
					))
				}

				{ this.state.loading && (
					<div class="spinner-wrapper">
        				<Spinner/>
					</div>
				) }

      		</Fragment>
    	)
	}

}

/**
 * Setup default props for the component.
 */
TaxonomyFilter.defaultProps = {
	selectedTaxonomies: [],
	selectedTerms: [],
};

export default TaxonomyFilter
