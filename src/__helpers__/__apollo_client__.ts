import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import isomorphicFetch from 'isomorphic-fetch'

const httpLink = ApolloLink.from([
	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) => {
				console.log(
					`[GraphQL error]: Message: ${message}, 
					Location: ${locations}, Path: ${path}`
				)
			})
		}
		if (networkError) console.log(`[Network error]: ${networkError}`)
	}),
	new HttpLink({
		fetch: isomorphicFetch,
		uri: 'https://ds-webshield.resilient-networks.com/v1/graphql',
		credentials: 'same-origin',
	}),
])

export default new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
})