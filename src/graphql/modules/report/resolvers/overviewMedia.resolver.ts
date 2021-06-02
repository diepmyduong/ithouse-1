import { get, set } from "lodash";

import { ROLES } from "../../../../constants/role.const";
import { AuthHelper } from "../../../../helpers";
import { GraphQLHelper } from "../../../../helpers/graphql.helper";
import { Context } from "../../../context";
import { CollaboratorLoader } from "../../collaborator/collaborator.model";
import { collaboratorService } from "../../collaborator/collaborator.service";
import { ICollaboratorProduct } from "../../collaboratorProduct/collaboratorProduct.model";
import { collaboratorProductService } from "../../collaboratorProduct/collaboratorProduct.service";
import { MemberModel } from "../../member/member.model";
import { ProductLoader } from "../../product/product.model";
import { MediaProductStats } from "../loaders/mediaProductStats.loader";

const getOverviewAllCollaboratorProducts = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);

  //Tổng lượt share - like - comment - click - tổng số lượng sp đặt hàng thành công

  return {
    shareCount: 0,
    likeCount: 0,
    commentCount: 0,
    completedQty: 0,
  };
};

const getOverviewAllCollaborators = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);

  //CTV : Tổng lượt share - like - comment - click - tổng lượng ctv

  return {
    shareCount: 0,
    likeCount: 0,
    commentCount: 0,
    collaboratorCount: 0,
  };
};

const getTopMediaCollaboratorProducts = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);

  //CTV : Tổng lượt share - like - comment - click - tổng lượng ctv
  const mostLikeProducts: any = [];
  const mostShareProducts: any = [];
  const mostCommentProducts: any = [];
  const mostViewProducts: any = [];

  return {
    mostLikeProducts,
    mostShareProducts,
    mostCommentProducts,
    mostViewProducts,
  };
};

const getTopMediaCollaborators = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);

  //CTV : Tổng lượt share - like - comment - click - tổng lượng ctv

  const mostLikeCollaborators: any = [];
  const mostShareCollaborators: any = [];
  const mostCommentCollaborators: any = [];
  const mostViewCollaborators: any = [];

  return {
    mostLikeCollaborators,
    mostShareCollaborators,
    mostCommentCollaborators,
    mostViewCollaborators,
  };
};

//CTV - đường link - lựợt click - lượt like - lượt share - lượt comment - tổng like SP - Tổng share SP - Tổng coment SP - tổng SP - tổng lượng sp đặt hàng thành công
const getCollaboratorsMediaReports = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
  const { branchId, sellerIds } = get(args, "q.filter", {});
  const $match: any = {};
  if (context.isMember()) {
    set($match, "memberId.$in", [context.id]);
  } else if (branchId) {
    const memberIds = await MemberModel.find({ branchId, activated: true })
      .select("_id")
      .then((res) => res.map((r) => r._id));
    set($match, "memberId.$in", memberIds);
  } else if (sellerIds?.length) {
    set($match, "memberId.$in", sellerIds);
  }
  set(args, "q.filter", $match);
  console.log("query", args.q.filter);
  return await collaboratorService.fetch(args.q);
};

//sản phẩm - CTV - đường link - lựợt click - lượt like - lượt share - lượt comment - lượng đặt hàng thành công
const getProductsMediaReports = async (root: any, args: any, context: Context) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
  return collaboratorProductService.fetch(args.q);
};

const MediaProduct = {
  collaborator: GraphQLHelper.loadById(CollaboratorLoader, "collaboratorId"),
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
  mediaProductStats: async (root: ICollaboratorProduct, args: any, context: Context) => {
    return MediaProductStats.getLoader(args).load(root.id);
  },
};

const Query = {
  getCollaboratorsMediaReports,
  getProductsMediaReports,

  getOverviewAllCollaboratorProducts,
  getOverviewAllCollaborators,
  getTopMediaCollaboratorProducts,
  getTopMediaCollaborators,
};

export default {
  Query,
  MediaProduct,
};
