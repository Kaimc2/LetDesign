import { Dispatch, FC } from "react";
import { Store } from "../../../../types/store.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SizeTable } from "../../components/SizeTable";

export const ShowSizes: FC<{
  store: Store;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  refetch: (search?: string, label?: string) => void;
}> = ({ store, setEdit, refetch }) => {
  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Choose available sizes</h1>
        <FontAwesomeIcon
          className="hover:cursor-pointer hover:text-accent"
          onClick={() => setEdit(true)}
          icon={faCirclePlus}
          title="Add"
          size="lg"
        />
      </div>

      <SizeTable storeId={store.id} sizes={store.sizes} refetch={refetch} />
    </div>
  );
};
