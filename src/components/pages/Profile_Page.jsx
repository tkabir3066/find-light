import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { showError, showSuccess } from "../../utils/toast";

const Profile_Page = () => {
      useEffect(() => {
      document.title = "Find Light | My Profile";
    }, []);
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    updateUserProfile({
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        showSuccess(
          "Your profile has been updated successfully!",
          "Profile Updated"
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        showError(
          "Failed to update profile. Please try again.",
          "Update Failed"
        );
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1ECCE]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#331832]">
            Please login to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1ECCE] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#9FC2CC] rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B5299] px-6 py-4">
            <h1 className="text-2xl font-bold text-[#F1ECCE]">My Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={
                    formData.photoURL ||
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#694D75] object-cover"
                />
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  message.includes("successfully")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Profile Information */}
            {!isEditing ? (
              <div className="space-y-4">
                {/* Display Name */}
                <div className="flex items-center space-x-3 p-4 bg-[#F1ECCE] rounded-lg">
                  <FaUser className="text-[#694D75] text-lg" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#331832] mb-1">
                      Display Name
                    </label>
                    <p className="text-[#331832] font-medium">
                      {user.displayName || "Not set"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 p-4 bg-[#F1ECCE] rounded-lg">
                  <FaEnvelope className="text-[#694D75] text-lg" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#331832] mb-1">
                      Email Address
                    </label>
                    <p className="text-[#331832] font-medium">{user.email}</p>
                  </div>
                </div>

                {/* Photo URL */}
                <div className="flex items-center space-x-3 p-4 bg-[#F1ECCE] rounded-lg">
                  <FaImage className="text-[#694D75] text-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-[#331832] mb-1">
                      Profile Photo URL
                    </label>
                    <p className="text-[#331832] font-medium break-all overflow-hidden text-ellipsis">
                      {user.photoURL || "Not set"}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#1B5299] text-[#F1ECCE] rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                  >
                    <FaEdit className="text-sm" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Display Name Input */}
                <div>
                  <label className="block text-sm font-medium text-[#331832] mb-2">
                    Display Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 pl-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                      placeholder="Enter your display name"
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#694D75]" />
                  </div>
                </div>

                {/* Email Input (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-[#331832] mb-2">
                    Email Address (Cannot be changed)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full px-3 py-3 pl-10 border-2 rounded-lg bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
                      placeholder="Email cannot be changed"
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-[#694D75] mt-1">
                    Email updates require additional verification and are not
                    supported in this form.
                  </p>
                </div>

                {/* Photo URL Input */}
                <div>
                  <label className="block text-sm font-medium text-[#331832] mb-2">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 pl-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                      placeholder="Enter photo URL"
                    />
                    <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#694D75]" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      isUpdating
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-[#1B5299] text-[#F1ECCE] hover:opacity-90"
                    }`}
                  >
                    <FaSave className="text-sm" />
                    <span>{isUpdating ? "Updating..." : "Save Changes"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-[#694D75] text-[#F1ECCE] rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                  >
                    <FaTimes className="text-sm" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Page;