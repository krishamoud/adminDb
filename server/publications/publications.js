// ----------------------------------------------------------------------------
// @author: kris@sunama.com
// @description: This is where all the publications live.  I might break this
//               up if it gets too large.
// @date: May 11, 2015
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// This publishes the total count of events created by sunsama
// ----------------------------------------------------------------------------
Meteor.publish("totalEventsCreated",function() {
    var self = this;
    var count = 0;
    var initializing = true;
    var _id = Random.id();
    // observeChanges only returns after the initial `added` callbacks
    // have run. Until then, we don't want to send a lot of
    // `self.changed()` messages - hence tracking the
    // `initializing` state.
    var e = CalendarEvents.findOne();
    var handle = CalendarEvents.find({

        "inviteeList.1": {$exists:true},
        "publicBookingsId":{$exists:true},
        "siftOriginalEvent": true
        },

        {fields:{_id:1}}).observeChanges({
        added: function (id) {
            count++;
            if (!initializing) {
                self.changed("eventCounts",_id, {count: count});
            }
        },
        removed: function (id) {
            count--;
            self.changed("eventCounts",_id, {count: count});
        }
    // don't care about changed
    });

    // Instead, we'll send one `self.added()` message right after
    // observeChanges has returned, and mark the subscription as
    // ready.
    initializing = false;
    self.added("eventCounts",_id, {count: count});
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
        handle.stop();
    });
});


// ----------------------------------------------------------------------------
// This publishes the total number of bookings created by users
// ----------------------------------------------------------------------------
Meteor.publish("totalBookingsCreated", function(){
    var self = this;
    var count = 0;
    var initializing = true;
    var _id = Random.id();
    // observeChanges only returns after the initial `added` callbacks
    // have run. Until then, we don't want to send a lot of
    // `self.changed()` messages - hence tracking the
    // `initializing` state.
    var handle = PublicBookings.find({}, {fields:{_id:1}}).observeChanges({
        added: function (id) {
            count++;
            if (!initializing) {
                self.changed("bookingsCounts",_id, {count: count});
            }
        },
        removed: function (id) {
            count--;
            self.changed("bookingsCounts",_id, {count: count});
        }
    // don't care about changed
    });

    // Instead, we'll send one `self.added()` message right after
    // observeChanges has returned, and mark the subscription as
    // ready.
    initializing = false;
    self.added("bookingsCounts",_id, {count: count});
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
        handle.stop();
    });
})


// ----------------------------------------------------------------------------
// This publishes the total count of bookings booked by sunsama users
// ----------------------------------------------------------------------------
Meteor.publish("totalBookingsBooked", function(){
    var self = this;
    var count = 0;
    var initializing = true;
    var _id = Random.id();
    // observeChanges only returns after the initial `added` callbacks
    // have run. Until then, we don't want to send a lot of
    // `self.changed()` messages - hence tracking the
    // `initializing` state.
    var handle = CalendarEvents.find({

        "inviteeList.1": {$exists:true},
        "publicBookingsId": {$ne: null},
        "status":"scheduled",
        "siftOriginalEvent":true


    }, {fields:{_id:1}}).observeChanges({
        added: function (id) {
            count++;
            if (!initializing) {
                self.changed("bookingsBookedCounts",_id, {count: count});
            }
        },
        removed: function (id) {
            count--;
            self.changed("bookingsBookedCounts",_id, {count: count});
        }
    // don't care about changed
    });

    // Instead, we'll send one `self.added()` message right after
    // observeChanges has returned, and mark the subscription as
    // ready.
    initializing = false;
    self.added("bookingsBookedCounts",_id, {count: count});
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
        handle.stop();
    });
})


// ----------------------------------------------------------------------------
// This publishes the total user count
// ----------------------------------------------------------------------------
Meteor.publish("totalUsers", function(){
    var self = this;
    var count = 0;
    var initializing = true;
    var _id = Random.id();
    // observeChanges only returns after the initial `added` callbacks
    // have run. Until then, we don't want to send a lot of
    // `self.changed()` messages - hence tracking the
    // `initializing` state.
    var handle = Meteor.users.find({},
        {fields:{_id:1}}).observeChanges({
        added: function (id) {
            count++;
            if (!initializing) {
                self.changed("totalUsersCounts",_id, {count: count});
            }
        },
        removed: function (id) {
            count--;
            self.changed("totalUsersCounts",_id, {count: count});
        }
    // don't care about changed
    });

    // Instead, we'll send one `self.added()` message right after
    // observeChanges has returned, and mark the subscription as
    // ready.
    initializing = false;
    self.added("totalUsersCounts",_id, {count: count});
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
        handle.stop();
    });
})


// ----------------------------------------------------------------------------
// This publishes the user data of the last 20 users to sign up.
// ----------------------------------------------------------------------------
Meteor.publish("userData",function(){
    return Meteor.users.find({},{fields: {"nodeId":1, "stats":1, "createdAt":1, _id:1, "profile.firstname":1,"profile.lastname":1, emails:1 , "username":1}, sort: {"createdAt":-1}, limit:20})
})
