export class Group {
  constructor(name = "", description = "", interests = [], creator = "", recommendedActivities = [], members = []) {
    this.name = name;
    this.description = description;
    this.interests = interests;
    this.creator = creator;
    this.recommendedActivities = recommendedActivities;
    this.members = members;
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
    };
  },
  fromFirestore: (doc) => {
    return new Group(doc.name, doc.description, doc.interests, doc.creator);
  },
};

export class User {
  constructor(name = "", interests = [], calender = []) {
    this.name = name;
    this.interests = interests;
    this.calender = calender;
  }
}
export const UserConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      interests: user.interests,
      calender: user.calender,
    };
  },
  fromFirestore: (doc) => {
    return new User(doc.name, doc.interests, doc.calender);
  },
};
