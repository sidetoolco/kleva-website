import { type QueryParams } from 'sanity';
import { sanityClient } from 'sanity:client';

/**
 * Executes a Sanity query and returns the result data
 *
 * @param options - Query options object
 * @param options.query - The GROQ query string to execute
 * @param options.params - Optional query parameters to inject into the query
 * @returns Promise containing the query result data
 * @template QueryResponse - The expected type of the query response
 */
export async function loadQuery<QueryResponse>({ query, params }: { query: string; params?: QueryParams }) {
	const { result } = await sanityClient.fetch<QueryResponse>(query, params ?? {}, { filterResponse: false });

	return {
		data: result,
	};
}
