import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="islamic-pattern absolute inset-0 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16 pt-8">
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
        </header>

        <section className="mb-20">
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
        </section>

        {/* <section className="grid md:grid-cols-3 gap-8 mb-20">
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
        </section> */}

        <footer className="text-center text-gray-600 border-t border-green-100 pt-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Madrasah Rawdatul Quraan. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
