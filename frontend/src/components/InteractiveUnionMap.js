import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InteractiveUnionMap.css';

const InteractiveUnionMap = () => {
  const navigate = useNavigate();
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [hoveredUnion, setHoveredUnion] = useState(null);
  const [svgContent, setSvgContent] = useState(null);

  // Union metadata for details panel
  const unions = [
    {
      id: 1,
      name: 'Mothbari',
      bengaliName: 'মঠবাড়ী',
      population: '36,120',
      voters: '21,360',
      villages: 13,
      area: '29.2',
      color: '#f59e0b',
      pathId: 'SvgjsPath1004'
    },
    {
      id: 2,
      name: 'Trishal',
      bengaliName: 'ত্রিশাল',
      population: '45,120',
      voters: '26,720',
      villages: 20,
      area: '36.4',
      color: '#4c1d95',
      pathId: 'SvgjsPath1005'
    },
    {
      id: 3,
      name: 'Kanthal',
      bengaliName: 'কাঁঠাল',
      population: '38,920',
      voters: '23,040',
      villages: 16,
      area: '31.5',
      color: '#f9b121',
      pathId: 'SvgjsPath1006'
    },
    {
      id: 4,
      name: 'Dhankhola',
      bengaliName: 'ধানীখোলা',
      population: '36,320',
      voters: '21,480',
      villages: 14,
      area: '28.5',
      color: '#92400e',
      pathId: 'SvgjsPath1007'
    },
    {
      id: 5,
       name: 'Kanihary',
      bengaliName: 'কানিহারী',
      population: '31,200',
      voters: '18,480',
      villages: 11,
      area: '25.2',
      color: '#1f2937',
      pathId: 'SvgjsPath1008'
    },
    {
      id: 6,
       name: 'Bailor',
      bengaliName: 'বৈলর',
      population: '32,560',
      voters: '19,280',
      villages: 12,
      area: '26.3',
      color: '#491684',
      pathId: 'SvgjsPath1009'
    },
    {
      id: 7,
      name: 'Harirampur',
      bengaliName: 'হরিরামপুর',
      population: '39,680',
      voters: '23,480',
      villages: 15,
      area: '32.0',
      color: '#d89ac2',
        pathId: 'SvgjsPath1010'
    },
    {
      id: 8,
      name: 'Rampur',
      bengaliName: 'রামপুর',
      population: '41,840',
      voters: '24,750',
      villages: 18,
      area: '33.8',
      color: '#ec4899',
        pathId: 'SvgjsPath1011'
    },
    {
      id: 9,
      name: 'Balipara',
      bengaliName: 'বালিপাড়া',
      population: '37,280',
      voters: '22,080',
      villages: 14,
      area: '30.1',
      color: '#fbfb0b',
        pathId: 'SvgjsPath1012'
    },
    {
      id: 10,
      name: 'Mokspur',
      bengaliName: 'মোক্ষপুর',
      population: '38,440',
      voters: '22,750',
      villages: 15,
      area: '31.0',
      color: '#44a844',
        pathId: 'SvgjsPath1006'
    },
    {
      id: 11,
      name: 'Amirabari',
      bengaliName: 'আমিরাবাড়ী',
      population: '39,263',
      voters: '23,212',
      villages: 16,
      area: '31.7',
      color: '#000000',
        pathId: 'SvgjsPath1014'
    },
    {
      id: 12,
      name: 'Sakhua',
      bengaliName: 'সাখুয়া',
      population: '35,440',
      voters: '20,960',
      villages: 13,
      area: '28.6',
      color: '#ef4444',
        pathId: 'SvgjsPath1015'
    }
  ];

    // Load SVG and make paths interactive (uses trishal_new.svg)
    useEffect(() => {
      let cleanupFns = [];
      fetch('/trishal_new.svg')
        .then(res => res.text())
        .then(svg => {
          setSvgContent(svg);

          // Wait for DOM to render injected SVG
          setTimeout(() => {
            const container = document.querySelector('.svg-map-container');
            if (!container) return;

            // The injected SVG will be the first <svg> inside container
            const svgEl = container.querySelector('svg');
            if (!svgEl) return;

            // Collect all shape elements (paths, g > path, etc.)
            const allShapeEls = Array.from(svgEl.querySelectorAll('path, polygon, polyline'));
            
            // Track which elements have been assigned to unions
            const assignedEls = new Set();
            const matchedUnions = new Set();
            
            // Try to map unions to elements by id, data-name, title, color match, or fallback to order
            unions.forEach((union, idx) => {
              let el = null;

              // 1) by explicit id
              if (union.pathId) el = svgEl.querySelector('#' + union.pathId);

              // 2) by data-name or data-id attributes
              if (!el) el = svgEl.querySelector("[data-name='" + union.name + "'], [data-name='" + union.bengaliName + "']");

              // 3) by <title> matching inside a parent <g>
              if (!el) {
                const titleMatch = Array.from(svgEl.querySelectorAll('title')).find(t => {
                  return t.textContent && (t.textContent.trim() === union.name || t.textContent.trim() === union.bengaliName);
                });
                if (titleMatch) el = titleMatch.parentElement.querySelector('path, polygon, polyline');
              }

              // 4) by matching the union color (each union has unique color)
              if (!el) {
                el = allShapeEls.find(shape => {
                  const fill = (shape.getAttribute('fill') || '').toUpperCase();
                  return fill === union.color.toUpperCase();
                });
              }

              // 5) fallback to nth unassigned path element (skip background colors and assigned elements)
              if (!el) {
                const bgColors = ['D89AC2', 'FDFEFD', 'FBFB0B', 'D9D9D9', 'E0E0E0'];
                const unassignedEls = allShapeEls.filter(shape => {
                  if (assignedEls.has(shape)) return false;
                  const fill = (shape.getAttribute('fill') || '').toUpperCase();
                  return !bgColors.some(bgColor => fill.includes(bgColor));
                });
                
                // Count how many unmatched unions remain
                const unmatchedUnions = unions.length - matchedUnions.size;
                const unmatchedIdx = idx - matchedUnions.size;
                
                if (unmatchedIdx >= 0 && unmatchedIdx < unassignedEls.length) {
                  el = unassignedEls[unmatchedIdx];
                }
              }

              if (el && !assignedEls.has(el)) {
                assignedEls.add(el);
                matchedUnions.add(idx);
                console.log(`Matched union: ${union.name} (${union.color})`);
                // Store union data on the element for later reference
                el.dataset.unionId = union.id;
                el.dataset.unionName = union.name;
                
                // apply fill color
                try { el.setAttribute('fill', union.color); } catch (e) {}
                el.setAttribute('stroke', 'white');
                el.setAttribute('stroke-width', '2');

                const onClick = () => {
                  setSelectedUnion(union);
                  // Navigate to union detail page
                  navigate(`/union/${union.id}`);
                };
                const onEnter = () => {
                  setHoveredUnion(union);
                  el.style.filter = 'drop-shadow(4px 4px 8px rgba(0,0,0,0.25)) brightness(1.1)';
                  el.setAttribute('stroke-width', '4');
                };
                const onLeave = () => {
                  setHoveredUnion(null);
                  el.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.15))';
                  el.setAttribute('stroke-width', '2');
                };

                el.style.cursor = 'pointer';
                el.style.transition = 'all 0.25s ease';
                el.style.pointerEvents = 'auto';

                el.addEventListener('click', onClick);
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);

                cleanupFns.push(() => {
                  el.removeEventListener('click', onClick);
                  el.removeEventListener('mouseenter', onEnter);
                  el.removeEventListener('mouseleave', onLeave);
                });
              } else {
                console.warn(`Could not find element for union: ${union.name} (${union.color})`);
              }
            });
            
            console.log(`Successfully matched ${matchedUnions.size} out of ${unions.length} unions`);
          }, 50);
        })
        .catch(err => {
          console.error('Failed to load trishal_new.svg', err);
        });

      return () => {
        cleanupFns.forEach(fn => fn());
      };
    }, []);

  // Union list with IDs for navigation (order: ১নং to ১২নং)
  const unionList = [
    { label: 'ধানীখোলা', id: 4 }, { label: 'বৈলর', id: 6 }, { label: 'কাঁঠাল', id: 3 },
    { label: 'কানিহারী', id: 5 }, { label: 'রামপুর', id: 8 }, { label: 'ত্রিশাল', id: 2 },
    { label: 'হরিরামপুর', id: 7 }, { label: 'সাখুয়া', id: 12 }, { label: 'বালিপাড়া', id: 9 },
    { label: 'মঠবাড়ী', id: 1 }, { label: 'মোক্ষপুর', id: 10 }, { label: 'আমিরাবাড়ী', id: 11 }
  ];

  const bengaliNum = (n) => ['10', '৬', '৩', '১', '৪', '২', '৭', '৫', '৯', '১১', '১২', '৮'][n - 1];

  return (
    <div className="home-map-section">
      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-hero-title">ত্রিশাল উপজেলা</h1>
        <p className="home-hero-subtitle">Trishal Upazila · ময়মনসিংহ</p>
        <p className="home-hero-hint">
          <i className="fas fa-map-marker-alt"></i>
          মানচিত্রে বা তালিকা থেকে ইউনিয়ন নির্বাচন করুন
        </p>
      </section>
  {/* Map + Union list */}
  <section className="home-explore">
        <h2 className="home-section-label">ইউনিয়ন অনুসন্ধান</h2>
        <div className="home-explore-layout my-3">
          {/* Map - main focus */}
          <div className="home-map-card ">
            <div className="svg-map-container">
              {svgContent && (
                <div
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  className="home-map-svg"
                  style={{ height: 'auto' }}
                />
              )}
            </div>
          </div>

          {/* Union list - clickable */}
          <div className="home-union-list-card">
            <h3 className="home-union-list-title">
              <i className="fas fa-list-ul"></i>
              ইউনিয়ন তালিকা
            </h3>
            <div className="home-union-grid">
              {unionList.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => navigate(`/union/${u.id}`)}
                  className="home-union-chip"
                >
                  <span className="home-union-num">{bengaliNum(u.id)}নং</span>
                  <span className="home-union-name">{u.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Quick Services - prominent, easy to tap */}
      <section className="home-services">
        <h2 className="home-section-label">সেবাসমূহ</h2>
        <div className="home-services-intro">
          <p className="home-services-intro-main">আপনার দৈনন্দিন প্রয়োজনের সেবা এক জায়গায়।</p>
          <p className="home-services-intro-sub">পরীক্ষা, যাতায়াত, রক্ত, খাদ্য, শিক্ষা ও আরও অনেক সুবিধা – যেটা দরকার সেটি বেছে নিন।</p>
        </div>
        <div className="home-services-grid">
          <button
            type="button"
            onClick={() => navigate('/find-tutor')}
            className="home-service-card home-service-card--tutor"
          >
            <span className="home-service-icon"><i className="fas fa-chalkboard-teacher"></i></span>
            <span className="home-service-title">ফাইন্ড টিউটর</span>
            <span className="home-service-desc">যোগ্য শিক্ষক খুঁজুন</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/humanity-wall')}
            className="home-service-card home-service-card--humanity"
          >
            <span className="home-service-icon"><i className="fas fa-hands-helping"></i></span>
            <span className="home-service-title">মানবতার দেওয়াল</span>
            <span className="home-service-desc">মানুষের পাশে মানুষ</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/blood-donation')}
            className="home-service-card home-service-card--blood"
          >
            <span className="home-service-icon"><i className="fas fa-tint"></i></span>
            <span className="home-service-title">ব্লাড ডোনেশন</span>
            <span className="home-service-desc">জরুরিতে রক্তের তথ্য</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/literature')}
            className="home-service-card home-service-card--literature"
          >
            <span className="home-service-icon"><i className="fas fa-book-open"></i></span>
            <span className="home-service-title">কবিতা ও ছোট গল্প</span>
            <span className="home-service-desc">টপ সাহিত্য ডেমো তালিকা</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/famous-food')}
            className="home-service-card home-service-card--food"
          >
            <span className="home-service-icon"><i className="fas fa-utensils"></i></span>
            <span className="home-service-title">বিখ্যাত খাবার</span>
            <span className="home-service-desc">ত্রিশালের স্বাদের মানচিত্র</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/culture')}
            className="home-service-card home-service-card--culture"
          >
            <span className="home-service-icon"><i className="fas fa-theater-masks"></i></span>
            <span className="home-service-title">সংস্কৃতি</span>
            <span className="home-service-desc">লোকসংস্কৃতি ও ঐতিহ্য</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/book-vehicles')}
            className="home-service-card home-service-card--vehicles"
          >
            <span className="home-service-icon"><i className="fas fa-car-side"></i></span>
            <span className="home-service-title">Book Vehicles</span>
            <span className="home-service-desc">যানবাহনের ডেমো তালিকা</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/mosques')}
            className="home-service-card home-service-card--mosques"
          >
            <span className="home-service-icon"><i className="fas fa-mosque"></i></span>
            <span className="home-service-title">বড় মসজিদের লোকেশন</span>
            <span className="home-service-desc">জুমা ও ঈদগাহ মসজিদ</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/best-offers')}
            className="home-service-card home-service-card--offers"
          >
            <span className="home-service-icon"><i className="fas fa-tags"></i></span>
            <span className="home-service-title">Best Offers</span>
            <span className="home-service-desc">গ্রোসারি, ফুড, রেস্টুরেন্ট</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/institutions')}
            className="home-service-card home-service-card--institutions"
          >
            <span className="home-service-icon"><i className="fas fa-graduation-cap"></i></span>
            <span className="home-service-title">বড় শিক্ষা প্রতিষ্ঠান</span>
            <span className="home-service-desc">স্কুল, কলেজ, মাদ্রাসা ইত্যাদি</span>
            <span className="home-service-cta">দেখুন <i className="fas fa-arrow-right"></i></span>
          </button>
        </div>
      </section>

    

      {selectedUnion && (
        <div className="details-panel">
          <button 
            className="close-btn"
            onClick={() => setSelectedUnion(null)}
          >
            ✕
          </button>
          
          <div 
            className="details-header"
            style={{ backgroundColor: selectedUnion.color }}
          >
            <h2>{selectedUnion.bengaliName}</h2>
            <p>{selectedUnion.name}</p>
          </div>

          <div className="details-content">
            <div className="detail-row">
              <span className="detail-label">জনসংখ্যা (Population):</span>
              <span className="detail-value">{selectedUnion.population}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">ভোটার সংখ্যা (Voters):</span>
              <span className="detail-value">{selectedUnion.voters}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">গ্রাম সংখ্যা (Villages):</span>
              <span className="detail-value">{selectedUnion.villages}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">এলাকা (Area):</span>
              <span className="detail-value">{selectedUnion.area} বর্গ কিমি</span>
            </div>
          </div>
        </div>
      )}

      {selectedUnion && (
        <div 
          className="overlay"
          onClick={() => setSelectedUnion(null)}
        ></div>
      )}
    </div>
  );
};

export default InteractiveUnionMap;
