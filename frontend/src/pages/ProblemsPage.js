import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { problemsAPI, unionsAPI } from '../services/api';
import ProblemCard from '../components/ProblemCard';
import { PROBLEM_CATEGORIES } from '../utils/constants';

/* =====================
   SAFE SESSION STORAGE
===================== */
const safeSetSession = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Session storage full. Clearing cache...');
    sessionStorage.clear();
  }
};

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cacheKeys = useMemo(() => ({
    unions: 'cachedUnions'
  }), []);

  /* =====================
     FETCH DATA
  ===================== */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const [problemsRes, unionsRes] = await Promise.all([
        problemsAPI.getAll(),
        unionsAPI.getAll(),
      ]);

      setProblems(problemsRes.data || []);
      setUnions(unionsRes.data || []);

      // Cache ONLY unions (small & static)
      safeSetSession(cacheKeys.unions, unionsRes.data);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('ডাটা লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }, [cacheKeys.unions]);

  /* =====================
     LOAD CACHED UNIONS
  ===================== */
  useEffect(() => {
    const cachedUnions = sessionStorage.getItem(cacheKeys.unions);
    if (cachedUnions) {
      try {
        setUnions(JSON.parse(cachedUnions));
      } catch {}
    }
    fetchData();
  }, [cacheKeys.unions, fetchData]);

  /* =====================
     FILTER HANDLER
  ===================== */
  useEffect(() => {
    if (!selectedUnion && !selectedCategory) {
      fetchData();
      return;
    }

    const applyFilter = async () => {
      try {
        setLoading(true);
        setError('');

        const params = {};
        if (selectedUnion) params.union = selectedUnion;
        if (selectedCategory) params.category = selectedCategory;

        const res = await problemsAPI.getAll(params);
        setProblems(res.data || []);
      } catch (err) {
        console.error('Filter error:', err);
        setError('ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };

    applyFilter();
  }, [selectedUnion, selectedCategory, fetchData]);

  const handleShowDetails = (problem) => {
    alert(`সমস্যা: ${problem.title}\n\nবর্ণনা: ${problem.description}`);
  };

  /* =====================
     LOADING SKELETON
  ===================== */
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow p-6 animate-pulse"
        >
          {/* Top row: Union + Category */}
          <div className="flex justify-between items-center mb-3">
            <div className="h-3 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
  
          {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
  
          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
  
          {/* Footer actions */}
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
  

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                রিপোর্ট করা সমস্যাসমূহ
              </h1>
              <p className="text-gray-600">
                সম্প্রদায় দ্বারা রিপোর্ট করা সমস্যা
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-60"
              >
                {loading ? 'লোড হচ্ছে...' : 'রিফ্রেশ'}
              </button>

              <Link
                to="/report-problem"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                নতুন সমস্যা
              </Link>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedUnion}
              onChange={(e) => setSelectedUnion(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">সকল ইউনিয়ন</option>
              {unions.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.bengaliName}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">সকল বিভাগ</option>
              {PROBLEM_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedUnion('');
                setSelectedCategory('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              রিসেট
            </button>
          </div>
        </div>

       

        {/* CONTENT */}
        {loading ? (
          <LoadingSkeleton />
        ) : problems.length > 0 ? (
          <div className="space-y-4">
            {problems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={{
                  ...problem,
                  unionName:
                    problem.union?.bengaliName || 'অজ্ঞাত',
                }}
                onDetails={handleShowDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">
              কোনো সমস্যা পাওয়া যায়নি
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
