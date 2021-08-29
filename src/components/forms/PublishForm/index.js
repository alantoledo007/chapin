import Button from "src/components/shared/Button";
import If, { Else, Then } from "src/components/shared/If";
import withReactHookForm from "src/hocs/withReactHookForm";
import usePhotos from "src/hooks/usePhotos";
import schema from "./schema";

const Form = ({
  handleSubmit,
  onSubmitDefault,
  isSubmitting,
  register,
  errorHandler,
  onPhotosUploaded,
}) => {
  const {
    addPhotos,
    removePhoto,
    photos,
    getPhotoURL,
    uploadPhotos,
    retryUploadPhotos,
    checkUploadError,
    uploadStatuses,
    loading,
  } = usePhotos(onPhotosUploaded);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmitDefault({ ...data, uploadPhotos })
      )}
    >
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          id="description"
          placeholder="Descripción"
          {...register("description")}
        />
        {errorHandler("description")}
      </div>
      <div>
        <label htmlFor="photos">Fotos</label>
        <input
          type="file"
          multiple="multiple"
          name="photos[]"
          id="photos"
          placeholder="Fotos"
          accept="image/png, image/jpeg, image/gif"
          onChange={addPhotos}
        />
        {errorHandler("photos")}
      </div>
      <div>
        <PhotosPreview
          photos={photos}
          removePhoto={removePhoto}
          getPhotoURL={getPhotoURL}
          uploadStatuses={uploadStatuses}
        />
      </div>
      <If predicate={!checkUploadError()}>
        <Then>
          <Button type="submit" disabled={isSubmitting || loading}>
            {isSubmitting || loading ? "Cargando..." : "Publicar"}
          </Button>
        </Then>
        <Else>
          <Button type="button" onClick={retryUploadPhotos}>
            Reintentar
          </Button>
        </Else>
      </If>
    </form>
  );
};

const PublishForm = withReactHookForm(schema)(Form);

export default PublishForm;

const PhotosPreview = ({
  photos,
  getPhotoURL,
  removePhoto,
  uploadStatuses,
}) => {
  return (
    <div>
      {photos.map((i, index) => (
        <div key={`${i.name}_${i.type}`}>
          <img alt={`Foto ${index + 1}`} src={getPhotoURL(i)} width="100" />
          <pre>
            status: <br />
            {JSON.stringify(uploadStatuses[index])}
          </pre>
          <Button onClick={() => removePhoto(index)}>borrar</Button>
        </div>
      ))}
    </div>
  );
};
