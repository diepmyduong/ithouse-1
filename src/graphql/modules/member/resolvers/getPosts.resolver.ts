import { get, set } from "lodash";
import { ObjectId } from "mongodb";

import { ROLES } from "../../../../constants/role.const";
import { AuthHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { AddressStorehouseModel } from "../../addressStorehouse/addressStorehouse.model";
import { ShipMethod } from "../../order/order.model";
import { MemberType } from "../member.model";
import { memberService } from "../member.service";

const Query = {
  getAllPosts: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.MEMBER]);
    const shipMethod = get(args, "q.fitler.shipMethod");

    if (shipMethod === ShipMethod.VNPOST) {
      const addressStorehouses = await AddressStorehouseModel.find({
        allowPickup: true,
        activated: true,
      }).select("code");
      const addressStorehouseCodes = addressStorehouses.map((addr) => addr.code);
      set(args, "q.filter.code", { $in: addressStorehouseCodes });
    } else {
      set(args, "q.filter.id", { $ne: new ObjectId(context.id) });
    }

    set(args, "q.filter.type", MemberType.BRANCH);
    resolveArgs(args);
    return memberService.fetch(args.q);
  },
};

const resolveArgs = (args: any) => {
  delete args.q.filter.shipMethod;
};

export default {
  Query,
};
