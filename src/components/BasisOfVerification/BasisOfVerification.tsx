import * as React from 'react'
import _ from 'lodash'
import uuid from 'uuid/v4'
import './BasisOfVerification.scss'
import './Modal.scss'

interface ProofingSubtypesObj {
	id: string
	proofing_type: string
	statement: string
	evidenceDocument: string
	subjectPresence: string
	documentPresence: string
	[key: string]: string | number | boolean
}

interface ProofingAnnotation {
	id: URL | string
	type: string
	annotator: string
	subtypes: ProofingSubtypesObj[]
}

const ProofingAnnotations: ProofingAnnotation = {
	id: `https://example.com/annotation/proofing/${uuid()}`,
	type: 'ProofingAnnotation',
	annotator: 'Issuer1',
	subtypes: [
		{
			id: uuid(),
			proofing_type: 'DocumentVerification',
			statement: 'I verified their identity based on their Driver’s License or government-issued picture ID.',
			evidenceDocument: 'DriversLicense',
			subjectPresence: 'Physical',
			documentPresence: 'Physical'
		},
		{
			id: uuid(),
			proofing_type: 'InPerson',
			statement: 'We met in person and they provided me with their name and contact info.',
			evidenceDocument: 'Note',
			subjectPresence: 'Physical',
			documentPresence: 'Physical'
		},
		{
			id: uuid(),
			proofing_type: 'TrustedAssociate',
			statement: 'I was introduced to them in person by a trusted associate who gave me information.',
			evidenceDocument: 'Note',
			subjectPresence: 'Physical',
			documentPresence: 'Physical'
		},
		{
			id: uuid(),
			proofing_type: 'SystemOfRecord',
			statement: 'I got this information from a database or application managed by an organization I work for.',
			evidenceDocument: 'ApplicationRecord',
			subjectPresence: 'No',
			documentPresence: 'No'
		},
		{
			id: uuid(),
			proofing_type: 'Belief',
			statement: 'I was given this information and believe it to be correct but have not verified.',
			evidenceDocument: 'Note',
			subjectPresence: 'No',
			documentPresence: 'No'
		}
	]
}


const _emailVerify = () => {
	return true
}

interface State {
	proofingAnnotations: {
		type: string
		list: ProofingSubtypesObj[]
	}
	showModal: boolean
	hideDialog: boolean
	current: string
}

interface Props { }

class BasisOfVerification extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			proofingAnnotations: {
				type: 'Annotation',
				list: []
			},
			showModal: false,
			hideDialog: true,
			current: ''
		}
	}


	render() {

		return (
			<section className="section__basis">
				<h2>Hello BasisOfVerification Component</h2>
			</section>

		)
	}
}

export default BasisOfVerification