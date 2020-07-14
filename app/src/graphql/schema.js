const graphql = require('graphql');

const Player = require('../mongo-models/player');
const Team = require('../mongo-models/team');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } = graphql;

const PlayerType = new GraphQLObjectType({
	name: 'Player',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		college: {
			type: GraphQLString
		},
		position: {
			type: GraphQLString
		},
		jerseyNumber: {
			type: GraphQLInt
		},
		team: {
			type: GraphQLString
		},
		twitter: {
			type: GraphQLString
		}
	})
});

const TeamType = new GraphQLObjectType({
	name: 'Team',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		city: {
			type: GraphQLString
		},
		state: {
			type: GraphQLString
		},
		twitter: {
			type: GraphQLString
		},
		arena: {
			type: GraphQLString
		},
		wins: {
			type: GraphQLInt
		},
		losses: {
			type: GraphQLInt
		},
		players: {
			type: new GraphQLList(PlayerType),
			resolve(parent, args) {
				return Player.find({
					team: parent.id
				});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		player: {
			type: PlayerType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				return Player.findById(args.id);
			}
		},
		team: {
			type: TeamType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				return Team.findById(args.id);
			}
		},
		players: {
			type: new GraphQLList(PlayerType),
			resolve(parent, args) {
				return Player.find({});
			}
		},
		teams: {
			type: new GraphQLList(TeamType),
			resolve(parent, args) {
				return Team.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPlayer: {
			type: PlayerType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				college: {
					type: new GraphQLNonNull(GraphQLString)
				},
				position: {
					type: new GraphQLNonNull(GraphQLString)
				},
				jerseyNumber: {
					type: new GraphQLNonNull(GraphQLInt)
				},
				team: {
					type: new GraphQLNonNull(GraphQLString)
				},
				twitter: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, args) {
				let player = new Player({
					name: args.name,
					college: args.college,
					position: args.position,
					jerseyNumber: args.jerseyNumber,
					team: args.team,
					twitter: args.twitter
				});
				return player.save();
			}
		},
		addTeam: {
			type: TeamType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				city: {
					type: new GraphQLNonNull(GraphQLString)
				},
				state: {
					type: new GraphQLNonNull(GraphQLString)
				},
				twitter: {
					type: new GraphQLNonNull(GraphQLString)
				},
				arena: {
					type: new GraphQLNonNull(GraphQLString)
				},
				wins: {
					type: new GraphQLNonNull(GraphQLInt)
				},
				losses: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve(parent, args) {
				let team = new Team({
					name: args.name,
					city: args.city,
					state: args.state,
					twitter: args.twitter,
					arena: args.arena,
					wins: args.wins,
					losses: args.losses,
					players: args.players
				});
				return team.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
