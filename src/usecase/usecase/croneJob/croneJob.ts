import EventModel from "../../../infrastructure/database/model/eventModel";
import Nodemailer from "../../../infrastructure/services/nodemailer";
export const sendingEmail =async () =>{
  const currentDate = new Date(); // Current date and time
const tomorrow = new Date(currentDate);
tomorrow.setDate(currentDate.getDate() + 1); // Set the date to tomorrow

const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // Tomorrow's date in 'YYYY-MM-DD' format
const currentTime = currentDate.getTime(); // Current time in milliseconds

// Calculate the time one hour before the event's starting time
const oneHourBefore = new Date(currentTime - 60 * 60 * 1000); // One hour before current time

const data = await EventModel.aggregate([
  {
    $addFields: {
      // Create a date object for event start time
      eventStart: {
        $dateFromString: {
          dateString: {
            $concat: [
              "$start_date",
              "T",
              "$starting_time",
              ":00Z" // Ensure the time is in UTC
            ]
          }
        }
      }
    }
  },
  {
    $match: {
      start_date: tomorrowDateString, // Match events starting tomorrow
    }
  },
  {
    $addFields: {
      registrations: {
        $map: {
          input: "$registrations",
          as: "registration",
          in: { $toObjectId: "$$registration" }
        }
      }
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'registrations',
      foreignField: '_id',
      as: 'userDetails'
    }
  },
  { $unwind: '$userDetails' },
  {
    $project: {
      userEmail: "$userDetails.email",
      _id: 0
    }
  }
]);

// Transform the data to an array of email strings
const event = data?.map(item => item.userEmail);

console.log(event);
if(event && event.length>0){
  const nodemailer = new Nodemailer()
  nodemailer.sendBulkEmail(event,'Reminder: Your Event is Starting Tomorrow','Dear User,\n\nThis is a reminder that your event is starting tomorrow. Please be prepared and ready.\n\nBest regards,\nEvent Team','')
}

}


