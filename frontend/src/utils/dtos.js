export class Group {
	constructor(name="", description="", interests=[], creator="", recommendedActivities=[], members=[], participation=[]) {
		this.name = name;
		this.description = description;
		this.interests = interests;
		this.creator = creator;
		this.recommendedActivities = recommendedActivities;
		this.members = members
		this.participation = participation
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
			members: group.members,
			participation: group.participation
		}
	},
	fromFirestore: (snapshot, options) => {
		const doc = snapshot.data(options);
		return new Group(doc.name, doc.description, doc.interests, doc.creator, doc.recommendedActivities, doc.members, doc.participation);
	}
}