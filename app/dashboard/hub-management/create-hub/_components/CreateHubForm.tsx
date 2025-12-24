"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type HubFormInput = {
  branchName: string;
  area: string;
  address: string;
  managerName: string;
  managerPhone: string;
};

const CreateHubForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HubFormInput>();

  const onSubmit: SubmitHandler<HubFormInput> = (data) => {
    console.log("Form Data:", data);
  };

  const inputStyles =
    "w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#FF6B00] focus:outline-none transition-colors";
  const labelStyles =
    "block text-sm font-medium text-gray-400 mb-2";

  return (
    <div className="max-w-5xl p-8">
      <h2 className="text-2xl font-bold text-black mb-8">
        Create HUB
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Branch Name and Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>
              HUB Branch Name
            </label>
            <input
              {...register("branchName", {
                required: "Branch name is required",
              })}
              placeholder="Enter Branch Name"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>
              HUB Area
            </label>
            <input
              {...register("area", {
                required: "Area is required",
              })}
              placeholder="Enter Area"
              className={inputStyles}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelStyles}>
            HUB Address
          </label>
          <textarea
            {...register("address", {
              required: "Address is required",
            })}
            rows={5}
            className={`${inputStyles} resize-none`}
            placeholder="Enter full address"
          />
        </div>

        {/* Manager Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>
              HUB Manager Name
            </label>
            <input
              {...register("managerName", {
                required: "Manager name is required",
              })}
              placeholder="Enter Manager's Name"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>
              HUB Manager Phone
            </label>
            <input
              {...register("managerPhone", {
                required: "Phone is required",
                pattern: {
                  value: /^\+?[0-9]{10,14}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="E.g +880123456789"
              className={inputStyles}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-48 rounded-md bg-[#FF6B00] py-3 text-lg font-bold text-white hover:bg-[#e66000] transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHubForm;
