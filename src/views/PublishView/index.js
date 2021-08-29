import PublishForm from "src/components/forms/PublishForm";
import { publish, updatePost } from "src/firebase/posts";
import AppLayout from "src/layouts/AppLayout";

export default function PublishView() {
  const onSubmit = ({ description, uploadPhotos }) => {
    publish({ description }).then((doc) => uploadPhotos(doc.id));
  };

  const onPhotosUploaded = (postId, urls) => {
    updatePost(postId, {
      isPublished: true,
      photos: urls,
    });
  };

  return (
    <AppLayout>
      <PublishForm onSubmit={onSubmit} onPhotosUploaded={onPhotosUploaded} />
    </AppLayout>
  );
}
