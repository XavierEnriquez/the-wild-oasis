import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateUpdateCabinForm({ cabinToUpdate = {} }) {
  // If cabinToUpdate id is present then this is a cabin edit else is a new cabin
  const { id: toEditId, ...toEditValues } = cabinToUpdate;
  const isEditSession = Boolean(toEditId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // if this is an edit use current cabin values as default Form input values else no values
    defaultValues: isEditSession ? toEditValues : {},
  });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useUpdateCabin();

  const isProcessing = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { editData: { ...data, image }, id: toEditId },
        {
          onSuccess: () => reset(),
        }
      );
    else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => reset(),
        }
      );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", {
            required: "A name is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isProcessing}
          {...register("maxCapacity", {
            required: "Field is required",
            min: {
              value: 1,
              message: "Maximum capacity with a minimum of 1 required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isProcessing}
          {...register("regularPrice", {
            required: "Field is required",
            min: {
              value: 1,
              message: "A minimum regular price required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isProcessing}
          {...register("discount", {
            required: "Field is required",
            validate: (value) =>
              value <= getValues().regularPrice / 2 ||
              "No discounts higher than 50% of regular price.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isProcessing}
          {...register("description", {
            required: "A description is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isProcessing}
          {...register("image", {
            required: isEditSession ? false : "An image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button variation="secondary" type="reset" disabled={isProcessing}>
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? "Update cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateUpdateCabinForm.propTypes = {
  cabinToUpdate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default CreateUpdateCabinForm;
