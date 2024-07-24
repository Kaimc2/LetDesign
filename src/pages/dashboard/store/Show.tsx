import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, useState } from "react";
import { Store } from "../../../types/store.types";
import { CreateMaterials } from "./materials/Create";
import { ShowMaterials } from "./materials/Show";
import { CreateColors } from "./colors/Create";
import { ShowColors } from "./colors/Show";
import { CreateSizes } from "./sizes/Create";
import { ShowSizes } from "./sizes/Show";

export const StoreShow: FC<{
  store: Store;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  refetch: (search?: string, label?: string) => void;
}> = ({ store, setEdit, refetch }) => {
  const [materialEdit, setMaterialEdit] = useState(false);
  const [colorEdit, setColorEdit] = useState(false);
  const [sizeEdit, setSizeEdit] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 rounded-md"
            src="/placeholder/placeholder.jpg"
            alt="store_thumbnail"
          />
          <div className="flex flex-col">
            <span className="text-sm text-brand-gray">Name</span>
            <p className="text-lg">{store.name}</p>
          </div>
        </div>
        <button
          onClick={() => setEdit(true)}
          className="px-4 py-2 border border-gray-400 hover:bg-gray-100 rounded-md"
        >
          Edit
        </button>
      </div>

      <div className="h-1 bg-gray-300 mx-auto rounded-md" />

      <div className="mt-4 mb-6">
        <h1 className="text-xl font-semibold">Description</h1>
        <p>{store.description}</p>
      </div>

      <div className="mt-4 mb-6 flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Contact Information</h1>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
          <p>{store.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <p>{store.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
          <p>{store.email}</p>
        </div>
      </div>

      {/* Material */}
      {materialEdit ? (
        <CreateMaterials
          store={store}
          setEdit={setMaterialEdit}
          refetch={refetch}
        />
      ) : (
        <ShowMaterials
          store={store}
          setEdit={setMaterialEdit}
          refetch={refetch}
        />
      )}

      {/* Color */}
      {colorEdit ? (
        <CreateColors store={store} setEdit={setColorEdit} refetch={refetch} />
      ) : (
        <ShowColors store={store} setEdit={setColorEdit} refetch={refetch} />
      )}

      {/* Size */}
      {sizeEdit ? (
        <CreateSizes store={store} setEdit={setSizeEdit} refetch={refetch} />
      ) : (
        <ShowSizes store={store} setEdit={setSizeEdit} refetch={refetch} />
      )}
    </div>
  );
};
