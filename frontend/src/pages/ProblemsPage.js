import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { problemsAPI, unionsAPI } from '../services/api';
import ProblemCard from '../components/ProblemCard';
import { PROBLEM_CATEGORIES } from '../utils/constants';

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const hasLoadedCache = useRef(false);

  const cacheKeys = useMemo(
    () => ({
      problems: 'cachedProblems',
      unions: 'cachedUnions',
    }),
    []
  );

  const loadData = useCallback(async () => {
    try {
      if (!hasLoadedCache.current) setLoading(true);

      const [problemsRes, unionsRes] = await Promise.all([
        problemsAPI.getAll(),
        unionsAPI.getAll(),
      ]);

      setProblems(problemsRes.data);
      setUnions(unionsRes.data);
      setError('');

      sessionStorage.setItem(
        cacheKeys.problems,
        JSON.stringify(problemsRes.data)
      );
      sessionStorage.setItem(
        cacheKeys.unions,
        JSON.stringify(unionsRes.data)
      );
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('ডাটা লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }, [cacheKeys]);

  const fetchData = useCallback(async () => {
    try {
      if (!hasLoadedCache.current) setLoading(true);

      const [problemsRes, unionsRes] = await Promise.all([
        problemsAPI.getAll(),
        unionsAPI.getAll(),
      ]);

      setProblems(problemsRes.data);
      setUnions(unionsRes.data);
      setError('');

      sessionStorage.setItem(
        cacheKeys.problems,
        JSON.stringify(problemsRes.data)
      );
      sessionStorage.setItem(
        cacheKeys.unions,
        JSON.stringify(unionsRes.data)
      );
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('ডাটা রিফ্রেশ করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  }, [cacheKeys]);

  // Load cached data first
  useEffect(() => {
    const cachedProblems = sessionStorage.getItem(cacheKeys.problems);
    const cachedUnions = sessionStorage.getItem(cacheKeys.unions);

    if (cachedProblems && cachedUnions) {
      try {
        setProblems(JSON.parse(cachedProblems));
        setUnions(JSON.parse(cachedUnions));
        setLoading(false);
        hasLoadedCache.current = true;
      } catch (err) {
        console.error('Cache parse error:', err);
      }
    }

    loadData();
  }, [cacheKeys, loadData]);

  // Filter logic
  useEffect(() => {
    if (!selectedUnion && !selectedCategory) {
      const cached = sessionStorage.getItem(cacheKeys.problems);
      if (cached) {
        try {
          setProblems(JSON.parse(cached));
          return;
        } catch {}
      }
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

        const response = await problemsAPI.getAll(params);
        setProblems(response.data || []);
      } catch (err) {
        console.error('Filter error:', err);
        setError('ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };

    applyFilter();
  }, [
    selectedUnion,
    selectedCategory,
    fetchData,
    cacheKeys.problems,
  ]);

  const handleShowDetails = (problem) => {
    alert(
      `সমস্যা: ${problem.title}\n\nবর্ণনা: ${problem.description}`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                <i className="fas fa-exclamation-circle text-red-600 mr-2"></i>
                রিপোর্ট করা সমস্যাসমূহ
              </h1>
              <p className="text-gray-600 mt-1">
                সম্প্রদায় দ্বারা রিপোর্ট করা সমস্যাসমূহ
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
              >
                <i
                  className={`fas ${
                    loading ? 'fa-spinner fa-spin' : 'fa-sync-alt'
                  } mr-2`}
                ></i>
                রিফ্রেশ
              </button>

              <Link
                to="/report-problem"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                নতুন সমস্যা
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
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

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 rounded">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-10 w-10 border-b-2 border-green-500 mx-auto"></div>
          </div>
        ) : problems.length > 0 ? (
          <div className="space-y-4">
            {problems.map((problem) => {
              let unionName = 'অজ্ঞাত';
              if (problem.union?.bengaliName)
                unionName = problem.union.bengaliName;

              return (
                <ProblemCard
                  key={problem._id}
                  problem={{ ...problem, unionName }}
                  onDetails={handleShowDetails}
                />
              );
            })}
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
