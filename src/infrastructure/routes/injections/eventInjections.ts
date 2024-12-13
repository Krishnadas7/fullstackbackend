import { EventAdapter } from "../../../controller/eventAdapter";
import EventModel from "../../database/model/eventModel";
import { EventUseCaase } from "../../../usecase/usecase/eventuseCase";
import { S3services } from "../../services/s3services";
import { EventRepository } from "../../database/repository/eventRepository";
import Nodemailer from "../../services/nodemailer";
import Cloudinary from '../../services/cloudinary'
import {s3} from '../../config/awsS3'
import  Redis from "../../services/redis";

const eventRepository = new EventRepository(EventModel)

const redis = new Redis()
const s3service = new S3services()
const nodemailer = new Nodemailer()
const cloudinary = new Cloudinary()
const eventusecase = new EventUseCaase(
    eventRepository,
    redis,
    s3service,
    s3,
    nodemailer,
    cloudinary
)
const eventAdapter = new EventAdapter(eventusecase)
export {eventAdapter}