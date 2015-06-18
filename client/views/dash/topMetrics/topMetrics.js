// ----------------------------------------------------------------------------
// @authors: kris@sunsama.com
// @date: May 6th, 2015
// @description: These are the most basic metrics we track
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Session variable instantiation
// ----------------------------------------------------------------------------
// todo


// ----------------------------------------------------------------------------
// Template created callback
// ----------------------------------------------------------------------------
Template.topMetrics.onCreated(function(){
    var self = this;
    self.subscribe("totalUsers");
    self.subscribe("totalEventsCreated");
    self.subscribe("totalBookingsCreated");
    self.subscribe("totalBookingsBooked");
})


// ----------------------------------------------------------------------------
// Template rendered callback
// ----------------------------------------------------------------------------
Template.topMetrics.onRendered(function(){
    // rendered callback
})


// ----------------------------------------------------------------------------
// Template destroyed callback
// ----------------------------------------------------------------------------
Template.topMetrics.onDestroyed(function(){
    // destroyed callback
})



// ----------------------------------------------------------------------------
// Event map
// ----------------------------------------------------------------------------
Template.topMetrics.events({
    //
})


// ----------------------------------------------------------------------------
// Helper Map
// ----------------------------------------------------------------------------
Template.topMetrics.helpers({
    totalEvents:function() {
        var totalEvents = EventCounts.findOne();
        return totalEvents ? totalEvents.count + 348 : 348;
    },
    totalBookings:function() {
        var totalBookings = BookingsCounts.findOne();
        return totalBookings ? totalBookings.count : 0;
    },
    totalBookingsBooked:function() {
        var totalBookingsBooked = BookingsBookedCounts.findOne();
        return totalBookingsBooked ? totalBookingsBooked.count : 0;
    },
    totalUsers:function(){
        var totalUsers = TotalUserCounts.findOne();
        return totalUsers ? totalUsers.count : 0;
    },
    usersByMonth:function(){
        var dataPoints = Meteor.call("userData");
    },
    totalInvitesSent:function(){
        Meteor.call("totalInvitesSent", function(err, invites){
            Session.set("totalInvitesSent", invites);
        });
        return Session.get("totalInvitesSent");
    },
    totalInvitesAccepted:function(){
        Meteor.call("totalInvitesAccepted", function(err, invites){
            Session.set("totalInvitesAccepted", invites);
        });
        return Session.get("totalInvitesAccepted");
    },
    averageInvitesSentPerUser:function(){
        var totalUsers = TotalUserCounts.findOne() ? TotalUserCounts.findOne().count : 1;
        return (Session.get("totalInvitesSent") / totalUsers).toFixed(3);
    },
    averageConnectionsPerUser:function() {
        var totalUsers = TotalUserCounts.findOne() ? TotalUserCounts.findOne().count : 1;
        Meteor.call("totalConfirmedConnections",function(err, count){
            Session.set("averageConnectionsPerUser", (count / totalUsers).toFixed(3));
        })
        return Session.get("averageConnectionsPerUser");
    }
})
