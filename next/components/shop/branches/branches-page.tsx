import { useEffect, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { GoongGeocoderService } from "../../../lib/helpers/goong";
import { AddressPipe } from "../../../lib/pipes/address";
import { useAlert } from "../../../lib/providers/alert-provider";
import { useToast } from "../../../lib/providers/toast-provider";
import {
  OperatingTime,
  OPERATING_TIME_STATUS,
  ShopBranch,
} from "../../../lib/repo/shop-branch.repo";
import { SHOP_KM_OPTIONS } from "../../../lib/repo/shop-config.repo";
import { ShopPageTitle } from "../../shared/shop-layout/shop-page-title";
import { AddressGroup } from "../../shared/utilities/form/address-group";
import { Button } from "../../shared/utilities/form/button";
import { DatePicker } from "../../shared/utilities/form/date";
import { Field } from "../../shared/utilities/form/field";
import { Form } from "../../shared/utilities/form/form";
import { ImageInput } from "../../shared/utilities/form/image-input";
import { Input } from "../../shared/utilities/form/input";
import { Select } from "../../shared/utilities/form/select";
import { Switch } from "../../shared/utilities/form/switch";
import { Spinner } from "../../shared/utilities/spinner";
import { BranchItem } from "./components/branch-item";
import { BranchLocationDialog } from "./components/branch-location-dialog";
import { BranchesContext, BranchesProvider } from "./providers/branches-provider";

export function BranchesPage(props: ReactProps) {
  const [openLocation, setOpenLocation] = useState<{
    address: string;
    location: { latitude: number; longitude: number };
  }>(null);
  const [openBranch, setOpenBranch] = useState<ShopBranch>(undefined);
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>();
  const [operatingTimes, setOperatingTimes] = useState<OperatingTime[]>();
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {
    if (openBranch && openBranch.location) {
      setLocation({
        longitude: openBranch.location.coordinates[0],
        latitude: openBranch.location.coordinates[1],
      });
      setOperatingTimes(openBranch.operatingTimes);
    } else {
      setLocation(null);
    }
  }, [openBranch]);

  const convertTimeToDate = (time: string) => {
    const splits = time.split(":");
    const date = new Date();
    date.setHours(Number(splits[0]));
    date.setMinutes(Number(splits[1]));
    return date;
  };

  return (
    <BranchesProvider>
      <BranchesContext.Consumer>
        {({ branches, onCreateOrUpdateBranch, onRemoveBranch, onToggleBranch, loadBranches }) => (
          <>
            <div className="flex items-center pb-6 pt-4 border-b border-gray-300 bg-gray-100 sticky top-0 z-10 transition-all">
              <ShopPageTitle title="Chi nhánh" subtitle="Quản lý các chi nhánh" />
              <Button
                outline
                className="px-0 w-12 h-12 bg-white mr-2 ml-auto"
                icon={<HiOutlineRefresh />}
                iconClassName="text-xl"
                onClick={() => loadBranches(true)}
              />
              <Button
                primary
                className="bg-gradient h-12"
                text="Thêm chi nhánh"
                onClick={() => setOpenBranch(null)}
              />
            </div>
            {!branches ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-y-2 mt-4">
                {branches.map((branch) => (
                  <BranchItem
                    key={branch.id}
                    branch={branch}
                    onClick={() => {
                      setOpenBranch(branch);
                    }}
                    onDeleteClick={async () => {
                      if (
                        !(await alert.danger(
                          `Xoá chi nhánh ${branch.name}`,
                          "Bạn có chắc chắn muốn xoá chi nhánh này không?"
                        ))
                      )
                        return;
                      await onRemoveBranch(branch);
                    }}
                    onToggleClick={() => {
                      onToggleBranch(branch);
                    }}
                  />
                ))}
              </div>
            )}

            <Form
              grid
              dialog
              extraDialogClass="bg-transparent"
              extraHeaderClass="bg-gray-100 text-xl py-3 justify-center rounded-t-xl border-gray-300 pl-16"
              extraBodyClass="px-6 bg-gray-100 rounded-b-xl"
              width={openBranch ? "1180px" : "600px"}
              initialData={openBranch}
              title={`${openBranch ? "Chỉnh sửa" : "Thêm"} chi nhánh`}
              isOpen={openBranch !== undefined}
              onClose={() => setOpenBranch(undefined)}
              onSubmit={async (data) => {
                if (!location) {
                  toast.info("Yêu cầu chọn toạ độ chi nhánh");
                  return;
                }
                let newData = {} as Partial<ShopBranch>;
                let locationData = {
                  type: "Point",
                  coordinates: [location.longitude, location.latitude],
                };
                if (openBranch) {
                  newData = {
                    id: openBranch.id,
                    ...data,
                    location: locationData,
                    operatingTimes: operatingTimes.map((x) => ({
                      day: x.day,
                      status: x.status,
                      timeFrames: x.timeFrames,
                    })),
                  };
                  console.log(newData);
                } else {
                  const {
                    name,
                    address,
                    provinceId,
                    wardId,
                    districtId,
                    email,
                    phone,
                    coverImage,
                  } = data;
                  newData = {
                    name,
                    address,
                    provinceId,
                    wardId,
                    districtId,
                    email,
                    phone,
                    coverImage,
                    isOpen: true,
                    location: locationData,
                  };
                }
                await onCreateOrUpdateBranch(newData);
                setOpenBranch(undefined);
              }}
            >
              <Form.Consumer>
                {({ data, fullData }) => (
                  <>
                    <div
                      className={`${
                        openBranch ? "col-span-6" : "col-span-12"
                      } grid grid-cols-12 gap-x-5 auto-rows-min`}
                    >
                      <div className="text-gray-400 font-semibold text-lg col-span-12 mb-4">
                        Thông tin chi nhánh
                      </div>
                      <Field name="name" label="Tên chi nhánh" cols={12} required>
                        <Input />
                      </Field>
                      <Field name="phone" label="Số điện thoại" cols={12} required>
                        <Input />
                      </Field>
                      <AddressGroup
                        {...openBranch}
                        provinceCols={12}
                        districtCols={12}
                        wardCols={12}
                        addressCols={12}
                        required
                      />
                      <Field
                        label="Toạ độ"
                        cols={12}
                        onClick={() => {
                          setOpenLocation({
                            address: AddressPipe({
                              address: data.address,
                              province: fullData.provinceId?.label,
                              district: fullData.districtId?.label,
                              ward: fullData.wardId?.label,
                            }),
                            location,
                          });
                        }}
                      >
                        <Input
                          inputClassName="bg-white"
                          value={
                            [location?.latitude, location?.longitude].filter(Boolean).join(", ") ||
                            "Chưa có toạ độ"
                          }
                          readonly
                        />
                      </Field>
                      <Field name="email" label="Email" cols={12}>
                        <Input type="email" />
                      </Field>
                      <Field
                        name="coverImage"
                        label="Ảnh bìa chi nhánh"
                        description="Tỉ lệ 16:9. Dùng ảnh cửa hàng nếu không có"
                        cols={12}
                      >
                        <ImageInput ratio169 cover largeImage />
                      </Field>
                    </div>
                    {openBranch && (
                      <div className="col-span-6">
                        <div className="text-gray-400 font-semibold mb-4 pl-1 text-lg">
                          Cấu hình phí giao hàng
                        </div>
                        <Field label="Thời gian nhà hàng chuẩn bị" name="shipPreparationTime">
                          <Input className="h-12" />
                        </Field>
                        <div className="flex">
                          <Field
                            label="Phí giao hàng dưới 1km"
                            name="shipOneKmFee"
                            className="flex-1"
                          >
                            <Input
                              className="h-12"
                              number
                              suffix="VND"
                              readonly={!data.shipUseOneKmFee}
                            />
                          </Field>

                          <Field label=" " name="shipUseOneKmFee" className="pl-5 flex-1">
                            <Switch
                              placeholder="Tính phí ship dưới 1km"
                              className="h-12 font-semibold"
                            />
                          </Field>
                        </div>
                        <div className="flex">
                          <Field
                            className="flex-1"
                            label="Phí giao hàng theo"
                            name="shipDefaultDistance"
                          >
                            <Select options={SHOP_KM_OPTIONS} className="h-12 inline-grid" />
                          </Field>
                          <span className="pt-10 px-2">-</span>
                          <Field className="flex-1" label="Đồng giá" name="shipDefaultFee">
                            <Input className="h-12" number suffix="VND" />
                          </Field>
                        </div>
                        <Field label="Phí giao hàng cho mỗi km tiếp theo" name="shipNextFee">
                          <Input className="h-12" number suffix="VND" />
                        </Field>
                        <Field label="Ghi chú giao hàng" name="shipNote">
                          <Input className="h-12" />
                        </Field>
                        <div className="text-gray-400 font-semibold mb-4 pl-1 text-lg">
                          Thời gian hoạt động
                        </div>
                        {operatingTimes.map((operatingTime, index) => (
                          <div key={index} className="mb-3 flex">
                            <div className="px-2 w-20 pt-2 font-semibold text-gray-600">
                              {DATE_NAME[operatingTime.day]}
                            </div>
                            <div className="flex-1">
                              <Select
                                className="w-36"
                                options={OPERATING_TIME_STATUS}
                                value={operatingTime.status}
                                onChange={(val) => {
                                  operatingTimes[index].status = val;
                                  setOperatingTimes([...operatingTimes]);
                                }}
                              />
                              {operatingTime.status == "TIME_FRAME" && (
                                <>
                                  {operatingTime.timeFrames.map((timeFrame, timeIndex) => (
                                    <div className="flex items-center mt-2 gap-x-2">
                                      <div className="w-36">
                                        <DatePicker
                                          timeOnly
                                          timeIntervals={30}
                                          clearable={false}
                                          value={convertTimeToDate(timeFrame[0])}
                                          onChange={(date) => {
                                            const time =
                                              (date as Date)
                                                .getHours()
                                                .toString()
                                                .padStart(2, "0") +
                                              ":" +
                                              (date as Date)
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0");
                                            operatingTime.timeFrames[timeIndex] = [
                                              time,
                                              timeFrame[1],
                                            ];
                                            setOperatingTimes([...operatingTimes]);
                                          }}
                                        />
                                      </div>
                                      <span>-</span>
                                      <div className="w-36">
                                        <DatePicker
                                          timeOnly
                                          timeIntervals={30}
                                          clearable={false}
                                          value={convertTimeToDate(timeFrame[1])}
                                          onChange={(date) => {
                                            const time =
                                              (date as Date)
                                                .getHours()
                                                .toString()
                                                .padStart(2, "0") +
                                              ":" +
                                              (date as Date)
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0");
                                            operatingTime.timeFrames[timeIndex] = [
                                              timeFrame[0],
                                              time,
                                            ];
                                            setOperatingTimes([...operatingTimes]);
                                          }}
                                        />
                                      </div>
                                      <Button
                                        className={`px-2 ${
                                          timeIndex == 0 ? "opacity-0 pointer-events-none" : ""
                                        }`}
                                        hoverDanger
                                        icon={<RiCloseFill />}
                                        onClick={() => {
                                          if (timeIndex == 0) return;
                                          operatingTime.timeFrames.splice(timeIndex, 1);
                                          setOperatingTimes([...operatingTimes]);
                                        }}
                                      />
                                    </div>
                                  ))}
                                  <Button
                                    className="my-2 px-0"
                                    textPrimary
                                    icon={<RiAddFill />}
                                    text="Thêm khung giờ"
                                    onClick={() => {
                                      operatingTime.timeFrames.push(["07:00", "21:00"]);
                                      setOperatingTimes([...operatingTimes]);
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Form.Consumer>
              <Form.Footer>
                <Form.ButtonGroup
                  className="justify-center"
                  cancelText=""
                  submitProps={{ className: "bg-gradient h-14 w-64" }}
                />
              </Form.Footer>
            </Form>
          </>
        )}
      </BranchesContext.Consumer>
      <BranchLocationDialog
        isOpen={!!openLocation}
        onClose={() => setOpenLocation(null)}
        address={openLocation?.address}
        location={openLocation?.location}
        onSelectLocation={setLocation}
      />
    </BranchesProvider>
  );
}

const DATE_NAME = {
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
  7: "C.Nhật",
};
