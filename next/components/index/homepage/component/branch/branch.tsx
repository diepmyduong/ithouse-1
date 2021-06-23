import React from "react";
import { Button } from "../../../../shared/utilities/form/button";
import StatusTime from "../../../../shared/infomation/status-time";
interface Propstype extends ReactProps {
  branch: { place: string; address: string; isActive: boolean; openAt: string; closeAt: string };
}
const Branch = (props: Propstype) => {
  return (
    <div className="flex p-3">
      <div className="flex-1 leading-7">
        <h3 className="text-primary text-base">{props.branch.place}</h3>
        <p className="text-ellipsis-2">{props.branch.address}</p>
        <StatusTime
          isActive={props.branch.isActive}
          openAt={props.branch.openAt}
          closeAt={props.branch.closeAt}
        />
      </div>
      <Button outline primary text="Chọn" className="rounded-full" />
    </div>
  );
};

export default Branch;