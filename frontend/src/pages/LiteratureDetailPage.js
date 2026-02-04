import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LiteratureDetailPage = () => {
  const navigate = useNavigate();
  const { kind, id } = useParams();
  const numericId = Number(id);

  // Same demo content structure as list page, but with full text placeholder
  const content = {
    poem: [
      {
        id: 1,
        type: 'কবিতা',
        title: 'মেঘের দেশে ফেরার ডাক',
        author: 'ডেমো লেখক ১',
        body:
          'মেঘ ডাকে, বৃষ্টির সুরে\nগ্রামবাংলার মাটির ঘ্রাণে\nফসল পাকে, নদী ডাকে\nভোরের আলো নরম গানে...\n\nএই কবিতাটি সম্পূর্ণ ডেমো কনটেন্ট; আপনি পরে এখানে আপনার আসল কবিতার পূর্ণ লেখা দেবেন।',
      },
      {
        id: 2,
        type: 'কবিতা',
        title: 'ত্রিশালের সন্ধ্যা',
        author: 'ডেমো লেখক ২',
        body:
          'সূর্য যখন ঢলে পড়ে ব্রহ্মপুত্রের তীরে\nআজানের সুর ভেসে আসে নরম হাওয়ার নীড়ে...\n\nএই লেখাটিও ডেমো; আসল কবিতার পূর্ণ ভার্সন আপনি এখানে বসিয়ে দেবেন।',
      },
    ],
    story: [
      {
        id: 1,
        type: 'ছোট গল্প',
        title: 'বটতলার বেঞ্চ',
        author: 'ডেমো লেখক ৩',
        body:
          'ত্রিশাল বাজারের পুরনো বটতলার নিচে সেই বেঞ্চটা আজও আছে। রফিক আর মিলির প্রথম দেখা, প্রথম ঝগড়া, প্রথম হাত ধরা – সব স্মৃতি জমে আছে সেই বেঞ্চে...\n\nএখানে আপনি আপনার আসল ছোট গল্পের পূর্ণ লেখা রাখবেন – এই অংশটি শুধু ডেমো।',
      },
      {
        id: 2,
        type: 'ছোট গল্প',
        title: 'মাটির ঘরের আলো',
        author: 'ডেমো লেখক ৪',
        body:
          'ধানীখোলার সেই ছোট্ট মাটির ঘরে রাতের খাবারের পরও বাতি নিভে না। ছেলে-মেয়েরা পড়ে, মা বসে গল্প শোনায় – স্বপ্ন বোনে নতুন ভোরের...\n\nএই লেখাও ডেমো – আপনি পরে বাস্তব গল্পের কনটেন্ট লিখবেন।',
      },
    ],
  };

  const isPoem = kind === 'poem';
  const list = isPoem ? content.poem : content.story;
  const item = list.find((x) => x.id === numericId);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50">
        <div className="text-center px-4">
          <p className="text-gray-600 mb-4">এই লেখাটি পাওয়া যায়নি (ডেমো)।</p>
          <button
            onClick={() => navigate('/literature')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            সাহিত্য তালিকায় ফিরুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white py-8 shadow-lg">
        <div className="max-w-3xl mx-auto px-4">
          <button
            onClick={() => navigate('/literature')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            কবিতা ও ছোট গল্পের তালিকায় ফিরুন
          </button>
          <h1 className="text-3xl font-bold flex items-center">
            <i className={`fas ${isPoem ? 'fa-feather-alt' : 'fa-book-reader'} mr-4`}></i>
            {item.title}
          </h1>
          <p className="text-indigo-100 mt-2 text-sm">
            {item.type} · লেখক: {item.author} (ডেমো)
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500">
          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">{item.body}</pre>
        </article>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে যে লেখা দেখছেন সবই ডেমো; আপনি পরে নিজের কবিতা বা ছোট গল্পের পূর্ণ কনটেন্ট বসিয়ে দেবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default LiteratureDetailPage;

