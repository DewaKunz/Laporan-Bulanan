/**
 * Cute Lightweight SVG Chart Generator for Dewa & Ayu Dashboard
 * Pastel, adorable, 100% offline & fast!
 */

const Charts = {
  // Generate Cute SVG Donut Chart
  renderDonutChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = Object.values(data).reduce((acc, val) => acc + val, 0);
    if (total === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 700;">
          🌸 Belum ada catatan pengeluaran di bulan ini~
        </div>`;
      return;
    }

    const size = options.size || 220;
    const strokeWidth = options.strokeWidth || 32;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    // Cute pastel candy colors
    const colors = [
      '#f43f5e', '#38bdf8', '#a855f7', '#10b981', 
      '#f59e0b', '#fb7185', '#6366f1', '#ec4899'
    ];

    let currentAngle = 0;
    let paths = '';
    let legend = '';

    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

    entries.forEach(([label, value], index) => {
      const percentage = (value / total);
      const strokeDasharray = `${percentage * circumference} ${circumference}`;
      const strokeDashoffset = -currentAngle * circumference;
      const color = colors[index % colors.length];

      paths += `
        <circle 
          cx="${center}" 
          cy="${center}" 
          r="${radius}" 
          fill="transparent" 
          stroke="${color}" 
          stroke-width="${strokeWidth}" 
          stroke-dasharray="${strokeDasharray}" 
          stroke-dashoffset="${strokeDashoffset}"
          style="transition: stroke-dasharray 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"
        >
          <title>${label}: ${window.formatRupiah(value)} (${(percentage * 100).toFixed(1)}%)</title>
        </circle>
      `;

      legend += `
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.825rem; font-weight: 700; margin-bottom: 0.45rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${color}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></span>
            <span>${label}</span>
          </div>
          <span style="font-weight: 800; color: var(--text-main);">${window.formatRupiah(value)}</span>
        </div>
      `;

      currentAngle += percentage;
    });

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1.25rem;">
        <div style="position: relative; width: ${size}px; height: ${size}px;">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
            ${paths}
          </svg>
          <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center;">
            <span style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.05em;">TOTAL BELANJA</span>
            <span style="font-size: 1.05rem; font-weight: 900; color: var(--text-main);">${window.formatRupiah(total)}</span>
          </div>
        </div>
        <div style="width: 100%; max-width: 320px; background: var(--bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1.5px solid var(--border-color);">
          ${legend}
        </div>
      </div>
    `;
  },

  // Generate Cute SVG Comparison Bar (🐻 Dewa vs 🐰 Ayu)
  renderComparisonBar(containerId, valDewa, valAyu) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = valDewa + valAyu;
    const dewaPct = total > 0 ? ((valDewa / total) * 100).toFixed(1) : 50;
    const ayuPct = total > 0 ? ((valAyu / total) * 100).toFixed(1) : 50;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 800;">
          <span style="color: var(--color-dewa); display: flex; align-items: center; gap: 0.35rem;">
            🐻 Dewa: ${window.formatRupiah(valDewa)} (${dewaPct}%)
          </span>
          <span style="color: var(--color-ayu); display: flex; align-items: center; gap: 0.35rem;">
            🐰 Ayu: ${window.formatRupiah(valAyu)} (${ayuPct}%)
          </span>
        </div>
        <div style="height: 22px; width: 100%; border-radius: var(--radius-full); overflow: hidden; display: flex; background: var(--bg-subtle); border: 1.5px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <div style="width: ${dewaPct}%; background: linear-gradient(90deg, #38bdf8, #2563eb); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" title="Dewa: ${dewaPct}%"></div>
          <div style="width: ${ayuPct}%; background: linear-gradient(90deg, #fb7185, #f43f5e); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" title="Ayu: ${ayuPct}%"></div>
        </div>
        <div style="text-align: center; font-size: 0.825rem; font-weight: 700; color: var(--text-muted);">
          Total Sinergi Rezeki Kita: <strong style="color: var(--text-main); font-weight: 900;">${window.formatRupiah(total)}</strong> 🍯
        </div>
      </div>
    `;
  }
};

window.Charts = Charts;
