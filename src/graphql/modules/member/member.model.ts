import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { ChatbotStory, ChatbotStorySchema } from "./types/chatbotStory.type";

const Schema = mongoose.Schema;
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}
export enum MemberType {
  BRANCH = "BRANCH",
  SALE = "SALE",
  AGENCY = "AGENCY",
}
export type IMember = BaseDocument & {
  username?: string; // Mã chủ shop
  code?: string; // Mã chủ shop
  uid?: string; // UID Firebase
  name?: string; // Họ tên
  avatar?: string; // Avatar
  phone?: string; // Điện thoại
  fanpageId?: string; // Mã Fanpage
  fanpageName?: string; // Tên Fanpage
  fanpageImage?: string; // Hình Fanpage
  chatbotKey?: string; // Chatbot API Key
  shopName?: string; // Tên cửa hàng
  shopLogo?: string; // Logo cửa hàng
  cumulativePoint?: number; // Điểm tích lũy
  diligencePoint?: number; // Điểm chuyen can
  commission?: number; // Hoa hồng
  address?: string; // Địa chỉ
  provinceId?: string; // Mã Tỉnh/thành
  districtId?: string; // Mã Quận/huyện
  wardId?: string; // Mã Phường/xã
  province?: string; // Tỉnh/thành
  district?: string; // Quận/huyện
  ward?: string; // Phường/xã
  identityCardNumber?: string; // CMND
  gender?: Gender; // Giới tính
  birthday?: Date; // Sinh nhật
  parentIds?: [string]; // Mã người giới thiệu ////
  activedAt?: Date; // Ngày đăng ký
  activated?: boolean; // Chủ shop đã kích hoạt
  type?: MemberType; // Loại chủ shop
  branchId?: string; // Mã chi nhánh
  positionId?: string; // Mã chức vụ
  psids?: string[]; // Mã PSID ở trang fanpage chính
  chatbotStory?: ChatbotStory; // Kịch bản chatbot
};

const memberSchema = new Schema(
  {
    code: { type: String, required: true },
    username: { type: String, required: true },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String, required: true },
    fanpageId: { type: String },
    fanpageName: { type: String },
    fanpageImage: { type: String },
    chatbotKey: { type: String },
    shopName: { type: String },
    shopLogo: { type: String },
    cumulativePoint: { type: Number, default: 0 },
    diligencePoint: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    address: { type: String },
    provinceId: { type: String },
    districtId: { type: String },
    wardId: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    identityCardNumber: { type: String },
    gender: { type: String, enum: Object.values(Gender), default: Gender.OTHER },
    birthday: { type: Date },
    parentIds: { type: [String] },
    activedAt: { type: Date },
    activated: { type: Boolean, default: false },
    type: { type: String, enum: Object.values(MemberType) },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    positionId: { type: Schema.Types.ObjectId, ref: "Position" },
    psids: { type: [String], default: [] },
    chatbotStory: { type: ChatbotStorySchema },
  },
  { timestamps: true }
);

memberSchema.index(
  {
    name: "text",
    phone: "text",
    fanpageName: "text",
    fanpageId: "text",
    shopName: "text",
    username: "text",
  },
  { weights: { name: 2, phone: 2, fanpageName: 2, fanpageId: 2, shopName: 2, username: 4 } }
);
memberSchema.index({ username: 1 }, { unique: true });
memberSchema.index({ uid: 1 }, { unique: true });

export const MemberHook = new ModelHook<IMember>(memberSchema);
export const MemberModel: mongoose.Model<IMember> = MainConnection.model("Member", memberSchema);

export const MemberLoader = ModelLoader<IMember>(MemberModel, MemberHook);
