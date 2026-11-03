/**
 * Lightweight SVG Chart Generator for Dewa & Ayu Dashboard
 * No external dependencies needed - 100% offline & fast!
 */

const Charts = {
  // Generate SVG Donut Chart
  renderDonutChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = Object.values(data).reduce((acc, val) => acc + val, 0);
    if (total === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.875rem;">
          Belum ada data pengeluaran di bulan ini.
        </div>`;
      return;
    }

    const size = options.size || 220;
    const strokeWidth = options.strokeWidth || 32;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    const colors = [
      '#7c3aed', '#3b82f6', '#ec4899', '#10b981', 
      '#f59e0b', '#06b6d4', '#8b5cf6', '#64748b'
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
          style="transition: stroke-dasharray 0.5s ease;"
        >
          <title>${label}: ${window.formatRupiah(value)} (${(percentage * 100).toFixed(1)}%)</title>
        </circle>
      `;

      legend += `
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.4rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${color};"></span>
            <span>${label}</span>
          </div>
          <span style="font-weight: 600;">${window.formatRupiah(value)}</span>
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
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">TOTAL</span>
            <span style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">${window.formatRupiah(total)}</span>
          </div>
        </div>
        <div style="width: 100%; max-width: 300px;">
          ${legend}
        </div>
      </div>
    `;
  },

  // Generate SVG Comparison Bar (Dewa vs Ayu)
  renderComparisonBar(containerId, valDewa, valAyu) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = valDewa + valAyu;
    const dewaPct = total > 0 ? ((valDewa / total) * 100).toFixed(1) : 50;
    const ayuPct = total > 0 ? ((valAyu / total) * 100).toFixed(1) : 50;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 600;">
          <span style="color: var(--color-dewa); display: flex; align-items: center; gap: 0.35rem;">
            👨 Dewa: ${window.formatRupiah(valDewa)} (${dewaPct}%)
          </span>
          <span style="color: var(--color-ayu); display: flex; align-items: center; gap: 0.35rem;">
            👩 Ayu: ${window.formatRupiah(valAyu)} (${ayuPct}%)
          </span>
        </div>
        <div style="height: 18px; width: 100%; border-radius: var(--radius-full); overflow: hidden; display: flex; background: var(--bg-subtle);">
          <div style="width: ${dewaPct}%; background: linear-gradient(90deg, #2563eb, #60a5fa); transition: width 0.5s ease;" title="Dewa: ${dewaPct}%"></div>
          <div style="width: ${ayuPct}%; background: linear-gradient(90deg, #fb7185, #e11d48); transition: width 0.5s ease;" title="Ayu: ${ayuPct}%"></div>
        </div>
        <div style="text-align: center; font-size: 0.775rem; color: var(--text-muted);">
          Total Sinergi Pemasukan: <strong>${window.formatRupiah(total)}</strong>
        </div>
      </div>
    `;
  }
};

window.Charts = Charts;

