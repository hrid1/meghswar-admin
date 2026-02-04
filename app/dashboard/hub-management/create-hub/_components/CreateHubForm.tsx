"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateHubMutation } from "@/redux/features/hubs/hubsApi";
import { AppButton } from "@/components/reusable/CustomButton";
import { toast } from "sonner";

type HubFormInput = {
  hubCode: string;
  branchName: string;
  area: string;
  address: string;
  managerName: string;
  managerPhone: string;
  managerPassword: string;
};

interface CreateHubFormProps {
  onSuccess?: () => void;
}

const CreateHubForm = ({ onSuccess }: CreateHubFormProps) => {
  const [createHub, { isLoading }] = useCreateHubMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<HubFormInput>();

  const onSubmit: SubmitHandler<HubFormInput> = async (data) => {
    try {
      // Map form data to API format (camelCase to snake_case)
      const hubData = {
        hub_code: data.hubCode,
        branch_name: data.branchName,
        area: data.area,
        address: data.address,
        manager_name: data.managerName,
        manager_phone: data.managerPhone,
        manager_password: data.managerPassword,
      };

      const response = await createHub(hubData).unwrap();
      const successMessage = response?.message || "Hub created successfully";
      toast.success(successMessage);
      reset();
      onSuccess?.();
    } catch (error: any) {
      console.error("Failed to create hub:", error);
      
      // Handle API validation errors
      const errorMessage = error?.data?.message;
      
      if (Array.isArray(errorMessage)) {
        // Handle array of error messages (validation errors)
        errorMessage.forEach((errMsg: string) => {
          const lowerErrMsg = errMsg.toLowerCase();
          
          // Map error messages to form fields based on keywords
          if (lowerErrMsg.includes("hub code") || lowerErrMsg.includes("hub_code")) {
            setError("hubCode", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("branch") && lowerErrMsg.includes("name")) {
            setError("branchName", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("area")) {
            setError("area", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("address")) {
            setError("address", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("manager") && lowerErrMsg.includes("phone")) {
            setError("managerPhone", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("manager") && lowerErrMsg.includes("name")) {
            setError("managerName", {
              type: "manual",
              message: errMsg,
            });
          } else if (lowerErrMsg.includes("manager") && lowerErrMsg.includes("password")) {
            setError("managerPassword", {
              type: "manual",
              message: errMsg,
            });
          } else {
            // If can't map to specific field, show as toast
            toast.error(errMsg);
          }
        });
      } else if (typeof errorMessage === "string") {
        // Single error message
        toast.error(errorMessage);
      } else {
        // Fallback error
        toast.error("Failed to create hub. Please try again.");
      }
    }
  };

  const inputStyles =
    "w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#FF6B00] focus:outline-none transition-colors";
  const labelStyles =
    "block text-sm font-medium text-gray-400 mb-2";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Hub Code and Branch Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyles}>
            HUB Code
          </label>
          <input
            {...register("hubCode", {
              required: "Hub code is required",
            })}
            placeholder="E.g DHK-GULSHAN-12"
            className={inputStyles}
          />
          {errors.hubCode && (
            <p className="text-xs text-red-500 mt-1 ">{errors.hubCode.message}</p>
          )}
        </div>

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
          {errors.branchName && (
            <p className="text-xs text-red-500 mt-1">{errors.branchName.message}</p>
          )}
        </div>
      </div>

      {/* Area */}
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
        {errors.area && (
          <p className="text-xs text-red-500 mt-1 ">{errors.area.message}</p>
        )}
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
        {errors.address && (
          <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
        )}
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
          {errors.managerName && (
            <p className="text-xs text-red-500 mt-1">{errors.managerName.message}</p>
          )}
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
          {errors.managerPhone && (
            <p className="text-xs text-red-500 mt-1">{errors.managerPhone.message}</p>
          )}
        </div>
      </div>

      {/* Manager Password */}
      <div>
        <label className={labelStyles}>
          Manager Password
        </label>
        <input
          type="password"
          {...register("managerPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          placeholder="Enter password"
          className={inputStyles}
        />
        {errors.managerPassword && (
          <p className="text-xs text-red-500 mt-1">{errors.managerPassword.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <AppButton
          type="submit"
          variantType="primary"
          className="w-48 rounded-md bg-[#FF6B00] hover:bg-[#e66000] py-3 text-lg font-bold"
          loading={isLoading}
          disabled={isLoading}
        >
          Save
        </AppButton>
      </div>
    </form>
  );
};

export default CreateHubForm;