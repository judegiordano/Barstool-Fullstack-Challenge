declare interface IStyles {
	[key: string]: React.CSSProperties
}

declare interface IAuthor {
	id: number,
	name: string,
	author_url: string,
	avatar: string,
	twitter_handle: string,
	short_name: string,
	bio: string,
	headshot: string,
	merch_url: string,
	twitter: string,
	instagram: string,
	tiktok: string,
	sort: number,
	is_active: boolean,
	is_suggested: boolean,
	slug: string
}