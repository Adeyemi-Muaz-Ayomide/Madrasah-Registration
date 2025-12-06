import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Student } from "../types/student";

export default function PaymentPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const COURSE_FEE = 5000;

  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      const { data, error } = await supabase
        .from("Participation Registration Information")
        .select("*")
        .eq("id", studentId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError("Student not found");
        return;
      }

      setStudent(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching student data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { error: updateError } = await supabase
        .from("Participation Registration Information")
        .update({
          payment_status: "paid",
          stripe_session_id: `demo_${Date.now()}`,
        })
        .eq("id", studentId);

      if (updateError) throw updateError;

      navigate(`/access-card/${studentId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment processing failed"
      );
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
      <div className="islamic-pattern absolute inset-0 opacity-5" />

      <div className="relative max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-10 text-center">
            <CreditCard className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Payment</h1>
            <p className="text-green-50">Complete your registration</p>
          </div>

          <div className="p-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Registration Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Student Name:</span>
                  <span className="font-semibold text-gray-800">
                    {student?.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-800">
                    {student?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Of Study:</span>
                  <span className="font-semibold text-gray-800">
                    {student?.course_of_study}
                  </span>
                </div>
                <div className="border-t border-green-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Program Fee:
                    </span>
                    <span className="text-3xl font-bold text-green-700">
                      ₦{COURSE_FEE}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> This is a demonstration payment. In
                production, this would integrate with Stripe for secure payment
                processing.
              </p>
            </div> */}

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Complete Payment - ₦{COURSE_FEE}
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment processing
              <br />
              Powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
