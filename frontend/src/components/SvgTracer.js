import React, { useRef, useState } from 'react';
import '../styles/InteractiveUnionMap.css';

const defaultUnions = [
  'Dhankhola','Bailor','Kanthal','Kanihary','Rampur','Trishal','Harirampur','Sakhua','Balipara','Mothbari','Mokspur','Amirabari'
];

function download(filename, content) {
  const blob = new Blob([content], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const SvgTracer = ({ referenceSrc }) => {
  const svgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(referenceSrc || null);
  const [currentUnionIndex, setCurrentUnionIndex] = useState(0);
  const [polygons, setPolygons] = useState(() => defaultUnions.map(() => null));
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
  };

  const startDrawing = () => {
    setPoints([]);
    setDrawing(true);
  };

  const finishDrawing = () => {
    if (points.length < 3) return;
    const newPolygons = [...polygons];
    newPolygons[currentUnionIndex] = points.slice();
    setPolygons(newPolygons);
    setPoints([]);
    setDrawing(false);
  };

  const svgClick = (e) => {
    if (!drawing) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPoints(p => [...p, [cursorpt.x, cursorpt.y]]);
  };

  const undoPoint = () => setPoints(p => p.slice(0, -1));

  const clearUnion = () => {
    const newPolygons = [...polygons];
    newPolygons[currentUnionIndex] = null;
    setPolygons(newPolygons);
  };

  const exportSvg = () => {
    // build an SVG string with same viewBox as the displayed svg
    const svg = svgRef.current;
    if (!svg) return;
    const vb = svg.getAttribute('viewBox') || `0 0 ${svg.clientWidth} ${svg.clientHeight}`;
    const w = svg.clientWidth;
    const h = svg.clientHeight;

    let inner = '';
    if (imageUrl) {
      inner += `<image href="${imageUrl}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" />\n`;
    }

    polygons.forEach((poly, idx) => {
      if (!poly) return;
      const d = poly.map(p => p.join(' ')).join(' L ');
      const id = `union-${idx+1}`;
      inner += `<path id="${id}" d="M ${d} Z" fill="none" stroke="black" stroke-width="2" />\n`;
    });

    const out = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${vb}' width='${w}' height='${h}'>\n${inner}</svg>`;
    download('trishal_new.svg', out);
  };

  return (
    <div className="interactive-container">
      <h2 className="title">SVG Tracer</h2>
      <div style={{display:'flex', gap:20, alignItems:'flex-start'}}>
        <div style={{width:300}}>
          <label className="subtitle">Reference image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFile} />

          <label className="subtitle" style={{marginTop:12}}>Select union</label>
          <select value={currentUnionIndex} onChange={e => setCurrentUnionIndex(Number(e.target.value))} style={{width:'100%'}}>
            {defaultUnions.map((u, i) => <option value={i} key={i}>{i+1}. {u}</option>)}
          </select>

          <div style={{marginTop:12}}>
            <button className="close-btn" onClick={startDrawing} style={{marginRight:8}}>Start Drawing</button>
            <button className="close-btn" onClick={finishDrawing} style={{marginRight:8}}>Finish</button>
            <button className="close-btn" onClick={undoPoint}>Undo</button>
          </div>

          <div style={{marginTop:12}}>
            <button className="close-btn" onClick={clearUnion} style={{marginRight:8}}>Clear Union</button>
            <button className="close-btn" onClick={exportSvg}>Export SVG</button>
          </div>

          <div style={{marginTop:12}}>
            <p>Instructions:</p>
            <ol>
              <li>Upload reference image or use existing.</li>
              <li>Select a union, click "Start Drawing" and click on canvas to add points.</li>
              <li>Click "Finish" to save polygon for that union.</li>
              <li>Export SVG and save as <strong>public/trishal_new.svg</strong> or use the downloaded file.</li>
            </ol>
          </div>
        </div>

        <div style={{flex:1}}>
          <div style={{borderRadius:12, overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}>
            <svg ref={svgRef} onClick={svgClick} viewBox={`0 0 960 826`} style={{width:'100%', height:600}}>
              {imageUrl && <image href={imageUrl} x="0" y="0" width="960" height="826" preserveAspectRatio="xMidYMid meet" />}

              {polygons.map((poly, idx) => (
                poly ? (
                  <path key={idx} d={`M ${poly.map(p=>p.join(' ')).join(' L ')} Z`} fill="rgba(0,0,0,0.15)" stroke="#333" strokeWidth={2} />
                ) : null
              ))}

              {points.length>0 && (
                <>
                  <polyline points={points.map(p=>p.join(',')).join(' ')} fill="none" stroke="#ff0" strokeWidth={2} />
                  {points.map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r={4} fill="#ff0" />))}
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SvgTracer;
