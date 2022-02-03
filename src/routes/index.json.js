import contentful from 'contentful';

export async function get() {
	const client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
	});

	const [projects, whoAmI] = await Promise.all([
		client.getEntries({
			content_type: 'projects',
			order: 'sys.createdAt'
		}),
		client.getEntries({
			content_type: 'whoami'
		})
	]).then((entries) => entries.map((entry) => entry.items.map((items) => items.fields)));

	return {
		body: {
			projects,
			whoAmI: whoAmI.map((n) => n.title)
		}
	};
}
