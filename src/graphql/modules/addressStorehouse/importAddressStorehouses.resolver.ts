import csv from "csv-parser";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper, ErrorHelper, UtilsHelper } from "../../../helpers";
import { Context } from "../../context";
import {
  getDataFromExcelStream,
  modifyExcelData,
} from "../../../helpers/workSheet";
import { AddressStorehouseImportingLogModel } from "../addressStorehouseImportingLog/addressStorehouseImportingLog.model";
import { SettingHelper } from "../setting/setting.helper";
import { SettingKey } from "../../../configs/settingData";
import { AddressStorehouseModel } from "./addressStorehouse.model";
import { addressStorehouseImportingLogService } from "../addressStorehouseImportingLog/addressStorehouseImportingLog.service";
import { AddressModel } from "../address/address.model";
import { addressStorehouseService } from "./addressStorehouse.service";

const STT = "STT";
const NAME = "Tên kho";
const PHONE = "Số điện thoại";
const EMAIL = "Email";
const ADDRESS = "Địa chỉ";
const PROVINCE = "Tỉnh/Thành";
const DISTRICT = "Quận/Huyện";
const WARD = "Phường/Xã";
const HEADER_DATA = [
  STT,
  NAME,
  PHONE,
  EMAIL,
  ADDRESS,
  PROVINCE,
  DISTRICT,
  WARD,
];

//[Backend] Cung cấp API import file excel chưa danh sách số điện thoại đăng ký dịch vụ cần duyệt
const importAddressStorehouses = async (
  root: any,
  args: any,
  context: Context
) => {
  AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
  const { file: excelFile } = args;
  const { stream } = await excelFile;
  const result: any = await getDataFromExcelStream(stream);
  const [data, errorData] = modifyExcelData(result, HEADER_DATA, false);

  const logLength = await AddressStorehouseImportingLogModel.count({});
  if (logLength > 0) await AddressStorehouseImportingLogModel.collection.drop();
  for (let i = 0; i < data.length; i++) {
    const excelRow = data[i];
    console.log("excelRow", excelRow);
  }

  //   // const no = excelRow[];
  //   const name = excelRow[NAME];
  //   const phone = excelRow[PHONE];
  //   const email = excelRow[EMAIL];
  //   const address = excelRow[ADDRESS];
  //   const province = excelRow[PROVINCE];
  //   const district = excelRow[DISTRICT];
  //   const ward = excelRow[WARD];

  //   let success = true;
  //   let error = "";

  //   if (email && !UtilsHelper.isEmail(email)) {
  //     success = false;
  //     error = ErrorHelper.requestDataInvalid(".Email không đúng định dạng")
  //       .message;
  //     await addressStorehouseImportingLogService.create({
  //       name,
  //       phone,
  //       email,
  //       address,
  //       province,
  //       district,
  //       ward,
  //       success,
  //       error,
  //     });
  //     continue;
  //   }

  //   const existedAddress = await AddressModel.findOne({
  //     province,
  //     district,
  //     ward,
  //   });
    
  //   if (!existedAddress) {
  //     success = false;
  //     error = ErrorHelper.mgQueryFailed(
  //       `. Không tìm thấy đăng ký [${PROVINCE} , ${DISTRICT}, ${WARD}] này.`
  //     ).message;
  //     await addressStorehouseImportingLogService.create({
  //       name,
  //       phone,
  //       email,
  //       address,
  //       province,
  //       district,
  //       ward,
  //       success,
  //       error,
  //     });
  //     continue;
  //   }

  //   const { provinceId, wardId, districtId } = existedAddress;

  //   await Promise.all([
  //     addressStorehouseService.create({
  //       name,
  //       phone,
  //       email,
  //       address,
  //       province,
  //       ward,
  //       district,
  //       provinceId,
  //       wardId,
  //       districtId,
  //     }),
  //     addressStorehouseImportingLogService.create({
  //       name,
  //       phone,
  //       email,
  //       address,
  //       province,
  //       district,
  //       ward,
  //       success,
  //       error,
  //     }),
  //   ]);
  // }

  // const host = await SettingHelper.load(SettingKey.APP_DOMAIN);

  // return `${host}/api/address-storehouse/export-import-results?x-token=${context.token}`;
};

const Mutation = {
  importAddressStorehouses,
};
export default { Mutation };
