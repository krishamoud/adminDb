HQNotifications = new Meteor.Collection("hqNotifications");
Notifications = new Meteor.Collection("notifications");
PublicBookings = new Meteor.Collection("publicBookings");
Reminders = new Meteor.Collection("reminders");
SystemSettings = new Meteor.Collection("systemSettings");
Trips = new Meteor.Collection("trips");


if(Meteor.isServer) {

    if(process.env.ENV && process.env.ALT_MONGO_URL) {
        altDatabase = new MongoInternals.RemoteCollectionDriver(process.env.ALT_MONGO_URL);
    } else {
        altDatabase = new MongoInternals.RemoteCollectionDriver("mongodb://localhost:27017/sunsama_alt");
    }

    if(altDatabase) {
        GoogleCalendarEvents = new Meteor.Collection("googleCalendarEvents", {_driver:altDatabase});
        CalendarEvents = new Meteor.Collection("calendarEvents", {_driver:altDatabase});
        UserEdges = new Meteor.Collection("userEdges", {_driver: altDatabase});
        Nodes = new Meteor.Collection("nodes", {_driver: altDatabase});
    }
}
