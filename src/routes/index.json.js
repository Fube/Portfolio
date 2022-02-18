import contentful from 'contentful';

/**
 *
 * @param {Promise<contentful.EntryCollection<any>>[]} entryPromises
 * @returns
 */
function getRefinedEntries(...entryPromises) {
	return entryPromises.map((n) => n.then((entry) => entry.items.map((item) => item.fields)));
}

export async function get() {
	const client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
	});

	const [projects, whoAmI, about, timeline, cv] = await Promise.all([
		...getRefinedEntries(
			client.getEntries({
				content_type: 'projects',
				order: 'sys.createdAt'
			}),
			client.getEntries({
				content_type: 'whoami'
			}),
			client.getEntries({
				content_type: 'about'
			}),
			client.getEntries({
				content_type: 'timeline',
				order: 'fields.date'
			})
		),
		client.getAsset(process.env.CV_ID).then((asset) => asset.fields.file.url)
	]);

	return {
		body: {
			projects,
			whoAmI: whoAmI.map((n) => n.title),
			about: about[0].content.split('--BREAK--'),
			timeline,
			cv
		}
	};
}
