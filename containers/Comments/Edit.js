import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { values, isEmpty } from 'lodash'
import PropTypes from '../../PropTypes'
import { updateComment } from '../../actions'
import SchemaFormField from '../../components/General/SchemaFormField'
import MultilineTextFormField from '../../components/General/FormFields/MultilineText'

export default class Edit extends Component {
	static navigatorButtons = {
		rightButtons: [
			{
				title: 'Save',
				id: 'save'
			}
		]
	}
	constructor(props) {
		super(props)
		this.state = {
			comment: {...props.comments.comments[ this.props.comment ]}
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave()
	}
	onChangePropertyValue( property, value ) {
		var comment = this.state.comment

		if ( property === 'content' ) {
			comment[ property ].raw = value
		} else {
			comment[ property ] = value
		}
		this.setState({comment})
	}
	onSave() {
		this.props.dispatch( updateComment( this.state.comment ) )
		this.props.navigator.pop()
	}
	render() {
		var schema = this.props.comments.schema
		var object = this.state.comment

		var namesMap = {
			author_email: 'Author Email',
			author_ip: 'Author IP Address',
			author_name: 'Author Name',
			author_url: 'Author Website',
			date: 'Date',
			karma: 'Karma',
			status: 'Status',
		}

		return (
			<ScrollView>
				<View style={styles.contentField}>
					<MultilineTextFormField
						value={object.content.raw}
						onChange={ value => this.onChangePropertyValue( 'content', value ) }
						onSave={()=>{}}
					/>
				</View>
				<View style={styles.list}>
					{Object.entries( schema.properties )
						.filter( properties => [ 'author', 'date_gmt', 'parent', 'post', 'type' ].indexOf( properties[0] ) == -1 )
						.map( properties => {
							const propertySchema = properties[1]
							const property = properties[0]
							const value = object[ property ]

							if ( typeof value === 'undefined' ) {
								console.log( 'Can not find schema property ' + property + ' in object.' )
								return null
							}

							if ( propertySchema.readonly ) {
								return null;
							}

							return <View style={styles.listItem} key={property}>
								<SchemaFormField
									name={namesMap[ property ] ? namesMap[ property ] : property}
									schema={propertySchema}
									value={value}
									onChange={ value => this.onChangePropertyValue( property, value ) }
									onSave={()=>{}}
								/>
							</View>
						})
					}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		paddingTop: 15,
	},
	contentField: {
		margin: 10,
	},
})
