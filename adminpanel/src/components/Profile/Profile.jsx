import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Loader2, Calendar } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken"); // Auth token check

        const res = await axios.get(`${API_BASE}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#C83733]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">{error}</div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
        <User className="text-[#C83733]" size={28} /> Admin Profile
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-[#C83733]" />

        <div className="px-6 pb-6">
          {/* Avatar and Name Section */}
          
          <div className="px-6 pb-6">
            {/* Avatar and Name Section - FIXED ALIGNMENT */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-12 mb-8">
              <div className="bg-white p-1 rounded-full border-4 border-white shadow-lg">
                <div className="bg-red-100 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-[#C83733] font-black text-3xl border border-red-200">
                  {profile?.full_name?.charAt(0) || "R"}
                </div>
              </div>

              <div className="text-center md:text-left pb-2">
                <h3 className="text-2xl font-black text-gray-800 leading-tight">
                  {profile?.full_name}
                </h3>
                <p className="text-sm font-bold text-[#C83733] uppercase tracking-widest opacity-80">
                  {profile?.role}istrator
                </p>
              </div>
            </div>

            
            <div className="space-y-4">
              {/* ... email, role, date items ... */}
            </div>
          </div>
          {/* Details Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-[#C83733]">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {profile?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-[#C83733]">
                <Shield size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Account Role
                </p>
                <p className="text-sm font-semibold text-gray-700 capitalize">
                  {profile?.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-[#C83733]">
                <Calendar size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Member Since
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {new Date(profile?.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full bg-[#C83733] text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95">
            Update Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
