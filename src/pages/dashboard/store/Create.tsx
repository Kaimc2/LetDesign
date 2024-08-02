import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FC,
  Dispatch,
  useState,
  ChangeEvent,
  useContext,
  useRef,
  MouseEvent,
} from "react";
import { StoreInput } from "../../../types/store.types";
import api from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { displayNotification } from "../../../utils/helper";

export const StoreCreate: FC<{
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}> = ({ setEdit, refetch }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState<StoreInput>({
    name: "",
    description: "",
    email: "",
    phoneNumber: "",
    ownerId: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    tailorThumbnail: "",
    address: "",
    email: "",
    phoneNumber: "",
    ownerId: "",
  });
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFormChange = (
    field: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    const thumbnailPreview = URL.createObjectURL(file);

    setPreview(thumbnailPreview);
    setFormData({ ...formData, tailorThumbnail: file });
  };

  const handleFileInputClick = (
    e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!thumbnailRef || !thumbnailRef.current) return;
    thumbnailRef.current.click();
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      tailorThumbnail: "",
      address: "",
      email: "",
      phoneNumber: "",
      ownerId: "",
    };
    if (formData.name === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (formData.description === "") {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (formData.address === "") {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (formData.email === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (formData.phoneNumber === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    const formContent = {
      name: formData.name,
      description: formData.description,
      tailor_thumbnail: formData.tailorThumbnail,
      address: formData.address,
      phone_number: formData.phoneNumber,
      email: formData.email,
      owner_id: parseInt(String(user?.id)),
    };

    if (validate()) {
      api
        .post("/stores", formContent, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          displayNotification("Store created successfully", "success");
          refetch();
          setEdit(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to create store", "error");
        });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img
            onClick={handleFileInputClick}
            className="w-20 h-20 rounded-md hover:cursor-pointer"
            src={preview ?? "/placeholder/placeholder.jpg"}
            alt="store_thumbnail"
            title="Change thumbnail"
          />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            name="thumbnail"
            id="thumbnail"
            onChange={handleThumbnailChange}
            ref={thumbnailRef}
          />
          <label className="flex flex-col" htmlFor="name">
            <span>Name</span>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border border-gray-300 rounded-md shadow"
              value={formData?.name}
              onChange={(e) => handleFormChange("name", e)}
              placeholder="Store Name"
            />
            {errors.name && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.name}
              </span>
            )}
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreate}
            className="px-4 py-2 border border-gray-400 text-white bg-accent hover:bg-accent-80 rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={() => setEdit(false)}
            className="px-4 py-2 border border-gray-400 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gray-300 mx-auto rounded-md" />

      <div className="flex flex-col mt-4 mb-6">
        <h1 className="text-xl font-semibold">Description</h1>
        <textarea
          name="description"
          id="description"
          className="w-1/2 mt-2 px-4 py-2 border border-gray-300 rounded-md shadow"
          value={formData?.description}
          onChange={(e) => handleFormChange("description", e)}
          placeholder="Description"
        ></textarea>
        {errors.description && (
          <span className="text-error text-sm ml-2 mt-1">
            {errors.description}
          </span>
        )}
      </div>

      <div className="mt-4 mb-6 flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Contact Information</h1>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
          <div className="flex flex-col w-1/3 ">
            <textarea
              name="address"
              id="address"
              className="mt-2 ml-1 px-4 py-2 border border-gray-300 rounded-md shadow"
              value={formData?.address}
              onChange={(e) => handleFormChange("address", e)}
              placeholder="Address"
            ></textarea>
            {errors.address && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.address}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <div className="flex flex-col">
            <input
              type="text"
              id="phoneNumber"
              className="px-4 py-2 border border-gray-300 rounded-md shadow"
              value={formData?.phoneNumber}
              onChange={(e) => handleFormChange("phoneNumber", e)}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.phoneNumber}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />{" "}
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              className="px-4 py-2 border border-gray-300 rounded-md shadow"
              value={formData?.email}
              onChange={(e) => handleFormChange("email", e)}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
