import React, { Component, PropTypes } from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default class Email extends Component {
	static propTypes = {
		value: PropTypes.string,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	}
	render() {
		var placeholder = this.props.schema.required ? 'Required' : ''
		placeholder = this.props.schema.default ? this.props.schema.default : placeholder
		return <TextInput
			value={this.props.value}
			style={styles.container}
			keyboardType="email-address"
			autoCapitalize={"none"}
			autoCorrect={false}
			placeholder={placeholder}
			onChangeText={this.props.onChange}
			onSubmitEditing={this.props.onSave}
		/>
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 32,
		textAlign: 'right',
		color: '#666666'
	}
})
