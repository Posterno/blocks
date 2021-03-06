/**
 * External dependencies.
 */
import { xor, debounce, includes, isArray } from 'lodash';
import axios from 'axios';

/**
 * WordPress dependencies.
 */
import { Component, Fragment } from '@wordpress/element';
import { CheckboxControl, Spinner, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import TermsSelector from '../terms-selector'

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
			availableTerms: [],
			error: false,
		};

		this.selectedTerms = ''
		this.selectedTaxonomies = []

		this.debouncedOnTaxonomiesChange = debounce( this.onTaxonomiesChange.bind( this ), 400 );

	}

	/**
	 * If taxonomies have been sent through a prop, persist them, then load terms list via ajax.
	 *
	 * @memberof TaxonomyFilter
	 */
	componentDidMount() {

		if ( this.props.selectedTerms ) {
			this.selectedTerms = this.props.selectedTerms
		}

		if ( ! isArray( this.props.selectedTaxonomies ) ) {
			const tax = this.props.selectedTaxonomies.split( ',' )
			if ( tax.length > 0 ) {
				this.selectedTaxonomies = tax
				this.getTerms( tax, true )
			}
		}
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

		this.setState( { loading: true, error: false } )

		const configParams = {
			nonce: posterno_blocks.nonces.get_terms,
			action: 'pno_get_taxonomies_terms_for_block',
			taxonomies: taxonomies,
		}

		axios.get( posterno_blocks.ajax, {
			params: configParams
		})
		.then( response => {
			this.setState( { loading: false, availableTerms: response.data.data } )
		})
		.catch( error => {
			this.setState( { loading: false, error: true } )
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
				<div className="pno-taxonomies-checkboxes">
				{
					Object.keys( taxonomiesAvailable ).map( taxonomy_id => (
						<TaxonomyCheckboxControl
							label={ taxonomiesAvailable[taxonomy_id].label }
							taxonomy={ taxonomy_id }
						/>
					))
				}
				</div>

				{ this.state.loading && (
					<div class="spinner-wrapper">
        				<Spinner/>
					</div>
				) }

				{ this.state.error && (
					<Notice status="warning" isDismissible={ false }>
						{ posterno_blocks.labels.nonce_error }
					</Notice>
				) }

				<TermsSelector
					terms={ this.state.availableTerms }
					taxonomies={ this.selectedTaxonomies }
					selectedTerms={ this.selectedTerms }
					disabled={ this.state.loading }
					onChange = { (value) => {
						this.props.onTermsSelection( { terms: value } )
					} }
				/>

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
