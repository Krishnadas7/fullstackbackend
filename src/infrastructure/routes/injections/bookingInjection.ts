import { BookingAdapter } from "../../../controller/bookingAdapter";
import { BookingUseCase } from "../../../usecase/usecase/bookinguseCase";
import BookingModel from "../../database/model/bookingModel";
import UserModel from "../../database/model/userModel";
import { BookingRepository } from "../../database/repository/bookingRepository";
import { UserRepository } from "../../database/repository/userRepository";
import StripeService from "../../services/stripe";
import { S3services } from "../../services/s3services";
import {s3} from '../../config/awsS3'
import EventModel from "../../database/model/eventModel";
import { EventRepository } from "../../database/repository/eventRepository";

const bookingRepository = new BookingRepository(BookingModel)
const userRepository = new UserRepository(UserModel)
const eventRepository = new EventRepository(EventModel)
const stripe = new StripeService()
const s3service = new S3services()
const bookingusecase = new BookingUseCase(
    eventRepository,
    bookingRepository,
    userRepository,
    stripe,
    s3service,
    s3
)

const bookingAdapter = new BookingAdapter(bookingusecase)

export {bookingAdapter}