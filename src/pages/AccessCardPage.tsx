import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, CheckCircle, ArrowLeft } from "lucide-react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { supabase } from "../lib/supabase";

export default function AccessCardPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [student, setStudent] = useState<any>(null); // Simplified typing since we only need a few fields
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (studentId) fetchStudentAndGenerateQR();
  }, [studentId]);

  const fetchStudentAndGenerateQR = async () => {
    try {
      const { data, error } = await supabase
        .from("Participation Registration Information")
        .select("full_name, gender, id, payment_status")
        .eq("id", Number(studentId))
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError("Student not found");
        return;
      }
      if (data.payment_status !== "paid") {
        setError("Payment not completed");
        return;
      }

      setStudent(data);

      // Generate readable QR code content
      //       const qrText = `Name: ${data.full_name}\nID: ${String(
      //         data.id
      //       ).toUpperCase()}
      // \nGender: ${data.gender}`;

      const qrText = [
        `Name: ${data.full_name}`,
        `ID: ${data.id}`,
        `Gender: ${data.gender}`,
        `payment_status: ${data.payment_status}`,
      ].join("\n");

      const qrUrl = await QRCode.toDataURL(qrText, {
        width: 320,
        margin: 1,
        color: {
          dark: "#FEED00",
          light: "#064733",
        },
      });

      setQrCodeUrl(qrUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load card");
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current || !student) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `Access-Card-${student.full_name.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">
            Preparing your access card...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">Error</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Success - Access Card
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto relative">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-10">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">
            Access Card Ready!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Download and keep it safe
          </p>
        </div>

        {/* The Actual Card */}
        <div className="shadow-2xl p-3 md:p-6 max-w-2xl mx-auto">
          <div
            ref={cardRef}
            className="relative bg-[#064733] text-white overflow-hidden shadow-2xl"
            style={{
              backgroundImage: "url('/AccessCardTexture.png')",
            }}
          >
            {/* Top Section */}
            <div className="px-5 md:px-10 pt-10 pb-8">
              <div className="flex justify-between items-start mb-7">
                {/* Registration ID */}
                <div>
                  <p className="text-white/70 text-sm font-medium tracking-wider uppercase">
                    Registration ID
                  </p>
                  <p className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                    {String(student?.id).padStart(3, "0")}
                  </p>
                </div>

                {/* Yellow QR Code Icon */}
                <div className="text-[#FEED00]">
                  <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
                </div>
              </div>

              {/* Name & Gender */}
              <div className="flex justify-between gap-8 ">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-medium">
                    Full Name
                  </p>
                  <p className="text-xl font-bold mt-3 leading-tight">
                    {student?.full_name}
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-medium">
                    Gender
                  </p>
                  <p className="text-xl font-bold mt-3 uppercase">
                    {student?.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div
              className="bg-[#FFFFFF00] py-8 px-5 text-center bg-"
              // style={{
              //   backgroundImage: "url('/White.png')",
              // }}
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.15"/%3E%3C/svg%3E\')',
              }}
            >
              <h2 className="text-[24px] font-black tracking-wider uppercase">
                GQA SYMPOSIUM ACCESS CARD
              </h2>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mt-10">
          <button
            onClick={downloadCard}
            className="inline-flex items-center gap-3 bg-[#064733] hover:to-green-800 text-[#FEED00] font-bold py-5 px-10 rounded-xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Download className="w-7 h-7" />
            Download Access Card (PNG)
          </button>
          <p className="text-gray-600 mt-5 text-sm">
            This card is your official entry pass.
          </p>
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Download, CheckCircle, ArrowLeft } from 'lucide-react';
// import QRCode from 'qrcode';
// import html2canvas from 'html2canvas';
// import { supabase } from '../lib/supabase';
// import { Student } from '../types/student';

// export default function AccessCardPage() {
//   const { studentId } = useParams<{ studentId: string }>();
//   const navigate = useNavigate();
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [student, setStudent] = useState<Student | null>(null);
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (studentId) {
//       fetchStudentAndGenerateQR();
//     }
//   }, [studentId]);

//   const fetchStudentAndGenerateQR = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('students')
//         .select('*')
//         .eq('id', studentId)
//         .maybeSingle();

//       if (error) throw error;
//       if (!data) {
//         setError('Student not found');
//         return;
//       }

//       if (data.payment_status !== 'paid') {
//         setError('Payment not completed');
//         return;
//       }

//       setStudent(data);

//       const qrUrl = await QRCode.toDataURL(data.qr_code_value, {
//         width: 300,
//         margin: 2,
//         color: {
//           dark: '#0B8A32',
//           light: '#FFFFFF',
//         },
//       });
//       setQrCodeUrl(qrUrl);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error loading access card');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadCard = async () => {
//     if (!cardRef.current) return;

//     try {
//       const canvas = await html2canvas(cardRef.current, {
//         scale: 2,
//         backgroundColor: '#ffffff',
//       });

//       const link = document.createElement('a');
//       link.download = `access-card-${student?.full_name.replace(/\s+/g, '-')}.png`;
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//     } catch (err) {
//       console.error('Error downloading card:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Generating your access card...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-3xl">❌</span>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => navigate('/')}
//             className="text-green-700 hover:text-green-800 font-semibold"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
//       <div className="islamic-pattern absolute inset-0 opacity-5" />

//       <div className="relative max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to Home
//         </button>

//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Registration Complete!</h1>
//           <p className="text-lg text-gray-600">Your student access card is ready</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
//           <div ref={cardRef} className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 overflow-hidden">
//             <div className="islamic-pattern-card absolute inset-0 opacity-10" />

//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h2 className="text-3xl font-bold text-white mb-1">Madrasah Rawdatul Quraan</h2>
//                   <p className="text-green-100">Student Access Card</p>
//                 </div>
//                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-3xl">📖</span>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   {student?.photo_url && (
//                     <div className="mb-4">
//                       <img
//                         src={student.photo_url}
//                         alt={student.full_name}
//                         className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <p className="text-green-200 text-sm mb-1">Full Name</p>
//                     <p className="text-white text-xl font-bold">{student?.full_name}</p>
//                   </div>

//                   <div>
//                     <p className="text-green-200 text-sm mb-1">Student ID</p>
//                     <p className="text-white text-lg font-mono">{student?.id?.slice(0, 13).toUpperCase()}</p>
//                   </div>

//                   <div>
//                     <p className="text-green-200 text-sm mb-1">Program</p>
//                     <p className="text-white text-lg">{student?.course}</p>
//                   </div>

//                   <div>
//                     <p className="text-green-200 text-sm mb-1">Date of Birth</p>
//                     <p className="text-white text-lg">{new Date(student?.date_of_birth || '').toLocaleDateString()}</p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center justify-center">
//                   <div className="bg-white p-4 rounded-xl shadow-2xl">
//                     {qrCodeUrl && (
//                       <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
//                     )}
//                   </div>
//                   <p className="text-green-100 text-sm mt-4 text-center">Scan for verification</p>
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-green-500">
//                 <div className="flex justify-between items-center text-green-100 text-sm">
//                   <span>Valid from {new Date().toLocaleDateString()}</span>
//                   <span className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     Verified
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300 opacity-10 rounded-full blur-3xl" />
//           </div>
//         </div>

//         <div className="text-center">
//           <button
//             onClick={downloadCard}
//             className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all"
//           >
//             <Download className="w-6 h-6" />
//             Download Access Card
//           </button>
//           <p className="text-gray-600 text-sm mt-4">
//             Keep this card safe. You'll need it for accessing the institution.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <span>Issued: {new Date().toLocaleDateString("en-GB")}</span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verified Participant
                </span> */
}

{
  /* w-full md:w-1/2 bg-[#064733] text-[#FEED00] py-4 rounded-[5px]
            font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700
            hover:to-green-800 duration-300 transition-all disabled:opacity-50
            disabled:cursor-not-allowed hover:scale-105 */
}
