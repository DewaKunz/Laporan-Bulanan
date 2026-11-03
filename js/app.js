/**
 * Main Application Logic for Dewa & Ayu Sweet Space Dashboard
 * Cute, pastel, bubbly, with rotating sweet quotes & Vercel ready!
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const monthSelect = document.getElementById('month-select');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const loveBannerText = document.getElementById('love-banner-text');

  let calendarInstance = null;
  let activeTab = 'tab-overview';
  let currentSavingsFilter = 'all';

  // Cute Rotating Love Quotes
  const cuteQuotes = [
    "🍓 Semangat terus tim Dewa & Ayu! Masa depan indah sedang kita bangun bersama selangkah demi selangkah~ ✨",
    "🐻 Dewa & 🐰 Ayu selalu kompak, saling dukung, dan saling melengkapi selamanya! 💖",
    "🍯 Jangan lupa tersenyum hari ini dan luangkan waktu deep talk manis nanti malam ya~ 🌷",
    "💍 Setiap rupiah yang kita tabung di celengan ini adalah langkah menuju hari bahagia kita! 🎀",
    "🌸 Bersyukur banget punya kamu yang selalu perhatian dan berjuang bersama setiap hari! 💕",
    "🧁 Apapun tantangannya hari ini, kita berdua pasti bisa lewati bareng-bareng! Semangat sayang! ✨"
  ];
  let quoteIndex = 0;

  if (loveBannerText) {
    loveBannerText.style.cursor = 'pointer';
    loveBannerText.title = 'Klik untuk melihat pesan manis lainnya! 💌';
    loveBannerText.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % cuteQuotes.length;
      loveBannerText.innerHTML = `<span>🍓</span> <span>${cuteQuotes[quoteIndex]}</span> <span>✨</span>`;
      showToast('Pesan cinta baru dibuka! 💌', '💖');
    });
  }

  // 1. Initialize Month Selector Options
  function initMonthSelector() {
    monthSelect.innerHTML = '';
    const options = [
      { key: '2026-10', label: 'Oktober 2026' },
      { key: '2026-11', label: 'November 2026 (Sekarang)' },
      { key: '2026-12', label: 'Desember 2026' },
      { key: '2027-01', label: 'Januari 2027' },
      { key: '2027-02', label: 'Februari 2027' },
      { key: '2027-03', label: 'Maret 2027' },
      { key: '2027-04', label: 'April 2027' }
    ];

    options.forEach(opt => {
      const el = document.createElement('option');
      el.value = opt.key;
      el.textContent = opt.label;
      if (opt.key === window.appState.getCurrentMonthKey()) {
        el.selected = true;
      }
      monthSelect.appendChild(el);
    });

    monthSelect.addEventListener('change', (e) => {
      window.appState.setCurrentMonthKey(e.target.value);
      showToast(`Bulan diganti ke ${e.target.options[e.target.selectedIndex].text} 🗓️`, '🌸');
      renderAll();
    });
  }

  // 2. Initialize Theme (Cute Strawberry Light / Dreamy Midnight Dark)
  function initTheme() {
    const savedTheme = localStorage.getItem('dewa_ayu_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('dewa_ayu_theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(nextTheme === 'dark' ? 'Tema Malam Bintang Diaktifkan 🌙✨' : 'Tema Strawberry Diaktifkan 🍓🌸', '🎨');
    });
  }

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // 3. Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      activeTab = targetId;
      document.getElementById(targetId).classList.add('active');

      if (targetId === 'tab-jadwal' && calendarInstance) {
        calendarInstance.render();
      }
    });
  });

  // 4. Toast Notifications
  function showToast(message, icon = '✨') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3800);
  }

  // 5. Render Overview Tab
  function renderOverview() {
    const fin = window.appState.getFinancialSummary();
    const month = window.appState.getMonthData();
    const todos = month.todos || [];
    const schedules = month.schedules || [];
    const habits = month.habits || [];

    // KPI 1: Total Pemasukan
    document.getElementById('overview-total-income').textContent = window.formatRupiah(fin.totalIncome);
    document.getElementById('overview-dewa-share').textContent = `🐻 Dewa: ${window.formatRupiah(fin.incomeDewa)} (${fin.dewaShare}%)`;
    document.getElementById('overview-ayu-share').textContent = `🐰 Ayu: ${window.formatRupiah(fin.incomeAyu)} (${fin.ayuShare}%)`;

    // KPI 2: Total Pengeluaran & Sisa
    document.getElementById('overview-total-expense').textContent = window.formatRupiah(fin.totalExpense);
    document.getElementById('overview-net-savings').textContent = `Sisa Celengan: ${window.formatRupiah(fin.netSavings)} (${fin.savingsRate}%)`;

    // KPI 3: To-Do Progress
    const doneTodos = todos.filter(t => t.status === 'done').length;
    const todoPct = todos.length > 0 ? Math.round((doneTodos / todos.length) * 100) : 0;
    document.getElementById('overview-todo-stat').textContent = `${doneTodos} / ${todos.length} Misi Selesai`;
    document.getElementById('overview-todo-pct').textContent = `${todoPct}% Berhasil ✨`;
    document.getElementById('overview-todo-progress-bar').style.width = `${todoPct}%`;

    // KPI 4: Habit Streak
    let totalChecks = 0;
    let checkedCount = 0;
    habits.forEach(h => {
      if (h.checks) {
        for (let d = 1; d <= 8; d++) {
          totalChecks++;
          if (h.checks[d]) checkedCount++;
        }
      }
    });
    const habitAdherence = totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0;
    document.getElementById('overview-habit-stat').textContent = `${habitAdherence}% Disiplin`;
    document.getElementById('overview-habit-detail').textContent = `${habits.length} Kebiasaan Kompak 🌷`;

    // Render Charts
    window.Charts.renderComparisonBar('overview-income-chart', fin.incomeDewa, fin.incomeAyu);
    window.Charts.renderDonutChart('overview-expense-chart', fin.expenseByCategory);

    // Render Upcoming Schedules
    const upcomingContainer = document.getElementById('overview-upcoming-schedules');
    upcomingContainer.innerHTML = '';
    const sortedSchedules = [...schedules].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    if (sortedSchedules.length === 0) {
      upcomingContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; font-weight: 700;">Belum ada jadwal kencan bulan ini~ Yuk rencanakan! 🌸</p>`;
    } else {
      sortedSchedules.slice(0, 4).forEach(item => {
        let badgeColor = 'badge-bareng';
        let badgeText = '🐾 Bareng';
        if (item.person === 'dewa') {
          badgeColor = 'badge-dewa';
          badgeText = '🐻 Dewa';
        } else if (item.person === 'ayu') {
          badgeColor = 'badge-ayu';
          badgeText = '🐰 Ayu';
        }

        const div = document.createElement('div');
        div.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1.5px dashed var(--border-color);';
        div.innerHTML = `
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${item.title}</div>
            <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">
              📍 ${item.location || 'Tempat santai'} • ⏰ ${item.time || 'Waktu fleksibel'}
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge-persona ${badgeColor}">${badgeText}</span>
            <div style="font-size: 0.775rem; font-weight: 700; color: var(--text-muted); margin-top: 3px;">${item.date}</div>
          </div>
        `;
        upcomingContainer.appendChild(div);
      });
    }

    // Render Goals Preview
    renderSavingsGoals('overview-goals-list', false);
  }

  // 6. Render Keuangan Tab
  function renderFinance() {
    const fin = window.appState.getFinancialSummary();
    const month = window.appState.getMonthData();

    // Summary Header
    document.getElementById('fin-total-income').textContent = window.formatRupiah(fin.totalIncome);
    document.getElementById('fin-total-expense').textContent = window.formatRupiah(fin.totalExpense);
    document.getElementById('fin-net-savings').textContent = window.formatRupiah(fin.netSavings);
    document.getElementById('fin-savings-rate').textContent = `${fin.savingsRate}% dari Rezeki`;

    // Incomes Dewa
    const dewaIncomeTbody = document.getElementById('tbody-income-dewa');
    dewaIncomeTbody.innerHTML = '';
    const dewaIncomes = (month.incomes || []).filter(i => i.person === 'dewa');
    if (dewaIncomes.length === 0) {
      dewaIncomeTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-weight:600;">Belum ada catatan rezeki Dewa</td></tr>`;
    } else {
      dewaIncomes.forEach(inc => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${inc.source}</strong><br><small style="color:var(--text-muted);">${inc.notes || '-'}</small></td>
          <td><span class="badge-tag">${inc.date || '-'}</span></td>
          <td style="font-weight: 800; color: var(--color-dewa);">${window.formatRupiah(inc.amount)}</td>
          <td style="text-align: right;">
            <button class="btn btn-secondary btn-sm delete-inc-btn" data-id="${inc.id}">🗑️</button>
          </td>
        `;
        dewaIncomeTbody.appendChild(tr);
      });
    }

    // Incomes Ayu
    const ayuIncomeTbody = document.getElementById('tbody-income-ayu');
    ayuIncomeTbody.innerHTML = '';
    const ayuIncomes = (month.incomes || []).filter(i => i.person === 'ayu');
    if (ayuIncomes.length === 0) {
      ayuIncomeTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-weight:600;">Belum ada catatan rezeki Ayu</td></tr>`;
    } else {
      ayuIncomes.forEach(inc => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${inc.source}</strong><br><small style="color:var(--text-muted);">${inc.notes || '-'}</small></td>
          <td><span class="badge-tag">${inc.date || '-'}</span></td>
          <td style="font-weight: 800; color: var(--color-ayu);">${window.formatRupiah(inc.amount)}</td>
          <td style="text-align: right;">
            <button class="btn btn-secondary btn-sm delete-inc-btn" data-id="${inc.id}">🗑️</button>
          </td>
        `;
        ayuIncomeTbody.appendChild(tr);
      });
    }

    // Expenses Table
    const expenseTbody = document.getElementById('tbody-expenses');
    expenseTbody.innerHTML = '';
    const expenses = month.expenses || [];
    if (expenses.length === 0) {
      expenseTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); font-weight:600;">Belum ada catatan belanja bulan ini~</td></tr>`;
    } else {
      expenses.forEach(exp => {
        let paidBadge = '<span class="badge-persona badge-bareng">🐾 Bareng</span>';
        if (exp.paidBy === 'dewa') paidBadge = '<span class="badge-persona badge-dewa">🐻 Dewa</span>';
        else if (exp.paidBy === 'ayu') paidBadge = '<span class="badge-persona badge-ayu">🐰 Ayu</span>';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${exp.title}</strong><br><small style="color:var(--text-muted);">${exp.notes || '-'}</small></td>
          <td><span class="badge-tag">${exp.category}</span></td>
          <td><span class="badge-tag">${exp.date || '-'}</span></td>
          <td>${paidBadge}</td>
          <td style="font-weight: 800; color: var(--color-danger);">${window.formatRupiah(exp.amount)}</td>
          <td style="text-align: right;">
            <button class="btn btn-secondary btn-sm delete-exp-btn" data-id="${exp.id}">🗑️</button>
          </td>
        `;
        expenseTbody.appendChild(tr);
      });
    }

    // Render Savings Goals with breakdown stats
    renderSavingsGoals('finance-savings-list', true);

    // Delete handlers
    document.querySelectorAll('.delete-inc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus item rezeki ini?')) {
          window.appState.deleteIncome(id);
          showToast('Catatan rezeki dihapus 🗑️', '🌸');
          renderAll();
        }
      });
    });

    document.querySelectorAll('.delete-exp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus item belanja ini?')) {
          window.appState.deleteExpense(id);
          showToast('Catatan belanja dihapus 🗑️', '🌸');
          renderAll();
        }
      });
    });
  }

  // Render Savings Goals (Cute Tabungan Per Orang)
  function renderSavingsGoals(containerId, allowActions = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const summary = window.appState.getSavingsSummary();

    if (allowActions) {
      const summaryBanner = document.createElement('div');
      summaryBanner.style.cssText = 'background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 0.95rem 1.25rem; margin-bottom: 1.15rem; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 0.75rem; text-align: center; border: 2px dashed var(--border-color); box-shadow: var(--shadow-sm);';
      summaryBanner.innerHTML = `
        <div>
          <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 800;">CELENGAN BERSAMA 💜</div>
          <div style="font-size: 1.05rem; font-weight: 900; color: #9333ea;">${window.formatRupiah(summary.barengCollected)}</div>
        </div>
        <div>
          <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 800;">TABUNGAN DEWA 💙</div>
          <div style="font-size: 1.05rem; font-weight: 900; color: var(--color-dewa);">${window.formatRupiah(summary.dewaCollected)}</div>
        </div>
        <div>
          <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 800;">TABUNGAN AYU 💖</div>
          <div style="font-size: 1.05rem; font-weight: 900; color: var(--color-ayu);">${window.formatRupiah(summary.ayuCollected)}</div>
        </div>
        <div>
          <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 800;">TOTAL AKUMULASI ✨</div>
          <div style="font-size: 1.05rem; font-weight: 900; color: #10b981;">${window.formatRupiah(summary.totalCollected)}</div>
        </div>
      `;
      container.appendChild(summaryBanner);

      const filterPills = document.createElement('div');
      filterPills.style.cssText = 'display: flex; gap: 0.45rem; margin-bottom: 1rem; flex-wrap: wrap;';
      filterPills.innerHTML = `
        <button class="btn btn-sm savings-filter-btn ${currentSavingsFilter === 'all' ? 'active btn-primary' : 'btn-secondary'}" data-filter="all">Semua Celengan 🍯</button>
        <button class="btn btn-sm savings-filter-btn ${currentSavingsFilter === 'bareng' ? 'active btn-primary' : 'btn-secondary'}" data-filter="bareng">🐾 Bersama</button>
        <button class="btn btn-sm savings-filter-btn ${currentSavingsFilter === 'dewa' ? 'active btn-primary' : 'btn-secondary'}" data-filter="dewa">🐻 Dewa</button>
        <button class="btn btn-sm savings-filter-btn ${currentSavingsFilter === 'ayu' ? 'active btn-primary' : 'btn-secondary'}" data-filter="ayu">🐰 Ayu</button>
      `;
      container.appendChild(filterPills);

      filterPills.querySelectorAll('.savings-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          currentSavingsFilter = e.currentTarget.getAttribute('data-filter');
          renderSavingsGoals(containerId, allowActions);
        });
      });
    }

    const goals = window.appState.getSavingsGoals(allowActions ? currentSavingsFilter : 'all');
    if (goals.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.style.cssText = 'color: var(--text-muted); font-size: 0.9rem; font-weight: 700; text-align: center; padding: 1.5rem;';
      emptyMsg.textContent = '🌸 Belum ada celengan impian pada kategori ini~';
      container.appendChild(emptyMsg);
      return;
    }

    goals.forEach(goal => {
      const pct = goal.target > 0 ? Math.min(100, Math.round((goal.collected / goal.target) * 100)) : 0;
      const owner = goal.owner || 'bareng';

      let ownerBadge = '<span class="badge-persona badge-bareng" style="font-size:0.75rem;">🐾 Bersama</span>';
      let fillClass = 'fill-bareng';
      let accentColor = '#9333ea';

      if (owner === 'dewa') {
        ownerBadge = '<span class="badge-persona badge-dewa" style="font-size:0.75rem;">🐻 Dewa</span>';
        fillClass = 'fill-dewa';
        accentColor = 'var(--color-dewa)';
      } else if (owner === 'ayu') {
        ownerBadge = '<span class="badge-persona badge-ayu" style="font-size:0.75rem;">🐰 Ayu</span>';
        fillClass = 'fill-ayu';
        accentColor = 'var(--color-ayu)';
      }

      const card = document.createElement('div');
      card.className = 'savings-goal-card';
      
      let actionButtons = '';
      if (allowActions) {
        actionButtons = `
          <div style="display: flex; gap: 0.45rem; margin-top: 0.75rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm add-fund-btn" data-id="${goal.id}" data-amount="500000">+ Rp 500rb 🍯</button>
            <button class="btn btn-secondary btn-sm add-fund-btn" data-id="${goal.id}" data-amount="1000000">+ Rp 1 Jt ✨</button>
            <button class="btn btn-secondary btn-sm custom-fund-btn" data-id="${goal.id}">+ Nominal Lain</button>
            <button class="btn btn-secondary btn-sm delete-goal-btn" data-id="${goal.id}" style="margin-left:auto;">🗑️</button>
          </div>
        `;
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <strong style="font-size: 1rem; font-weight: 800; color: var(--text-main);">${goal.title}</strong>
            ${ownerBadge}
          </div>
          <span style="font-weight: 900; color: ${accentColor}; font-size: 0.95rem;">${pct}%</span>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-bar-fill ${fillClass}" style="width: ${pct}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-top: 0.45rem;">
          <span>Terkumpul: <strong style="color:var(--text-main); font-weight: 800;">${window.formatRupiah(goal.collected)}</strong></span>
          <span>Target: <strong>${window.formatRupiah(goal.target)}</strong></span>
        </div>
        ${actionButtons}
      `;
      container.appendChild(card);
    });

    if (allowActions) {
      container.querySelectorAll('.add-fund-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const amt = Number(e.currentTarget.getAttribute('data-amount'));
          window.appState.updateSavingsGoal(id, amt);
          showToast(`Celengan bertambah ${window.formatRupiah(amt)}! Makin dekat impian 🍯✨`, '🎉');
          renderAll();
        });
      });

      container.querySelectorAll('.custom-fund-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const input = prompt('Masukkan nominal tambahan tabungan (contoh: 2000000):');
          if (input && !isNaN(input)) {
            const amt = Number(input);
            window.appState.updateSavingsGoal(id, amt);
            showToast(`Celengan bertambah ${window.formatRupiah(amt)}! Hore~ 🍯`, '💖');
            renderAll();
          }
        });
      });

      container.querySelectorAll('.delete-goal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          if (confirm('Hapus target celengan ini?')) {
            window.appState.deleteSavingsGoal(id);
            showToast('Target celengan dihapus', '🗑️');
            renderAll();
          }
        });
      });
    }
  }

  // 7. Render Jadwal Tab
  function initCalendar() {
    calendarInstance = new window.CalendarView('calendar-container', {
      onDateClick: (dateStr) => {
        openModal('modal-add-schedule');
        document.getElementById('sch-date').value = dateStr;
      }
    });

    document.querySelectorAll('.cal-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cal-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-filter');
        calendarInstance.setFilter(filter);
        renderScheduleList(filter);
      });
    });
  }

  function renderScheduleList(filter = 'all') {
    const listContainer = document.getElementById('schedule-agenda-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    const schedules = window.appState.getSchedules();
    const filtered = schedules.filter(s => {
      if (filter === 'all') return true;
      return s.person === filter;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; font-weight:700; text-align:center; padding:1rem;">🌸 Belum ada agenda kencan atau jadwal kegiatan~</p>`;
      return;
    }

    filtered.forEach(sch => {
      let badge = '<span class="badge-persona badge-bareng">🐾 Bareng</span>';
      if (sch.person === 'dewa') badge = '<span class="badge-persona badge-dewa">🐻 Dewa</span>';
      else if (sch.person === 'ayu') badge = '<span class="badge-persona badge-ayu">🐰 Ayu</span>';

      const card = document.createElement('div');
      card.className = 'card';
      card.style.marginBottom = '0.85rem';
      card.style.padding = '0.95rem 1.15rem';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
          <div>
            <div style="font-weight: 800; font-size: 0.985rem; margin-bottom: 0.25rem;">${sch.title}</div>
            <div style="font-size: 0.825rem; font-weight:600; color: var(--text-muted); display:flex; gap:0.75rem; flex-wrap:wrap;">
              <span>📅 ${sch.date}</span>
              <span>⏰ ${sch.time || 'Fleksibel'}</span>
              <span>📍 ${sch.location || '-'}</span>
              <span class="badge-tag">${sch.category}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${badge}
            <button class="btn btn-secondary btn-sm delete-sch-btn" data-id="${sch.id}">🗑️</button>
          </div>
        </div>
      `;
      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('.delete-sch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus agenda jadwal ini?')) {
          window.appState.deleteSchedule(id);
          showToast('Jadwal dihapus 🗑️', '🌸');
          renderAll();
        }
      });
    });
  }

  // 8. Render To-Do List Tab
  let currentTodoFilter = 'all';
  function renderTodoList() {
    const todos = window.appState.getTodos();
    const container = document.getElementById('todo-items-list');
    container.innerHTML = '';

    const filtered = todos.filter(t => {
      if (currentTodoFilter === 'all') return true;
      if (currentTodoFilter === 'done') return t.status === 'done';
      if (currentTodoFilter === 'pending') return t.status !== 'done';
      return t.assignee === currentTodoFilter;
    });

    const doneCount = todos.filter(t => t.status === 'done').length;
    document.getElementById('todo-summary-count').textContent = `${doneCount} dari ${todos.length} misi selesai ✨`;

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem; font-weight:700;">🌸 Belum ada misi pada kategori ini~</p>`;
      return;
    }

    filtered.forEach(todo => {
      const isDone = todo.status === 'done';
      let assigneeBadge = '<span class="badge-persona badge-bareng">🐾 Bareng</span>';
      if (todo.assignee === 'dewa') assigneeBadge = '<span class="badge-persona badge-dewa">🐻 Dewa</span>';
      else if (todo.assignee === 'ayu') assigneeBadge = '<span class="badge-persona badge-ayu">🐰 Ayu</span>';

      const priorityBadge = `<span class="badge-tag badge-priority-${todo.priority || 'sedang'}">Prioritas: ${todo.priority || 'sedang'}</span>`;

      const item = document.createElement('div');
      item.className = `todo-item ${isDone ? 'completed' : ''}`;
      item.innerHTML = `
        <input type="checkbox" class="todo-checkbox toggle-todo-chk" data-id="${todo.id}" ${isDone ? 'checked' : ''}>
        <div class="todo-content">
          <div class="todo-title">${todo.title}</div>
          <div class="todo-details">
            ${assigneeBadge}
            ${priorityBadge}
            <span class="badge-tag">📁 ${todo.category || 'Umum'}</span>
            <span>📅 Deadline: ${todo.dueDate || 'Fleksibel'}</span>
          </div>
        </div>
        <div class="todo-actions">
          <button class="btn btn-secondary btn-sm delete-todo-btn" data-id="${todo.id}">🗑️</button>
        </div>
      `;
      container.appendChild(item);
    });

    container.querySelectorAll('.toggle-todo-chk').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const res = window.appState.toggleTodoStatus(id);
        if (res && res.status === 'done') {
          showToast(`Yeay! Misi selesai: "${res.title}" 🎉 Dewa & Ayu kompak banget! 💖`, '🎀');
        }
        renderAll();
      });
    });

    container.querySelectorAll('.delete-todo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus to-do ini?')) {
          window.appState.deleteTodo(id);
          showToast('To-do list dihapus 🗑️', '🌸');
          renderAll();
        }
      });
    });
  }

  document.querySelectorAll('.todo-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.todo-filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentTodoFilter = e.currentTarget.getAttribute('data-filter');
      renderTodoList();
    });
  });

  // 9. Render Do's & Don'ts and Shared Notes Tab
  function renderNotesAndDnd() {
    const dnd = window.appState.getDosAndDonts();
    const notes = window.appState.getNotes();

    // Render DOs
    const dosList = document.getElementById('dos-items-list');
    dosList.innerHTML = '';
    dnd.dos.forEach(item => {
      let badge = '<span class="badge-persona badge-bareng" style="font-size:0.7rem;">🐾 Bareng</span>';
      if (item.addedBy === 'dewa') badge = '<span class="badge-persona badge-dewa" style="font-size:0.7rem;">🐻 Dewa</span>';
      else if (item.addedBy === 'ayu') badge = '<span class="badge-persona badge-ayu" style="font-size:0.7rem;">🐰 Ayu</span>';

      const div = document.createElement('div');
      div.className = 'dnd-item dnd-item-do';
      div.innerHTML = `
        <span style="font-size: 1.25rem; color: #10b981; margin-top: 1px;">🎀</span>
        <div class="dnd-item-content">
          <div class="dnd-item-text">${item.text}</div>
          <div class="dnd-item-meta">
            ${badge}
            <span class="badge-tag">${item.category}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm delete-do-btn" data-id="${item.id}" style="padding: 0.2rem 0.45rem;">🗑️</button>
      `;
      dosList.appendChild(div);
    });

    // Render DONTs
    const dontsList = document.getElementById('donts-items-list');
    dontsList.innerHTML = '';
    dnd.donts.forEach(item => {
      let badge = '<span class="badge-persona badge-bareng" style="font-size:0.7rem;">🐾 Bareng</span>';
      if (item.addedBy === 'dewa') badge = '<span class="badge-persona badge-dewa" style="font-size:0.7rem;">🐻 Dewa</span>';
      else if (item.addedBy === 'ayu') badge = '<span class="badge-persona badge-ayu" style="font-size:0.7rem;">🐰 Ayu</span>';

      const div = document.createElement('div');
      div.className = 'dnd-item dnd-item-dont';
      div.innerHTML = `
        <span style="font-size: 1.25rem; color: #f43f5e; margin-top: 1px;">🚫</span>
        <div class="dnd-item-content">
          <div class="dnd-item-text">${item.text}</div>
          <div class="dnd-item-meta">
            ${badge}
            <span class="badge-tag">${item.category}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm delete-dont-btn" data-id="${item.id}" style="padding: 0.2rem 0.45rem;">🗑️</button>
      `;
      dontsList.appendChild(div);
    });

    dosList.querySelectorAll('.delete-do-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.appState.deleteDo(id);
        showToast('Resep bahagia dihapus', '🌸');
        renderNotesAndDnd();
      });
    });

    dontsList.querySelectorAll('.delete-dont-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.appState.deleteDont(id);
        showToast('Pantangan dihapus', '🌸');
        renderNotesAndDnd();
      });
    });

    // Render Shared Notes
    const notesContainer = document.getElementById('shared-notes-container');
    notesContainer.innerHTML = '';
    if (notes.length === 0) {
      notesContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; font-weight:700;">🌸 Belum ada memo bersama. Klik tombol "+ Memo Baru 🍓" untuk mulai menulis surat manis!</p>`;
    } else {
      notes.forEach(note => {
        let badge = '<span class="badge-persona badge-bareng" style="font-size:0.725rem;">🐾 Bareng</span>';
        if (note.author === 'dewa') badge = '<span class="badge-persona badge-dewa" style="font-size:0.725rem;">🐻 Dewa</span>';
        else if (note.author === 'ayu') badge = '<span class="badge-persona badge-ayu" style="font-size:0.725rem;">🐰 Ayu</span>';

        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.backgroundColor = note.color || '#fef3c7';
        card.innerHTML = `
          <div class="note-pin ${note.pinned ? 'active' : ''}" data-id="${note.id}" title="${note.pinned ? 'Lepas Pin' : 'Pin ke Atas'}">
            ${note.pinned ? '📌' : '📍'}
          </div>
          <div>
            <div class="note-title">${note.title}</div>
            <div class="note-body">${note.content}</div>
          </div>
          <div class="note-footer">
            <div style="display:flex; align-items:center; gap:0.4rem;">
              ${badge}
              <span class="badge-tag">${note.category}</span>
            </div>
            <button class="btn btn-secondary btn-sm delete-note-btn" data-id="${note.id}" style="background:rgba(255,255,255,0.85); padding:0.25rem 0.55rem;">🗑️</button>
          </div>
        `;
        notesContainer.appendChild(card);
      });
    }

    notesContainer.querySelectorAll('.note-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.appState.togglePinNote(id);
        renderNotesAndDnd();
      });
    });

    notesContainer.querySelectorAll('.delete-note-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus memo ini?')) {
          window.appState.deleteNote(id);
          showToast('Memo dihapus', '🗑️');
          renderNotesAndDnd();
        }
      });
    });
  }

  // 10. Render Progress & Evaluasi Tab
  function renderProgressTab() {
    const month = window.appState.getMonthData();
    const review = month.review || {};

    document.getElementById('rev-highlight').value = review.highlight || '';
    document.getElementById('rev-achievement').value = review.achievement || '';
    document.getElementById('rev-improvement').value = review.improvement || '';
    document.getElementById('rev-next-target').value = review.nextMonthTarget || '';
    document.getElementById('rev-notes').value = review.notes || '';

    renderStarRating(review.happinessRating || 5);
    renderHabitMatrix();
  }

  function renderStarRating(rating) {
    const starContainer = document.getElementById('star-rating-container');
    starContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const span = document.createElement('span');
      span.className = `star ${i <= rating ? 'active' : ''}`;
      span.textContent = '★';
      span.setAttribute('data-val', i);
      span.addEventListener('click', () => {
        window.appState.updateReview({ happinessRating: i });
        renderStarRating(i);
        showToast(`Tingkat kebahagiaan disimpan: ${i}/5 bintang! 💖`, '⭐');
      });
      starContainer.appendChild(span);
    }
  }

  document.getElementById('btn-save-review').addEventListener('click', () => {
    const reviewData = {
      highlight: document.getElementById('rev-highlight').value.trim(),
      achievement: document.getElementById('rev-achievement').value.trim(),
      improvement: document.getElementById('rev-improvement').value.trim(),
      nextMonthTarget: document.getElementById('rev-next-target').value.trim(),
      notes: document.getElementById('rev-notes').value.trim()
    };
    window.appState.updateReview(reviewData);
    showToast('Refleksi & surat cinta bulanan berhasil disimpan! 💖✨', '💌');
  });

  function renderHabitMatrix() {
    const matrixContainer = document.getElementById('habit-matrix-container');
    const habits = window.appState.getHabits();
    const totalDaysToShow = 14; 
    let tableHeadHtml = `<tr><th>Kebiasaan Sehat</th>`;
    for (let d = 1; d <= totalDaysToShow; d++) {
      tableHeadHtml += `<th style="width: 32px;">Tgl ${d}</th>`;
    }
    tableHeadHtml += `<th style="width: 75px;">Progress</th><th style="width: 50px;">Aksi</th></tr>`;

    let tableBodyHtml = '';
    habits.forEach(h => {
      let checksHtml = '';
      let doneDays = 0;
      for (let d = 1; d <= totalDaysToShow; d++) {
        const isChecked = h.checks && h.checks[d];
        if (isChecked) doneDays++;
        checksHtml += `
          <td>
            <input type="checkbox" class="habit-checkbox habit-chk" data-habit-id="${h.id}" data-day="${d}" ${isChecked ? 'checked' : ''}>
          </td>
        `;
      }

      const pct = Math.round((doneDays / totalDaysToShow) * 100);

      tableBodyHtml += `
        <tr>
          <td>
            <div style="font-weight: 800; font-size: 0.85rem;">${h.name}</div>
            <div style="font-size: 0.725rem; font-weight:700; color: var(--text-muted);">${h.assignee === 'bareng' ? '🐾 Bareng' : h.assignee === 'dewa' ? '🐻 Dewa' : '🐰 Ayu'}</div>
          </td>
          ${checksHtml}
          <td><strong style="color: #10b981; font-weight: 900;">${pct}%</strong></td>
          <td>
            <button class="btn btn-secondary btn-sm delete-habit-btn" data-id="${h.id}" style="padding: 0.2rem 0.4rem;">🗑️</button>
          </td>
        </tr>
      `;
    });

    matrixContainer.innerHTML = `
      <div class="habit-matrix">
        <table class="habit-table">
          <thead>${tableHeadHtml}</thead>
          <tbody>${tableBodyHtml}</tbody>
        </table>
      </div>
    `;

    matrixContainer.querySelectorAll('.habit-chk').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const habitId = e.currentTarget.getAttribute('data-habit-id');
        const day = e.currentTarget.getAttribute('data-day');
        const isDone = window.appState.toggleHabitDay(habitId, day);
        if (isDone) {
          showToast('Yeay! Satu kebiasaan sehat terlaksana hari ini~ 🌸', '✨');
        }
        renderHabitMatrix();
        renderOverview();
      });
    });

    matrixContainer.querySelectorAll('.delete-habit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Hapus kebiasaan ini?')) {
          window.appState.deleteHabit(id);
          showToast('Kebiasaan dihapus', '🌸');
          renderHabitMatrix();
          renderOverview();
        }
      });
    });
  }

  // 11. Modal Management
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal-backdrop');
      if (modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Modal: Add Income Form
  document.getElementById('form-add-income').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      person: document.getElementById('inc-person').value,
      source: document.getElementById('inc-source').value.trim(),
      amount: Number(document.getElementById('inc-amount').value),
      date: document.getElementById('inc-date').value,
      notes: document.getElementById('inc-notes').value.trim()
    };
    window.appState.addIncome(item);
    closeModal('modal-add-income');
    e.target.reset();
    showToast(`Rezeki ${window.formatRupiah(item.amount)} berhasil ditambahkan! 🍯✨`, '💵');
    renderAll();
  });

  // Modal: Add Expense Form
  document.getElementById('form-add-expense').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      title: document.getElementById('exp-title').value.trim(),
      category: document.getElementById('exp-category').value,
      paidBy: document.getElementById('exp-paidBy').value,
      amount: Number(document.getElementById('exp-amount').value),
      date: document.getElementById('exp-date').value,
      notes: document.getElementById('exp-notes').value.trim()
    };
    window.appState.addExpense(item);
    closeModal('modal-add-expense');
    e.target.reset();
    showToast(`Catatan belanja ${window.formatRupiah(item.amount)} disimpan! 🛍️`, '🍓');
    renderAll();
  });

  // Modal: Add Schedule Form
  document.getElementById('form-add-schedule').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      title: document.getElementById('sch-title').value.trim(),
      person: document.getElementById('sch-person').value,
      date: document.getElementById('sch-date').value,
      time: document.getElementById('sch-time').value,
      location: document.getElementById('sch-location').value.trim(),
      category: document.getElementById('sch-category').value
    };
    window.appState.addSchedule(item);
    closeModal('modal-add-schedule');
    e.target.reset();
    showToast('Jadwal baru berhasil diagendakan! Jangan lupa ya~ 🌸', '📅');
    renderAll();
  });

  // Modal: Add To-Do Form
  document.getElementById('form-add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      title: document.getElementById('td-title').value.trim(),
      assignee: document.getElementById('td-assignee').value,
      priority: document.getElementById('td-priority').value,
      dueDate: document.getElementById('td-dueDate').value,
      category: document.getElementById('td-category').value,
      status: 'todo'
    };
    window.appState.addTodo(item);
    closeModal('modal-add-todo');
    e.target.reset();
    showToast('Misi baru ditambahkan! Semangat berdua! 🎀', '🐰');
    renderAll();
  });

  // Modal: Add Savings Goal
  document.getElementById('form-add-goal').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      title: document.getElementById('goal-title').value.trim(),
      owner: document.getElementById('goal-owner').value,
      target: Number(document.getElementById('goal-target').value),
      collected: Number(document.getElementById('goal-collected').value) || 0,
      category: document.getElementById('goal-category').value,
      targetDate: document.getElementById('goal-targetDate').value
    };
    window.appState.addSavingsGoal(item);
    closeModal('modal-add-goal');
    e.target.reset();
    showToast('Celengan impian baru ditambahkan! 🍯✨', '🌟');
    renderAll();
  });

  // Modal: Add Habit
  document.getElementById('form-add-habit').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      name: document.getElementById('hb-name').value.trim(),
      assignee: document.getElementById('hb-assignee').value
    };
    window.appState.addHabit(item);
    closeModal('modal-add-habit');
    e.target.reset();
    showToast('Kebiasaan sehat baru ditambahkan ke tracker! 🌷', '🏃');
    renderAll();
  });

  // Modal: Add Do's
  document.getElementById('form-add-do').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('do-text').value.trim();
    const category = document.getElementById('do-category').value;
    const addedBy = document.getElementById('do-addedBy').value;
    window.appState.addDo(text, category, addedBy);
    closeModal('modal-add-do');
    e.target.reset();
    showToast('Resep bahagia baru disepakati bersama! 🌸✨', '🎀');
    renderNotesAndDnd();
  });

  // Modal: Add Don'ts
  document.getElementById('form-add-dont').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('dont-text').value.trim();
    const category = document.getElementById('dont-category').value;
    const addedBy = document.getElementById('dont-addedBy').value;
    window.appState.addDont(text, category, addedBy);
    closeModal('modal-add-dont');
    e.target.reset();
    showToast('Pantangan baru disepakati bersama! 🚫', '💕');
    renderNotesAndDnd();
  });

  // Modal: Add Shared Note
  document.getElementById('form-add-note').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('nt-title').value.trim();
    const content = document.getElementById('nt-content').value.trim();
    const category = document.getElementById('nt-category').value;
    const author = document.getElementById('nt-author').value;
    const color = document.getElementById('nt-color').value;
    window.appState.addNote(title, content, category, author, color);
    closeModal('modal-add-note');
    e.target.reset();
    showToast('Memo manis berhasil ditempel! 💌✨', '🍓');
    renderNotesAndDnd();
  });

  // 12. Mobile QR Code Access Modal (Same Wi-Fi)
  const mobileAccessBtn = document.getElementById('btn-mobile-access');
  if (mobileAccessBtn) {
    mobileAccessBtn.addEventListener('click', async () => {
      openModal('modal-mobile-access');
      const qrContainer = document.getElementById('qr-code-display');
      qrContainer.innerHTML = '<p style="color:var(--text-muted); font-weight:700;">Memeriksa koneksi jaringan...</p>';

      let targetUrl = window.location.origin;
      try {
        const res = await fetch('/api/network-info');
        if (res.ok) {
          const info = await res.json();
          if (info.mobileUrl) {
            targetUrl = info.mobileUrl;
          }
        }
      } catch (e) {
        console.warn('Network info error', e);
      }

      if (window.QRCodeGenerator) {
        qrContainer.innerHTML = window.QRCodeGenerator.renderSVG(targetUrl, 200);
      } else {
        qrContainer.innerHTML = `
          <div style="padding:1rem; text-align:center;">
            <p>Buka di HP melalui browser:</p>
            <strong style="font-size:1.1rem; color:#f43f5e;">${targetUrl}</strong>
          </div>
        `;
      }
    });
  }

  // 13. Remote Access Guide Modal
  const remoteAccessBtn = document.getElementById('btn-remote-access');
  if (remoteAccessBtn) {
    remoteAccessBtn.addEventListener('click', () => {
      openModal('modal-remote-access');
    });
  }

  // Quick Action FAB (Mobile)
  const fabBtn = document.getElementById('fab-quick-btn');
  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      openModal('modal-quick-action');
    });
  }

  // 14. Data Export / Import / Print / Reset
  document.getElementById('btn-export-data').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(window.appState.exportJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `laporan_manis_dewa_ayu_${window.appState.getCurrentMonthKey()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Data manis berhasil diekspor ke file JSON! 💾', '🌸');
  });

  document.getElementById('btn-import-trigger').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const success = window.appState.importJSON(content);
      if (success) {
        showToast('Data berhasil diimpor! Hore~ 🚀', '✨');
        renderAll();
      } else {
        alert('File JSON tidak valid atau format salah.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('btn-print-report').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-reset-data').addEventListener('click', () => {
    if (confirm('Kembalikan ke data awal bawaan Dewa & Ayu? Perubahan yang belum diekspor akan hilang.')) {
      window.appState.resetToDefault();
      showToast('Data berhasil direset ke contoh default 🌸', '✨');
      renderAll();
    }
  });

  // Global Render function
  function renderAll() {
    renderOverview();
    renderFinance();
    if (calendarInstance) {
      calendarInstance.render();
      renderScheduleList();
    }
    renderTodoList();
    renderNotesAndDnd();
    renderProgressTab();
  }

  // Listen to remote server sync updates
  window.appState.onChange(() => {
    renderAll();
  });

  // Initial Boot
  initMonthSelector();
  initTheme();
  initCalendar();
  renderAll();
});
