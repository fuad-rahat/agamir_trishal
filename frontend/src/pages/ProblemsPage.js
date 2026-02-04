import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  const hasLoadedCache = useRef(false);
  const cacheKeys = useMemo(() => ({
    problems: 'cachedProblems',
    unions: 'cachedUnions',
  }), []);

  const fetchData = useCallback(async () => {
    try {
      if (!hasLoadedCache.current) {
        setLoading(true);
      }
      const [problemsRes, unionsRes] = await Promise.all([
        problemsAPI.getAll(),
        unionsAPI.getAll()
      ]);
      setProblems(problemsRes.data);
      setUnions(unionsRes.data);
      sessionStorage.setItem(cacheKeys.problems, JSON.stringify(problemsRes.data));
      sessionStorage.setItem(cacheKeys.unions, JSON.stringify(unionsRes.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [cacheKeys]);

  useEffect(() => {
    const cachedProblems = sessionStorage.getItem(cacheKeys.problems);
    const cachedUnions = sessionStorage.getItem(cacheKeys.unions);
    if (cachedProblems && cachedUnions) {
      try {
        setProblems(JSON.parse(cachedProblems));
        setUnions(JSON.parse(cachedUnions));
        setLoading(false);
        hasLoadedCache.current = true;
      } catch (error) {
        console.error('Error parsing cached data:', error);
      }
    }
    fetchData();
  }, [cacheKeys, fetchData]);

  useEffect(() => {
    const applyFilter = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedUnion) params.union = selectedUnion;
        if (selectedCategory) params.category = selectedCategory;

        if (selectedUnion || selectedCategory) {
          const response = await problemsAPI.getAll(params);
          setProblems(response.data);
        } else {
          await fetchData();
        }
      } catch (error) {
        console.error('Error filtering problems:', error);
      } finally {
        setLoading(false);
      }
    };

    applyFilter();
  }, [fetchData, selectedUnion, selectedCategory]);

  const handleShowDetails = (problem) => {
    alert(`সমস্যা: ${problem.title}\n\nবর্ণনা: ${problem.description}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with CTA */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <i className="fas fa-exclamation-circle text-red-600 mr-2"></i>রিপোর্ট করা সমস্যাসমূহ
              </h1>
              <p className="text-gray-600 mt-1">সম্প্রদায় দ্বারা রিপোর্ট করা সমস্যাসমূহ দেখুন এবং সমাধানে সহায়তা করুন</p>
            </div>

            <Link to="/report-problem" className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md font-semibold">
              <i className="fas fa-plus mr-2"></i>নতুন সমস্যা রিপোর্ট করুন
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Union Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="fas fa-map-marked-alt mr-2"></i>ইউনিয়ন নির্বাচন করুন
              </label>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">সকল ইউনিয়ন</option>
                {unions.map((union) => (
                  <option key={union._id} value={union._id}>
                    {union.bengaliName}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="fas fa-filter mr-2"></i>বিভাগ নির্বাচন করুন
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">সকল বিভাগ</option>
                {PROBLEM_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedUnion('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                <i className="fas fa-redo mr-2"></i>রিসেট করুন
              </button>
            </div>
          </div>
        </div>

        {/* Problems List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">সমস্যা লোড হচ্ছে...</p>
          </div>
        ) : problems.length > 0 ? (
          <div className="space-y-4">
            <div className="text-gray-600 font-semibold mb-4">
              মোট {problems.length}টি সমস্যা পাওয়া গেছে
            </div>
            {problems.map((problem) => {
              // Prefer populated union.bengaliName from API, otherwise lookup from unions list
              let unionName = 'অজ্ঞাত';
              if (problem.union) {
                if (typeof problem.union === 'string' || typeof problem.union === 'number') {
                  const found = unions.find(u => u._id === problem.union || String(u._id) === String(problem.union));
                  if (found) unionName = found.bengaliName;
                } else if (problem.union.bengaliName) {
                  unionName = problem.union.bengaliName;
                } else if (problem.union.name) {
                  unionName = problem.union.name;
                }
              }

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
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4 text-gray-400">
              <i className="fas fa-inbox"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">কোনো সমস্যা পাওয়া যায়নি</h3>
            <p className="text-gray-600">আপনার নির্বাচিত ফিল্টার অনুযায়ী কোনো সমস্যা নেই</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
