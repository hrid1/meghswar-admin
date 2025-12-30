"use client";

import React, { useState } from 'react';
import { Upload, X, ChevronDown, User, ArrowUp } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

interface StaffFormData {
    // Personal Information
    name: string;
    position: string;
    assignedHub: string;
    mobile: string;
    nidNumber: string;
    email: string;

    // Address Information
    presentAddress: string;
    permanentAddress: string;

    // Financials
    fixedSalary: string;
    commission: string;

    // Bank Information
    bankAccountNumber: string;
    bankName: string;
    bankBranchName: string;

    // File uploads (handled separately)
    profilePhoto?: File;
    nidFront?: File;
    nidBack?: File;
    parentNidFront?: File;
    parentNidBack?: File;
}

const CreateStaffForm = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<StaffFormData>({
        defaultValues: {
            name: 'Ahmed Wasi',
            position: '',
            assignedHub: '',
            mobile: '+8801234567890',
            nidNumber: '88741258893',
            email: 'wasi@gmail.com',
            presentAddress: '72/3, Bashundhara Avenue, Dhaka',
            permanentAddress: '72/3, Bashundhara Avenue, Dhaka',
            fixedSalary: '৳ 1,187',
            commission: '৳ 1,187',
            bankAccountNumber: '88741258893',
            bankName: 'Dutch Bangla Bank Limited',
            bankBranchName: '',
        },
    });

    const onSubmit = async (data: StaffFormData) => {
        console.log('Form Data:', data);
        console.log('Uploaded Files:', uploadedFiles);
        alert('Staff user created successfully!');
    };

    const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setUploadedFiles(prev => ({ ...prev, profilePhoto: file }));
        }
    };

    const handleRemoveProfileImage = () => {
        if (profileImage) URL.revokeObjectURL(profileImage);
        setProfileImage(null);
        setUploadedFiles(prev => ({ ...prev, profilePhoto: null }));
    };

    const handleFileUpload = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleRemoveFile = (fieldName: string) => {
        setUploadedFiles(prev => ({ ...prev, [fieldName]: null }));
    };

    const getFileName = (fieldName: string) => {
        return uploadedFiles[fieldName]?.name || '';
    };

    return (
        <div className="bg-white font-sans text-gray-900">

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Profile Photo Upload Section */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-row items-center gap-6">
                        <div className="relative w-32 h-32">
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-dashed border-gray-400">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mb-1">
                                            <ArrowUp size={16} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="cursor-pointer">
                                <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                                <div className="px-6 py-2 bg-[#FE5000] text-white rounded-md font-medium hover:bg-[#FE5000]/90 transition-colors text-center text-sm shadow-sm">
                                    Upload Photo
                                </div>
                            </label>

                            <button type="button" onClick={handleRemoveProfileImage} className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm">
                                Remove
                            </button>
                        </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                        {/* Row 1 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1.5">Staff&apos;s Name</label>
                            <input type="text" {...register('name', { required: true })} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Assigned HUB</label>
                            <Controller name="assignedHub" control={control} render={({ field }) => (
                                <div className="relative">
                                    <select {...field} className="w-full p-2.5 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#FE5000] bg-white text-sm text-gray-500">
                                        <option value="">Choose HUB</option>
                                        <option value="dhanmondi">Dhanmondi</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            )} />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Position</label>
                            <Controller name="position" control={control} render={({ field }) => (
                                <div className="relative">
                                    <select {...field} className="w-full p-2.5 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#FE5000] bg-white text-sm text-gray-500">
                                        <option value="">Choose Position</option>
                                        <option value="manager">Manager</option>
                                        <option value="accountant">Accountant</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            )} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Mobile No.</label>
                            <input type="tel" {...register('mobile')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s NID Number</label>
                            <input type="text" {...register('nidNumber')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Email</label>
                            <input type="email" {...register('email')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>

                        {/* Row 4 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Present Address</label>
                            <input type="text" {...register('presentAddress')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Permanent Address</label>
                            <input type="text" {...register('permanentAddress')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>

                        {/* Row 5 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Fixed Salary</label>
                            <input type="text" {...register('fixedSalary')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-bold text-green-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Commission</label>
                            <input type="text" {...register('commission')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-bold text-green-600" />
                        </div>

                        {/* Row 6 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Staff&apos;s Bank Account Number</label>
                            <input type="text" {...register('bankAccountNumber')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" />
                        </div>
                        <div className="hidden md:block">
                            {/* Empty cell to push next items to new row if needed, or just leave blank */}
                        </div>

                        {/* Row 7 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Bank Name</label>
                            <Controller name="bankName" control={control} render={({ field }) => (
                                <div className="relative">
                                    <select {...field} className="w-full p-2.5 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#FE5000] bg-white text-sm font-semibold">
                                        <option value="">Select Bank</option>
                                        <option value="Dutch Bangla Bank Limited">Dutch Bangla Bank Limited</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            )} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Bank Branch Name</label>
                            <input type="text" {...register('bankBranchName')} className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FE5000] text-sm font-semibold" placeholder="Enter Branch Name" />
                        </div>
                    </div>

                    {/* Document Uploads */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-4 mt-4">Staff&apos;s NID Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <FileUploadComponent label="Front Side of NID" fileName={getFileName('nidFront')} onFileChange={(e) => handleFileUpload('nidFront', e)} onRemove={() => handleRemoveFile('nidFront')} />
                            <FileUploadComponent label="Back Side of NID" fileName={getFileName('nidBack')} onFileChange={(e) => handleFileUpload('nidBack', e)} onRemove={() => handleRemoveFile('nidBack')} />
                        </div>

                        <h3 className="text-sm font-medium text-gray-400 mb-4 mt-8">Staff&apos;s Parent NID Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadComponent label="Front Side of NID" fileName={getFileName('parentNidFront')} onFileChange={(e) => handleFileUpload('parentNidFront', e)} onRemove={() => handleRemoveFile('parentNidFront')} />
                            <FileUploadComponent label="Back Side of NID" fileName={getFileName('parentNidBack')} onFileChange={(e) => handleFileUpload('parentNidBack', e)} onRemove={() => handleRemoveFile('parentNidBack')} />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-200 mt-8">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-[#FE5000] text-white rounded-lg font-bold hover:bg-[#FE5000]/90 transition-colors shadow-sm text-sm"
                    >
                        Create Staff
                    </button>
                    <button
                        type="button"
                        className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

interface FileUploadComponentProps {
    label: string;
    fileName: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
    label,
    fileName,
    onFileChange,
    onRemove,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600 mb-1">{label}</label>

            {fileName ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-32 flex items-center justify-center relative">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-800 truncate px-4">{fileName}</p>
                        <button onClick={onRemove} className="text-xs text-red-500 mt-1 hover:underline">Remove</button>
                    </div>
                </div>
            ) : (
                <label className="cursor-pointer group">
                    <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={onFileChange} />
                    <div className="border-2 border-dashed border-gray-200 rounded-lg h-40 flex flex-col items-center justify-center bg-[#F4F4F5] hover:bg-gray-200 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mb-2 group-hover:bg-gray-500 transition-colors">
                            <ArrowUp size={16} />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPEG, PDF (Max 2MB)</p>
                    </div>
                </label>
            )}
        </div>
    );
};

export default CreateStaffForm;
