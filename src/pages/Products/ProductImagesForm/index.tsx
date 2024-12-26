import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "store/reducer";
import { loadProductImagesRequested } from "features";

interface productImageValues {
  selectedImageUrls: string[];
  setModal?: (value: boolean) => void;
  resetForm?: () => void;
  onImageSelect: (urls: string[]) => void;
}

const Index = ({ selectedImageUrls, setModal, resetForm, onImageSelect }: productImageValues) => {
  const { productImages } = useSelector((state: RootState) => state.product);
  const [selectedImages, setSelectedImages] = useState<string[]>(selectedImageUrls);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const dispatch = useDispatch();

  const setImageSelection = (url: string) => {
    const isSelected = selectedImages.includes(url);
    let newSelectedImages;

    if (isSelected) {
      newSelectedImages = selectedImages.filter(imageUrl => imageUrl !== url);
    } else {
      newSelectedImages = [...selectedImages, url];
    }

    setSelectedImages(newSelectedImages);
  };

  const cancelForm = () => {
    if (setModal) {
      setModal(false);
    }
    if (resetForm) {
      setSelectedImages([]);
      onImageSelect([]);
    }
  };

  const handleSubmit = () => {
    onImageSelect(selectedImages);

    if (setModal) {
      setModal(false);
    }
  };

  const handleSearch = () => {
    dispatch(loadProductImagesRequested({ name: searchQuery.toLowerCase() }));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
            <Button
              onClick={handleSearch}
              name="Search"
              className="text-sm text-white bg-primary p-2 rounded-md cursor-pointer"
            />
          </div>

          <div className="rounded-md text-xs">
            <div className="grid grid-cols-3 gap-2 overflow-y-auto" style={{ maxHeight: "470px" }}>
              {productImages.map((url, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer p-2 border-2 ${selectedImages.includes(url)
                    ? "border-blue-500 bg-blue-200"
                    : "border-gray-300 bg-white"
                    }`}
                  onClick={() => setImageSelection(url)}
                >
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className="h-32 w-32 object-cover"
                  />
                </div>
              ))}
            </div>
            {(!productImages || productImages.length === 0) && (
              <div className="text-center justify-items-center">
                <div className="text-center text-red-500 font-[1000]">Please enter the product name.</div>
              </div>
            )}
          </div>

          <div className="py-4 flex justify-end gap-4">
            <Button
              onClick={cancelForm}
              name="Cancel"
              className="text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer"
            />
            <Button
              onClick={handleSubmit}
              name="Select"
              className="text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
