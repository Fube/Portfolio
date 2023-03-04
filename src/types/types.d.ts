type Project = {
	title: string;
	lang: string[];
	content: string;
	github: string;
};

interface TimelineEntry {
	date: Date | string;
	title: string;
	body: string;
}
