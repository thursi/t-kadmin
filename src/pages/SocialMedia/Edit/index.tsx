import { useUpdateSocialMedia } from "hooks/SocialMedia";
import Form from "../Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { loadOneSocialMediaRequested } from "features";
import { Loading } from "components";

const Index = () => {
  const { onUpdateSocialMedia } = useUpdateSocialMedia();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const { media } = useSelector((state: RootState) => state.socialMedia);

  console.log(media);

  useEffect(() => {
    dispatch(loadOneSocialMediaRequested({ id }));
  }, [dispatch]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Social Media Link </div>
      <div className="w-full">
        {media &&<Form onSubmit={onUpdateSocialMedia} item={media} />}
      </div>
    </div>
  );
};

export default Index;
