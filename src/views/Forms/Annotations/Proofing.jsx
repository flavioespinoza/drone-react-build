import * as React from 'react';
import uuid from 'uuid/v4';

let id_url = 'http://localhost:8080/api/'

export default [
  {
		id: `${id_url}${uuid()}`,
		type: ['https://ado.utm.webshield.io/ProofingAnnotation'],
		proofing_type: ['https://ado.utm.webshield.io/DocumentVerification'],
    annotator: undefined,
    annotationText:
      'I verified their identity based on their Driver’s License or government issued picture ID.',
    evidence: {
      evidenceDocument: 'DriversLicense',
      subjectPresence: 'Physical',
      documentPresence: 'Physical'
		},
		icon: 'address-card',
		name: 'document_verification'
  },
  {
		id: `${id_url}${uuid()}`,
		type: ['https://ado.utm.webshield.io/ProofingAnnotation'],
		proofing_type: ['https://ado.utm.webshield.io/InPerson'],
    annotator: undefined,
    annotationText:
      'We met in person and they provided me with their name and contact info.',
    evidence: {
      evidenceDocument: 'Note',
      subjectPresence: 'Physical',
      documentPresence: 'Physical'
		},
		icon: 'handshake',
		name: 'in_person'
  },
  {
		id: `${id_url}${uuid()}`,
		type: ['https://ado.utm.webshield.io/ProofingAnnotation'],
		proofing_type: ['https://ado.utm.webshield.io/TrustedAssociate'],
    annotator: undefined,
    annotationText:
      'I was introduced to them in person by a trusted associate who gave me information',
    evidence: {
      evidenceDocument: 'Note',
      subjectPresence: 'Physical',
      documentPresence: 'Physical'
    },
		icon: 'user-friends',
		name: 'trusted_associate'
  },
  {
		id: `${id_url}${uuid()}`,
		type: ['https://ado.utm.webshield.io/ProofingAnnotation'],
		proofing_type: ['https://ado.utm.webshield.io/SystemOfRecord'],
    annotator: undefined,
    annotationText:
      'I got this information from a database or application managed by an organization I work for.',
    evidence: {
      evidenceDocument: 'ApplicationRecord',
      subjectPresence: 'No',
      documentPresence: 'No'
    },
		icon: 'cabinet-filing',
		name: 'system_of_record'
  },
  {
		id: `${id_url}${uuid()}`,
		type: ['https://ado.utm.webshield.io/ProofingAnnotation'],
		proofing_type: ['https://ado.utm.webshield.io/Belief'],
    annotator: undefined,
    annotationText:
      'I was given this information and believe it to be correct but have not verified',
    evidence: {
      evidenceDocument: 'Note',
      subjectPresence: 'No',
      documentPresence: 'No'
		},
		icon: 'pray',
		name: 'belief'
	}
];
