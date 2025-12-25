import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import SideImage from "../assets/SideImage.png";
import Texture from "../assets/AccessCardTexture.png";

export default function Homepage() {
  const navigate = useNavigate();

  // Countdown to Dec 25th 2025, 10:00 AM
  const eventDate = new Date("2025-12-25T10:00:00");

  // const calculateTimeLeft = () => {
  //   const difference = +eventDate - +new Date();
  //   let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     };
  //   }
  //   return timeLeft;
  // };

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="islamic-pattern absolute inset-0 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        {/* div 1 */}
        <section className="flex items-center justify-between">
          <div>
            <img src={Logo} alt="Madrasah Logo" />
          </div>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 bg-[#064733] text-[#FEED00] px-8 py-2 rounded-[5px] text-md font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </section>

        {/* div 2 */}
        <section className="md:flex md:justify-between md:items-center">
          {/* Countdown */}
          <div className="md:w-[50%] pt-12 md:pt-8">
            <div className="flex justify-start gap-6 md:gap-6 mb-6 flex-wrap">
              <h2 className="text-[16px] md:text-xl lg:text-2xl font-bold border border-[#064733] px-3 py-2 lg:py-4 lg:px-8 rounded-full text-[#064733] leading-[3rem] md:leading-[3.5rem]">
                It's D-Day! See You At The Venue🕌
              </h2>
              {/* {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div
                    className="bg-[#064733] text-white w-16 h-16 md:w-[5rem] md:h-[5rem] rounded-2xl flex flex-col items-center justify-center shadow-2xl"
                    style={{
                      backgroundImage: `url(${Texture})`,
                    }}
                  >
                    <span className="text-3xl md:text-4xl font-bold">
                      {value}
                    </span>
                  </div>
                  <p className="text-[#444444] mt-3 text-sm md:text-base capitalize font-medium">
                    {unit}
                  </p>
                </div>
              ))} */}

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#064733] leading-[3rem] md:leading-[3.5rem]">
                A 3-Day Symposium For Males And Females
                {/* <span className="text-gray-800">males and females</span> */}
              </h1>
              <p className="text-lg md:text-xl text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Join us as we guide the next generation towards Islamic
                excellence and purposeful careers. Don't miss this life-changing
                event!
              </p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 bg-[#064733] text-[#FEED00] px-8 py-2 rounded-[5px] text-md font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </div>

          <div className="mt-10 md:mt-0 md:pt-20">
            <img src={SideImage} alt="Side Image" />
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto px-6 mt-20">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-[#0647331A] rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center">
                  <div className="bg-[#064733] w-10 h-10 rounded-full flex items-center justify-center ">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg text-[#000000] font-bold my-2">
                  Location
                </h3>
                <p className="text-[#000000] leading-relaxed">
                  16 Olagbaye Street, Ilasa bus-stop
                  <br />
                  Lagos state
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-[#0647331A] rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center">
                  <div className="bg-[#064733] w-10 h-10 rounded-full flex items-center justify-center ">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold my-2">Date</h3>
                <p className="text-[#000000]">Dec 25th – 27th, 2025</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-[#0647331A] rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center">
                  <div className="bg-[#064733] w-10 h-10 rounded-full flex items-center justify-center ">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold my-2">Time</h3>
                <p className="text-[#000000]">10:00 am – 'Asr</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-600 border-t border-green-100 mt-10 pt-10">
          <p className="text-sm">
            © {new Date().getFullYear()} GQA Symposium. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

// export default function LandingPage() {
//   // Countdown to Dec 25th 2025, 10:00 AM
//   const eventDate = new Date("2025-12-25T10:00:00");

//   const calculateTimeLeft = () => {
//     const difference = +eventDate - +new Date();
//     let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
//         {/* Hero Section */}
//         <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 text-center">
//           {/* Logo */}
//           <div className="mb-10">
//             <img
//               src="/logo.png"
//               alt="Madrasah Rawdatul Quraan"
//               className="h-24 mx-auto"
//             />
//           </div>

//           {/* Countdown */}
//           <div className="flex justify-center gap-6 md:gap-10 mb-12 flex-wrap">
//             {Object.entries(timeLeft).map(([unit, value]) => (
//               <div key={unit} className="text-center">
//                 <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white w-20 h-20 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
//                   <span className="text-3xl md:text-5xl font-bold">
//                     {value}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mt-3 text-sm md:text-base capitalize font-medium">
//                   {unit}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Main Title */}
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
//             A 3-Day Symposium for both
//             <br />
//             <span className="text-emerald-700">males and females</span>
//           </h1>

//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
//             Join us as we guide the next generation towards Islamic excellence
//             and purposeful careers. Don't miss this life-changing event!
//           </p>

//           <a
//             href="/register"
//             className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xl px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
//           >
//             Register Now
//             <ArrowRight className="w-6 h-6" />
//           </a>
//         </div>

//         {/* Floating Speaker Cards */}
//         <div className="relative max-w-7xl mx-auto px-6 -mt-10 mb-20">
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Card 1 */}
//             <div className="relative group">
//               <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-3 group-hover:rotate-6 transition-all duration-500 hover:-translate-y-4">
//                 <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl p-4 mb-4">
//                   <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
//                 </div>
//                 <h3 className="text-xl font-bold text-emerald-800">
//                   8 Experienced Speakers
//                 </h3>
//               </div>
//             </div>

//             {/* Card 2 - Center & Bigger */}
//             <div className="relative group md:scale-110">
//               <div className="bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 group-hover:-rotate-6 transition-all duration-500 hover:-translate-y-6">
//                 <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl overflow-hidden mb-6 shadow-xl">
//                   <img
//                     src="/mosque-sunset.jpg"
//                     alt="Islamic Career Ethics"
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-bold text-emerald-800 text-center">
//                   Islamic Career Ethics
//                 </h3>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="relative group">
//               <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-6 group-hover:rotate-12 transition-all duration-500 hover:-translate-y-4">
//                 <div className="bg-emerald-50 rounded-2xl p-4 mb-4">
//                   <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
//                 </div>
//                 <h3 className="text-xl font-bold text-emerald-800">
//                   Practical Workshops
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Event Details */}
//         <div className="bg-emerald-900 text-white py-16">
//           <div className="max-w-6xl mx-auto px-6">
//             <div className="grid md:grid-cols-3 gap-10 text-center">
//               <div className="flex flex-col items-center">
//                 <div className="bg-emerald-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <MapPin className="w-8 h-8" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Location</h3>
//                 <p className="text-emerald-100 leading-relaxed">
//                   116 Olabgabe Street, Ilasa bus-stop,
//                   <br />
//                   Lagos state
//                 </p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <div className="bg-emerald-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <Calendar className="w-8 h-8" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Date</h3>
//                 <p className="text-emerald-100">Dec 25th – 27th, 2025</p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <div className="bg-emerald-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <Clock className="w-8 h-8" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Time</h3>
//                 <p className="text-emerald-100">10:00 am – Asr</p>
//               </div>
//             </div>

//             <div className="text-center mt-12">
//               <a
//                 href="/register"
//                 className="inline-flex items-center gap-3 bg-white text-emerald-800 font-bold text-xl px-12 py-5 rounded-full hover:bg-emerald-50 transition-all shadow-xl"
//               >
//                 Secure Your Spot Today
//                 <ArrowRight className="w-6 h-6" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

{
  /* <header className="text-center mb-16 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-700 mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4 tracking-tight">
            Madrasah Rawdatul Quraan
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A distinguished institution dedicated to nurturing hearts and minds
            through the sacred teachings of Islaam
          </p>
        </header> */
}
{
  /* <section className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-16 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Register For Our December Programme
              </h2>
              <p className="text-green-50 text-lg max-w-2xl mx-auto mb-8">
                Join students in discovering the beauty and wisdom of Islamic
                Knowledge. Enroll today and transform your life.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 bg-white text-green-700 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <GraduationCap className="w-6 h-6" />
                Register Now
              </button>
            </div>
          </div>
        </section> */
}
{
  /* <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Qur'anic Studies
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Master Tajweed, memorization, and understanding through
              comprehensive Qur'anic education programs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <GraduationCap className="w-7 h-7 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Expert Teachers
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Learn from qualified scholars with years of experience in Islamic
              education and pedagogy.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Star className="w-7 h-7 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Flexible Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from various programs designed to fit your schedule and
              learning objectives.
            </p>
          </div>
        </section> */
}
