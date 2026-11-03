/**
 * Interactive Calendar & Agenda Module for Dewa & Ayu Dashboard
 */

class CalendarView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentDate = new Date();
    this.selectedPerson = 'all'; // 'all', 'dewa', 'ayu', 'bareng'
    this.onDateClick = options.onDateClick || null;
  }

  setDate(year, month) {
    this.currentDate = new Date(year, month, 1);
    this.render();
  }

  setFilter(person) {
    this.selectedPerson = person;
    this.render();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.render();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.render();
  }

  render() {
    if (!this.container) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Total days in previous month
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Get current month key format YYYY-MM
    const currentMonthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const schedules = window.appState.getSchedules(currentMonthKey) || [];

    // Filter schedules
    const filteredSchedules = schedules.filter(item => {
      if (this.selectedPerson === 'all') return true;
      return item.person === this.selectedPerson;
    });

    // Map schedules by date string YYYY-MM-DD
    const scheduleByDate = {};
    filteredSchedules.forEach(item => {
      if (!scheduleByDate[item.date]) {
        scheduleByDate[item.date] = [];
      }
      scheduleByDate[item.date].push(item);
    });

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Header with controls
    let html = `
      <div class="calendar-wrapper">
        <div class="calendar-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">
              📅 ${monthNames[month]} ${year}
            </h3>
            <span class="badge-tag" style="background: var(--bg-subtle);">
              ${filteredSchedules.length} Jadwal
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" id="cal-prev-btn" title="Bulan Sebelumnya">◀</button>
            <button class="btn btn-secondary btn-sm" id="cal-today-btn">Hari Ini</button>
            <button class="btn btn-secondary btn-sm" id="cal-next-btn" title="Bulan Berikutnya">▶</button>
          </div>
        </div>

        <div class="calendar-grid">
    `;

    // Render Day Name Headers
    dayNames.forEach(d => {
      html += `<div class="calendar-day-header">${d}</div>`;
    });

    // Previous month cells
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      html += `
        <div class="calendar-cell other-month">
          <div class="calendar-day-number">${dayNum}</div>
        </div>
      `;
    }

    // Current month cells
    for (let day = 1; day <= totalDays; day++) {
      const dayFormatted = String(day).padStart(2, '0');
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${dayFormatted}`;
      const isToday = dateStr === todayStr;
      const dayEvents = scheduleByDate[dateStr] || [];

      let eventsHtml = '';
      dayEvents.slice(0, 2).forEach(ev => {
        let badgeClass = 'event-bareng';
        let prefix = '💜';
        if (ev.person === 'dewa') {
          badgeClass = 'event-dewa';
          prefix = '💙';
        } else if (ev.person === 'ayu') {
          badgeClass = 'event-ayu';
          prefix = '💖';
        }
        const timeStr = ev.time ? `${ev.time.substring(0, 5)} ` : '';
        eventsHtml += `
          <div class="calendar-event-pill ${badgeClass}" title="${timeStr}${ev.title}">
            ${prefix} ${timeStr}${ev.title}
          </div>
        `;
      });

      if (dayEvents.length > 2) {
        eventsHtml += `
          <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 800; padding-left: 2px;">
            +${dayEvents.length - 2} lagi
          </div>
        `;
      }

      html += `
        <div class="calendar-cell ${isToday ? 'today' : ''}" data-date="${dateStr}">
          <div class="calendar-day-number">${day}</div>
          ${eventsHtml}
        </div>
      `;
    }

    // Remaining slots to complete 6 rows (42 slots total) or standard grid
    const totalRendered = firstDayIndex + totalDays;
    const nextDaysNeeded = (7 - (totalRendered % 7)) % 7;
    for (let j = 1; j <= nextDaysNeeded; j++) {
      html += `
        <div class="calendar-cell other-month">
          <div class="calendar-day-number">${j}</div>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Attach listeners
    this.container.querySelector('#cal-prev-btn').addEventListener('click', () => this.prevMonth());
    this.container.querySelector('#cal-next-btn').addEventListener('click', () => this.nextMonth());
    this.container.querySelector('#cal-today-btn').addEventListener('click', () => {
      this.currentDate = new Date();
      this.render();
    });

    // Date clicks
    this.container.querySelectorAll('.calendar-cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        const clickedDate = cell.getAttribute('data-date');
        if (this.onDateClick) {
          this.onDateClick(clickedDate);
        }
      });
    });
  }
}

window.CalendarView = CalendarView;

