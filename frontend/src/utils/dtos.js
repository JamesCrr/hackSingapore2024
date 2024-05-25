export class Group {
	constructor(name="", description="", interests=[], creator="", recommendedActivities=[], members=[]) {
		this.name = name;
		this.description = description;
		this.interests = interests;
		this.creator = creator;
		this.recommendedActivities = recommendedActivities;
		this.members = members
	}
}
export const GroupConverter = {
	toFirestore: (group) => {
		return {
			name: group.name,
			description: group.description,
			interests: group.interests,
			creator: group.creator,
			recommendedActivities: group.recommendedActivities,
			members: group.members
		}
	},
	fromFirestore: (doc) => {
		return new Group(doc.name, doc.description, doc.interests, doc.creator);
	}
}