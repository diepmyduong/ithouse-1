import express from "express";
import evoucherRoute from "./evoucher.route";
import smsRoute from "./sms.route";
import downloadRoute from "./download.route";
import campaignRoute from "./campaign.route";
import luckyWheelRoute from "./luckyWheel.route";
import diligencePointRoute from "./diligencePoint.route";
import serviceRoute from "./service.route";

const router = express.Router();
router.use("/evoucher", evoucherRoute);
router.use("/diligencePoint", diligencePointRoute);
router.use("/sms", smsRoute);
router.use("/service", serviceRoute);
router.use("/download", downloadRoute);
router.use("/campaign", campaignRoute);
router.use("/luckywheel", luckyWheelRoute);
export default router;