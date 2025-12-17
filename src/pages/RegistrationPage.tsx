import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { RegistrationFormData } from "../types/student";
import Texture from "../assets/AccessCardTexture.png";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegistrationFormData>({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    age: "",
    level: "",
    course_of_study: "",
    university: "",
    any_special_needs: "",
    how_did_you_hear_about_the_event: "",
    why_are_you_attending_this_symposium: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const numericValue = value.replace(/[^0-9+]/g, ""); // allow digits and +
      setFormData((prev) => ({ ...prev, phone_number: numericValue }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️ Checks if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("Participation Registration Information")
        .select("id, payment_status")
        .eq("email", formData.email)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        // Optional: if already paid, redirect or block
        setError(
          "This email has already been registered. Please use another email!."
        );
        setLoading(false);
        return;
      }

      const qrCodeValue = `STUDENT-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const { data: student, error: insertError } = await supabase
        .from("Participation Registration Information")
        .insert([
          {
            ...formData,
            full_name: formData.full_name,
            email: formData.email,
            phone_number: formData.phone_number,
            gender: formData.gender,
            age: Number(formData.age) || null,
            level: formData.level,
            course_of_study: formData.course_of_study,
            university: formData.university,
            any_special_needs: formData.any_special_needs,
            how_did_you_hear_about_the_event:
              formData.how_did_you_hear_about_the_event,
            why_are_you_attending_this_symposium:
              formData.why_are_you_attending_this_symposium,
            qr_code_value: qrCodeValue,
            payment_status: "pending",
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      navigate(`/payment/${student.id}`);
    } catch (err: any) {
      // 🧠 HANDLE ALL SUPABASE ERRORS
      if (err?.code === "23505") {
        setError("This email has already been registered.");
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError(
          "Sorry😔, An error occurred during your registration. Please try again!"
        );
      }

      // const message =
      //   err instanceof Error
      //     ? err.message
      //     : "Sorry😔, An error occurred during your registration. Please try again!";

      // setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
      <div className="islamic-pattern absolute inset-0 opacity-5" />
      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-[#064733] hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-[5px] shadow-2xl overflow-hidden border border-green-100">
          <div
            className="bg-[#064733] px-8 py-10 text-center"
            style={{
              backgroundImage: `url(${Texture})`,
            }}
          >
            <h1 className="text-4xl font-bold text-[#FEED00] mb-2">
              Registration Form
            </h1>
            <p className="text-green-50">
              Please fill in all required information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )} */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="+234 7XXX XXXXXX"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min={15}
                  max={30}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your age"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Age must be between 15 and 30 years old.
                </p>
              </div>
            </div>
            {/* -------------------------------- */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class/Level <span className="text-red-500">*</span>
                </label>
                {/* <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your current level (e.g., 200L, SS3,...)"
                /> */}
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your level</option>
                  <option value="SS3">SS3</option>
                  <option value="100L">100L</option>
                  <option value="200L">200L</option>
                  <option value="300L">300L</option>
                  <option value="400L">400L</option>
                  <option value="500L">500L</option>
                  <option value="600L">600L</option>
                  <option value="Graduate">Graduate</option>
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  Only SS3 and above are eligible.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your university or institution name"
                />
              </div>
            </div>
            {/* --------------------------- */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course of Study <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course_of_study"
                  value={formData.course_of_study}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your course of study"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Any Special Needs <span className="text-red-500">*</span>
              </label>
              <textarea
                name="any_special_needs"
                value={formData.any_special_needs}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe any special needs or accommodations"
              />
            </div>
            {/* -------------------------------------- */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How Did You Hear About The Event
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="how_did_you_hear_about_the_event"
                value={formData.how_did_you_hear_about_the_event}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Tell us how you heard about this event (friend, social media, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Why Are You Attending This Symposium{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="why_are_you_attending_this_symposium"
                value={formData.why_are_you_attending_this_symposium}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Briefly explain your reason for attending this symposium"
              />
            </div>

            {/* ----------------------------------------------- */}
            <div className=" w-full md:flex md:justify-center md:items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-1/2 bg-[#064733] text-[#FEED00] py-4 rounded-[5px] font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 duration-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {loading ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course/Program <span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="">Select a program</option>
                <option value="Qur'an Memorization - Beginner">
                  Qur'an Memorization - Beginner
                </option>
                <option value="Qur'an Memorization - Intermediate">
                  Qur'an Memorization - Intermediate
                </option>
                <option value="Qur'an Memorization - Advanced">
                  Qur'an Memorization - Advanced
                </option>
                <option value="Tajweed Mastery">Tajweed Mastery</option>
                <option value="Arabic Language">Arabic Language</option>
                <option value="Islamic Studies">Islamic Studies</option>
              </select>
            </div> */
}

{
  /* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Passport Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-green-700 hover:text-green-800 font-medium"
                >
                  Click to upload
                </label>
                {formData.photo && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.photo.name}
                  </p>
                )}
              </div>
            </div> */
}

//  let photoUrl = "";

//  if (formData.photo) {
//    const fileExt = formData.photo.name.split(".").pop();
//    const fileName = `${Date.now()}.${fileExt}`;
//    const { error: uploadError } = await supabase.storage
//      .from("student-photos")
//      .upload(fileName, formData.photo);

//    if (uploadError) throw uploadError;

//    const { data: urlData } = supabase.storage
//      .from("student-photos")
//      .getPublicUrl(fileName);

//    photoUrl = urlData.publicUrl;
//  }

{
  /* university
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="course_of_study"
                value={formData.course_of_study}
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div> */
}
{
  /* <textarea
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your full address"
              /> */
}

// full_name: formData.full_name,
// email: formData.email,
// phone_number: formData.phone_number,
// gender: formData.gender,
// age: formData.age,
// level: formData.level,
// course_of_study: formData.course_of_study,
// university: formData.university,
// any_special_needs: formData.any_special_needs,
// how_did_you_hear_about_the_event:
//   formData.how_did_you_hear_about_the_event,
// why_are_you_attending_this_symposium:
//   formData.why_are_you_attending_this_symposium,
