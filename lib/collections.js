HQNotifications = new Meteor.Collection("hqNotifications");
Notifications = new Meteor.Collection("notifications");
PublicBookings = new Meteor.Collection("publicBookings");
Reminders = new Meteor.Collection("reminders");
SystemSettings = new Meteor.Collection("systemSettings");
Trips = new Meteor.Collection("trips");


if(Meteor.isServer) {

    if(process.env && process.env.ALT_MONGO_URL) {
        altDatabase = new MongoInternals.RemoteCollectionDriver(process.env.ALT_MONGO_URL);
    } else {
        altDatabase = new MongoInternals.RemoteCollectionDriver(Meteor.settings.ALT_MONGO_URL);
    }

    if(altDatabase) {
        GoogleCalendarEvents = new Meteor.Collection("googleCalendarEvents", {_driver:altDatabase});
        CalendarEvents = new Meteor.Collection("calendarEvents", {_driver:altDatabase});
        UserEdges = new Meteor.Collection("userEdges", {_driver: altDatabase});
        Nodes = new Meteor.Collection("nodes", {_driver: altDatabase});
    }
}
