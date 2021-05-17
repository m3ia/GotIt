const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const OAuth2Client = new OAuth2(
  "60497895153-iiq79i18jc265rme5l0ojvagac8c622e.apps.googleusercontent.com",
  "RnqxDt1IK8zdxibQA5Yk4xUO",
);

OAuth2Client.setCredentials({
  refresh_token:
    "1//04pz_KBDqIfcDCgYIARAAGAQSNwF-L9Ir_zIhwJiyPNUKYsb9-5qMrU5305UZgcv1KM82nI76H7qAKgwrWtW4qQ52ir4uimzFD0I",
});

const calendar = google.calendar({ version: "v3", auth: OAuth2Client });

const eventStartTime = new Date();

eventStartTime.setDate(eventStartTime.getDay() + 18);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 18);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "Meet with Meia",
  location: "Oakland, CA",
  description: "Meeting with Meia to talk about food",
  start: {
    dateTime: eventStartTime,
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "America/Los_Angeles",
  },

  colorId: 1,
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: "America/Los_Angeles",
      items: [{ id: "primary" }],
    },
  },
  (err, res) => {
    if (err) return console.error("Free Busy Query Error: ", err);
    const eventsArr = res.data.calendars.primary.busy;

    if (eventsArr.length === 0) {
      return calendar.events.insert(
        { calendarId: "primary", resource: event },
        (err) => {
          if (err) return console.error("Calendar Event Creation Error: ", err);

          return console.log("Calendar Event Created.");
        },
      );
    }
    return console.log("sorry i'm busy");
  },
);
