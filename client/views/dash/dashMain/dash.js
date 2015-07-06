// ----------------------------------------------------------------------------
// @author: kris@sunsama.com
// desciption: admin dashboard for sunsama stastics
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Session Variable instantiation
// ----------------------------------------------------------------------------
// todo


// ----------------------------------------------------------------------------
// Template global variables
// ----------------------------------------------------------------------------
var mapDict = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
}


// ----------------------------------------------------------------------------
// Template created callback
// ----------------------------------------------------------------------------
Template.dash.onCreated(function(){
    var self = this;
    self.subscribe("userData");
    self.autorun(function(){
        var status = Meteor.status();
        console.log(status);
    })

})


// ----------------------------------------------------------------------------
// Template rendered callback
// ----------------------------------------------------------------------------
Template.dash.onRendered(function() {
    var dataArr = [];
    var monthArr = [];
    var dayArr = [];
    var data2Arr = [];
    Meteor.call("userData", function(err,res){
        if(!err && res){
            var usersByMonth = res[0].timeData;
            usersByMonth.forEach(function(month, idx){
                month.usersAdded = res[0].usersByMonth[idx]
                dataArr.push(month.usersAdded)
                monthArr.push(mapDict[month.month] + ", " + month.year)
            })
            var ctx = document.getElementById("userChart").getContext("2d");
            var data = {
                labels: monthArr,
                datasets: [
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: dataArr
                    }
                ]
            }
            var myLineChart = new Chart(ctx).Line(data, {responsive:true, datasetFill:false});
        }
    });
    Meteor.call("userDataByDay", function(err,res){
        if(!err && res){
            var usersByDay = res[0].timeData;
            usersByDay.forEach(function(day, idx){
                day.usersAdded = res[0].usersByDay[idx]
                data2Arr.push(day.usersAdded)
                dayArr.push(mapDict[day.month] + " " + day.day + ", " + day.year)
            })
            var ctx = document.getElementById("userChartByDay").getContext("2d");
            var data = {
                labels: dayArr,
                datasets: [
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: data2Arr
                    }
                ]
            }
            var myLineChart = new Chart(ctx).Line(data, {responsive:true, datasetFill:false});
        }
    });
});


// ----------------------------------------------------------------------------
// Template destroyed callback
// ----------------------------------------------------------------------------
Template.dash.onDestroyed(function(){

})


// ----------------------------------------------------------------------------
// Event Map
// ----------------------------------------------------------------------------
Template.dash.events({
    // todo
})


// ----------------------------------------------------------------------------
// Helper map
// ----------------------------------------------------------------------------
Template.dash.helpers({
    newUsers:function(){
        return Meteor.users.find({}, {sort: {createdAt:-1}});
    },
    conLength:function(nodeId){
        // Not elegant.  Look for fixes in the future.
        Meteor.call("getUserContactLength", nodeId, function(err, length){
            Session.set(nodeId, {contactLength:length});
        });
        return Session.get(nodeId) ? Session.get(nodeId).contactLength : 0;
    },
    totalBookings:function(userId){
        Meteor.call("publicBookingsByUserId", userId, function(err, bookings){
            Session.set(userId, {bookingCount: bookings.length});
        })
        return Session.get(userId) ? Session.get(userId).bookingCount : 0;
    },
    totalInvitesSent:function(nodeId, username){
        Meteor.call("totalInvtesSentByNodeId", nodeId, function(err, invites){
            Session.set(username, {invitesSent: invites});
        });
        return Session.get(username) ? Session.get(username).invitesSent : 0;
    },

})
