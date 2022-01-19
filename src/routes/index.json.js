export async function get() {
	const url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=projects`;

	const response = await fetch(url);
	const json = await response.json();

	return {
		body: json.items
			.sort((a, b) => new Date(a.updatedAt) < new Date(b.updatedAt))
			.map((n) => n.fields)
	};
}
