Meteor.methods({
    userData:function(){
        return Meteor.users.aggregate([
               {$group: {_id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}}, usersByMonth: {$sum: 1}}},
               {$sort:{"_id.year":1, "_id.month":1}},
               {$group: {_id: null, timeData: {$push: "$_id"}, usersByMonth: {$push: "$usersByMonth"}, totalUsers: {$sum: "$usersByMonth"}}}
            ]);
    },
    userDataByDay:function(){
        return Meteor.users.aggregate([
                {$group: {_id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}, day: {$dayOfMonth: "$createdAt"}}, usersByDay: {$sum: 1}}},
                {$sort: {"_id.year": 1, "_id.month": 1, "_id.day": 1}},
                {$group: {_id: null, timeData: {$push: "$_id"}, usersByDay: {$push: "$usersByDay"}, totalUsers: {$sum: "$usersByDay"}}}
            ])
    },
    getUserContactLength:function(nodeId){
        return UserEdges.find({$or:[{vertexStart: nodeId}, {vertexEnd:nodeId}], isContact:true}).count();
    },
    publicBookingsByUserId:function(userId){
        return PublicBookings.find({createdBy:userId}).fetch();
    },
    totalInvtesSentByNodeId:function(nodeId) {
        var edges = UserEdges.find({vertexStart: nodeId, status: 'pending'}).count()
        var nodes = Nodes.find({externalEmail: {$exists: false}, userId: {$exists: true}, referringNodeIds: nodeId}).count()
        return edges + nodes;
    },
    totalInvitesSent:function(){
        var pendingCount = UserEdges.find({status:'pending'}).count();
        var nodes = Nodes.aggregate([
            {$match: {externalEmail: {$exists: false}, userId: {$exists: true}, "referringNodeIds.0": {$exists: true}}},
            {$unwind: "$referringNodeIds"},
            {$group: {_id: null, count: {$sum: 1}}}
        ]);
        return nodes[0].count + pendingCount;
    },
    totalInvitesAccepted:function() {
        var nodes = Nodes.aggregate([
            {$match: {externalEmail: {$exists: false}, userId: {$exists: true}, "referringNodeIds.0": {$exists: true}}},
            {$group: {_id: null, count: {$sum: 1}}}
        ]);
        return nodes[0].count;
    },
    totalConfirmedConnections:function() {
        return UserEdges.find({status:"confirmed"}).count();
    }
})
