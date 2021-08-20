const TeamInfoSchema = {
	type: "object",
	required: [
		"team_id",
		"abbreviation",
		"active",
		"first_name",
		"last_name",
		"conference",
		"division",
		"site_name",
		"city",
		"state",
		"full_name"
	],
	properties: {
		team_id: { type: "string" },
		abbreviation: { type: "string" },
		active: { type: "boolean" },
		first_name: { type: "string" },
		last_name: { type: "string" },
		conference: { type: "string" },
		division: { type: "string" },
		site_name: { type: "string" },
		city: { type: "string" },
		state: { type: "string" },
		full_name: { type: "string" }
	}
};

const SiteSchema = {
	type: "object",
	required: [
		"capacity",
		"surface",
		"name",
		"state",
		"city"
	],
	properties: {
		capacity: { type: "number" },
		surface: { type: "string" },
		name: { type: "string" },
		state: { type: "string" },
		city: { type: "string" }
	}
};

const EventSchema = {
	type: "object",
	required: [
		"site",
		"temperature",
		"attendance",
		"duration",
		"status",
		"season_type",
		"start_date_time"
	],
	properties: {
		site: SiteSchema,
		temperature: { type: "number" },
		attendance: { type: "number" },
		duration: { type: "string" },
		status: { type: "string" },
		season_type: { type: "string" },
		start_date_time: { type: "string" } // Date
	}
};

const OfficialSchema = {
	type: "object",
	required: [
		"position",
		"first_name",
		"last_name"
	],
	properties: {
		position: { type: "string" },
		first_name: { type: "string" },
		last_name: { type: "string" }
	}
};

export const GameSchema = {
	league: { type: "string" },
	away_team: TeamInfoSchema,
	home_team: TeamInfoSchema,
	away_period_scores: { type: "array", items: { type: "number" } },
	home_period_scores: { type: "array", items: { type: "number" } },
	officials: { type: "array", items: OfficialSchema },
	event_information: EventSchema,
};