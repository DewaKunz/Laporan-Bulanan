/**
 * Enhanced State Management with Multi-Device Server Sync (Laptop & HP),
 * Tabungan Per Orang (Dewa, Ayu & Bersama), Do's & Don'ts Agreement, Shared Notes,
 * and Instant Zero-Delay Realtime Broadcast!
 */

const STORAGE_KEY = 'dewa_ayu_dashboard_data_v4';

// Default initial state
const defaultData = {
  currentMonth: '2026-11',
  profiles: {
    dewa: { name: 'Dewa', role: 'Partner & Tech Enthusiast', color: '#0284c7' },
    ayu: { name: 'Ayu', role: 'Partner & Creative Soul', color: '#f43f5e' }
  },
  // Tabungan Bersama & Tabungan Pribadi Dewa / Ayu
  savingsGoals: [
    {
      id: 'goal-1',
      title: '💍 Dana Tabungan Nikah & Masa Depan',
      owner: 'bareng',
      target: 100000000,
      collected: 52000000,
      category: 'Masa Depan',
      targetDate: '2027-10'
    },
    {
      id: 'goal-2',
      title: '✈️ Liburan Akhir Tahun (Bali / Jepang)',
      owner: 'bareng',
      target: 25000000,
      collected: 18500000,
      category: 'Liburan',
      targetDate: '2026-12'
    },
    {
      id: 'goal-3',
      title: '🛡️ Dana Darurat Bersama (6 Bulan)',
      owner: 'bareng',
      target: 35000000,
      collected: 27000000,
      category: 'Darurat',
      targetDate: '2027-04'
    },
    // Tabungan Pribadi Dewa
    {
      id: 'goal-dewa-1',
      title: '💻 Upgrade Laptop & Peralatan Kerja Dewa',
      owner: 'dewa',
      target: 20000000,
      collected: 13500000,
      category: 'Produktivitas',
      targetDate: '2027-02'
    },
    {
      id: 'goal-dewa-2',
      title: '📈 Tabungan Saham & Reksadana Dewa',
      owner: 'dewa',
      target: 30000000,
      collected: 16000000,
      category: 'Investasi',
      targetDate: '2027-06'
    },
    // Tabungan Pribadi Ayu
    {
      id: 'goal-ayu-1',
      title: '🌸 Tabungan Logam Mulia & Emas Batangan Ayu',
      owner: 'ayu',
      target: 20000000,
      collected: 11200000,
      category: 'Investasi',
      targetDate: '2027-03'
    },
    {
      id: 'goal-ayu-2',
      title: '🎨 Modal Pengembangan Bisnis Craft & Studio Ayu',
      owner: 'ayu',
      target: 15000000,
      collected: 7500000,
      category: 'Bisnis',
      targetDate: '2027-05'
    }
  ],
  // Do's & Don'ts Kesepakatan Bersama
  dosAndDonts: {
    dos: [
      { id: 'do-1', text: 'Diskusikan bersama sebelum melakukan pengeluaran di atas Rp 500.000', category: 'Keuangan', addedBy: 'bareng', date: '2026-11-01' },
      { id: 'do-2', text: 'Catat setiap pemasukan & pengeluaran setiap malam sebelum tidur', category: 'Kedisiplinan', addedBy: 'ayu', date: '2026-11-01' },
      { id: 'do-3', text: 'Sisihkan tabungan nikah & dana darurat di awal gajian (Pay yourself first)', category: 'Tabungan', addedBy: 'dewa', date: '2026-11-01' },
      { id: 'do-4', text: 'Deep talk & waktu kencan tanpa pegang HP minimal 1x seminggu', category: 'Hubungan', addedBy: 'bareng', date: '2026-11-01' },
      { id: 'do-5', text: 'Saling mengapresiasi dan berterima kasih atas kerja keras masing-masing', category: 'Mindset', addedBy: 'bareng', date: '2026-11-01' },
      { id: 'do-6', text: 'Selalu jujur dan terbuka mengenai pengeluaran mendadak atau bantuan keluarga', category: 'Keuangan', addedBy: 'bareng', date: '2026-11-01' }
    ],
    donts: [
      { id: 'dont-1', text: 'Jangan belanja impulsif saat lapar, lelah, atau tergiur diskon kilat (tunggu 24 jam)', category: 'Belanja', addedBy: 'bareng', date: '2026-11-01' },
      { id: 'dont-2', text: 'Jangan memendam uneg-uneg, rasa kesal, atau masalah keuangan sendirian', category: 'Komunikasi', addedBy: 'ayu', date: '2026-11-01' },
      { id: 'dont-3', text: 'Jangan memakai uang tabungan darurat & impian untuk hal non-esensial / gengsi', category: 'Tabungan', addedBy: 'dewa', date: '2026-11-01' },
      { id: 'dont-4', text: 'Jangan membandingkan kondisi finansial atau hubungan kita dengan orang lain di media sosial', category: 'Mindset', addedBy: 'bareng', date: '2026-11-01' },
      { id: 'dont-5', text: 'Jangan menunda pembayaran tagihan rutin bulanan hingga mendekati jatuh tempo', category: 'Tagihan', addedBy: 'dewa', date: '2026-11-01' }
    ]
  },
  // Catatan Bersama & Wishlist
  notes: [
    {
      id: 'nt-1',
      title: '💡 Ide Kencan & Quality Time Bulan Ini',
      content: '1. Masak pasta bareng di hari Minggu sore\n2. Piknik santai di taman kota sambil baca buku\n3. Nonton film di bioskop pilihan Ayu\n4. Sunset walk di pinggir pantai / rooftop kafe',
      category: 'Kencan',
      author: 'bareng',
      color: '#fef3c7',
      pinned: true,
      updatedAt: '2026-11-01'
    },
    {
      id: 'nt-2',
      title: '🛒 Daftar Belanja & Restock Dapur',
      content: '• Minyak zaitun & butter\n• Susu oat & biji kopi arabika\n• Sabun cuci pakaian & pewangi\n• Bumbu dapur (bawang merah, putih, lada)',
      category: 'Belanja',
      author: 'ayu',
      color: '#ffe4e9',
      pinned: false,
      updatedAt: '2026-11-02'
    },
    {
      id: 'nt-3',
      title: '💍 Catatan Kriteria Vendor & Acara Impian',
      content: '• Konsep: Intimate warm wedding (150-200 pax)\n• Dominasi warna: Sage green & warm ivory\n• Utamakan vendor catering yang rasa masakannya sudah diuji\n• Dokumentasi foto & video bergaya natural candid',
      category: 'Masa Depan',
      author: 'bareng',
      color: '#e0f2fe',
      pinned: true,
      updatedAt: '2026-11-01'
    }
  ],
  months: {
    '2026-11': {
      incomes: [
        { id: 'inc-1', person: 'dewa', source: 'Gaji Kantor Utama', amount: 12500000, date: '2026-11-01', notes: 'Transfer gaji awal bulan' },
        { id: 'inc-2', person: 'dewa', source: 'Freelance UI/UX Web', amount: 3800000, date: '2026-11-10', notes: 'Project landing page klien' },
        { id: 'inc-3', person: 'ayu', source: 'Gaji Kantor Utama', amount: 11000000, date: '2026-11-01', notes: 'Gaji bulanan' },
        { id: 'inc-4', person: 'ayu', source: 'Side Business & Crafting', amount: 2600000, date: '2026-11-08', notes: 'Order hampers & souvenir' }
      ],
      expenses: [
        { id: 'exp-1', title: 'Belanja Dapur & Supermarket', category: 'Belanja', amount: 1850000, paidBy: 'bareng', date: '2026-11-02', notes: 'Bahan masakan 2 minggu' },
        { id: 'exp-2', title: 'Sewa Tempat & Listrik + WiFi', category: 'Tagihan', amount: 2400000, paidBy: 'dewa', date: '2026-11-03', notes: 'Indihome & Token listrik' },
        { id: 'exp-3', title: 'Date Night & Kuliner Weekend', category: 'Kencan', amount: 750000, paidBy: 'bareng', date: '2026-11-06', notes: 'Dinner & nonton bioskop' },
        { id: 'exp-4', title: 'Bensin & Transport Harian', category: 'Transport', amount: 550000, paidBy: 'dewa', date: '2026-11-07', notes: 'Bensin motor & tol' },
        { id: 'exp-5', title: 'Perlengkapan Skincare & Rumah', category: 'Kebutuhan', amount: 620000, paidBy: 'ayu', date: '2026-11-05', notes: 'Restock sabun, shampoo & reed diffuser' },
        { id: 'exp-6', title: 'Alokasi Tabungan Bersama', category: 'Investasi', amount: 5000000, paidBy: 'bareng', date: '2026-11-04', notes: 'Setor ke rekening tabungan bersama' }
      ],
      schedules: [
        { id: 'sch-1', title: 'Presentasi Project Akhir Tahun', person: 'dewa', date: '2026-11-04', time: '09:30', location: 'Kantor Dewa', category: 'Kerja' },
        { id: 'sch-2', title: 'Kelas Webinar Digital Marketing', person: 'ayu', date: '2026-11-05', time: '14:00', location: 'Online Zoom', category: 'Belajar' },
        { id: 'sch-3', title: 'Movie Night & Dinner Bareng', person: 'bareng', date: '2026-11-06', time: '19:00', location: 'Mall Kota Kasablanka', category: 'Kencan' },
        { id: 'sch-4', title: 'Badminton Bersama Teman', person: 'dewa', date: '2026-11-07', time: '19:30', location: 'Gor Bulutangkis', category: 'Olahraga' },
        { id: 'sch-5', title: 'Yoga & Pilates Morning', person: 'ayu', date: '2026-11-08', time: '08:00', location: 'Studio Fit', category: 'Olahraga' },
        { id: 'sch-6', title: 'Belanja Kebutuhan Mingguan', person: 'bareng', date: '2026-11-09', time: '10:30', location: 'GrandLucky', category: 'Belanja' },
        { id: 'sch-7', title: 'Makan Siang Bareng Keluarga Ayu', person: 'bareng', date: '2026-11-15', time: '12:30', location: 'Resto Sunda', category: 'Keluarga' },
        { id: 'sch-8', title: 'Deep Talk & Review Keuangan Bulanan', person: 'bareng', date: '2026-11-20', time: '20:00', location: 'Coffee Shop Favorit', category: 'Evaluasi' },
        { id: 'sch-9', title: 'Short Weekend Staycation', person: 'bareng', date: '2026-11-28', time: '11:00', location: 'Villa Asri', category: 'Liburan' }
      ],
      todos: [
        { id: 'td-1', title: 'Bandingkan paket & paket vendor dekorasi', assignee: 'bareng', priority: 'tinggi', dueDate: '2026-11-18', status: 'in_progress', category: 'Masa Depan' },
        { id: 'td-2', title: 'Bikin itinerary detail liburan akhir tahun', assignee: 'ayu', priority: 'sedang', dueDate: '2026-11-12', status: 'in_progress', category: 'Liburan' },
        { id: 'td-3', title: 'Service berkala AC kamar utama', assignee: 'dewa', priority: 'sedang', dueDate: '2026-11-04', status: 'done', category: 'Rumah' },
        { id: 'td-4', title: 'Restock bahan masakan & detergen', assignee: 'bareng', priority: 'rendah', dueDate: '2026-11-02', status: 'done', category: 'Belanja' },
        { id: 'td-5', title: 'Cek polis asuransi & perpanjangan SIM', assignee: 'dewa', priority: 'sedang', dueDate: '2026-11-22', status: 'todo', category: 'Admin' },
        { id: 'td-6', title: 'Pilih 3 rekomendasi tempat dinner anniversary', assignee: 'ayu', priority: 'tinggi', dueDate: '2026-11-16', status: 'todo', category: 'Kencan' }
      ],
      review: {
        highlight: 'Kencan santai di rooftop sambil membuat roadmap impian bersama 3 tahun ke depan.',
        achievement: 'Pemasukan gabungan bertambah dan target tabungan bulanan 30% tercapai dengan disiplin!',
        improvement: 'Kurangi jajan kopi online delivery, lebih sering bikin cold brew bareng di rumah.',
        nextMonthTarget: 'Konsisten olahraga berdua minimal 3x seminggu dan finalisasi tanggal acara.',
        happinessRating: 5,
        notes: 'Bulan ini sangat produktif, komunikasi kita makin terbuka dan saling support.'
      },
      habits: [
        { id: 'hb-1', name: '🏃‍♂️ Olahraga / Jalan Sehat (Min 30m)', assignee: 'bareng', checks: { 1: true, 2: true, 3: false, 4: true, 5: false, 6: true, 7: true, 8: true } },
        { id: 'hb-2', name: '💧 Minum Air 2L Sehari', assignee: 'bareng', checks: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        { id: 'hb-3', name: '📖 Membaca Buku / Skill Baru (15m)', assignee: 'dewa', checks: { 1: true, 2: false, 3: true, 4: true, 5: true, 6: false, 7: true, 8: true } },
        { id: 'hb-4', name: '🌸 Skincare & Me Time Teratur', assignee: 'ayu', checks: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        { id: 'hb-5', name: '💬 Deep Talk Tanpa HP (30m)', assignee: 'bareng', checks: { 1: true, 2: true, 3: false, 4: true, 5: false, 6: true, 7: false, 8: true } },
        { id: 'hb-6', name: '💰 Catat Semua Pengeluaran Hari Ini', assignee: 'bareng', checks: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }
      ]
    }
  }
};

class StateManager {
  constructor() {
    this.listeners = [];
    this.data = this.loadLocal();

    if (!this.data.dosAndDonts) this.data.dosAndDonts = JSON.parse(JSON.stringify(defaultData.dosAndDonts));
    if (!this.data.notes) this.data.notes = JSON.parse(JSON.stringify(defaultData.notes));
    if (!this.data.activityHistory) this.data.activityHistory = [];
    if (!this.data.savingsGoals || this.data.savingsGoals.length <= 3) {
      this.data.savingsGoals = JSON.parse(JSON.stringify(defaultData.savingsGoals));
    } else {
      this.data.savingsGoals.forEach(g => {
        if (!g.owner) g.owner = 'bareng';
      });
    }

    if (!this.data.months[this.data.currentMonth]) {
      this.initMonth(this.data.currentMonth);
    }
  }

  // History & Trash System (Mencatat semua aktivitas & item terhapus)
  recordHistory(actionType, itemType, title, amount = null, actor = null, itemData = null) {
    if (!this.data.activityHistory) this.data.activityHistory = [];
    const currentActor = actor || (window.authManager && window.authManager.getCurrentUserId()) || 'user';
    const actorName = currentActor === 'dewa' ? '🐻 Mas Dewa' : (currentActor === 'ayu' ? '🐰 Neng Ayu' : '🐾 Pasangan');

    const now = new Date();
    const timeFormatted = `${now.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][now.getMonth()]} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    const entry = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type: actionType, // 'delete', 'create', 'restore'
      itemType: itemType, // 'expense', 'income', 'schedule', 'todo', 'savings', 'note', 'do', 'dont', 'habit'
      title: title || 'Item',
      amount: amount ? Number(amount) : null,
      actor: currentActor,
      actorName: actorName,
      timestamp: Date.now(),
      timeFormatted: timeFormatted,
      itemData: itemData ? JSON.parse(JSON.stringify(itemData)) : null,
      monthKey: this.data.currentMonth,
      restored: false
    };

    this.data.activityHistory.unshift(entry);
    if (this.data.activityHistory.length > 100) {
      this.data.activityHistory = this.data.activityHistory.slice(0, 100);
    }
    return entry;
  }

  getHistory(filter = 'all') {
    const list = this.data.activityHistory || [];
    if (filter === 'all') return list;
    if (filter === 'delete') return list.filter(e => e.type === 'delete');
    return list.filter(e => e.itemType === filter);
  }

  restoreHistoryItem(historyId) {
    if (!this.data.activityHistory) return false;
    const entry = this.data.activityHistory.find(e => e.id === historyId);
    if (!entry || !entry.itemData) return false;

    const data = JSON.parse(JSON.stringify(entry.itemData));
    const month = this.getMonthData(entry.monthKey || this.data.currentMonth);

    if (entry.itemType === 'expense') {
      month.expenses.unshift(data);
    } else if (entry.itemType === 'income') {
      month.incomes.unshift(data);
    } else if (entry.itemType === 'schedule') {
      month.schedules.push(data);
      month.schedules.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    } else if (entry.itemType === 'todo') {
      month.todos.unshift(data);
    } else if (entry.itemType === 'savings') {
      if (!this.data.savingsGoals) this.data.savingsGoals = [];
      this.data.savingsGoals.push(data);
    } else if (entry.itemType === 'note') {
      if (!this.data.notes) this.data.notes = [];
      this.data.notes.unshift(data);
    } else if (entry.itemType === 'habit') {
      if (!month.habits) month.habits = [];
      month.habits.push(data);
    } else if (entry.itemType === 'do') {
      if (!this.data.dosAndDonts) this.data.dosAndDonts = { dos: [], donts: [] };
      this.data.dosAndDonts.dos.push(data);
    } else if (entry.itemType === 'dont') {
      if (!this.data.dosAndDonts) this.data.dosAndDonts = { dos: [], donts: [] };
      this.data.dosAndDonts.donts.push(data);
    }

    entry.restored = true;
    this.recordHistory('restore', entry.itemType, entry.title, entry.amount, window.authManager?.getCurrentUserId(), data);
    this.save(`memulihkan kembali "${entry.title}" 🔄`);
    return true;
  }

  deleteHistoryItem(historyId) {
    if (!this.data.activityHistory) return;
    this.data.activityHistory = this.data.activityHistory.filter(e => e.id !== historyId);
    this.save('menghapus catatan riwayat');
  }

  clearTrash() {
    if (!this.data.activityHistory) return;
    this.data.activityHistory = this.data.activityHistory.filter(e => e.type !== 'delete');
    this.save('membersihkan riwayat terhapus');
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyChange() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error(e); }
    });
  }

  loadLocal() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }

  // Save and broadcast immediately across all devices with zero delay!
  save(actionMessage = 'mengupdate data') {
    this.data.lastUpdated = Date.now();
    this.data.lastAction = actionMessage;
    this.data.lastModifiedBy = window.authManager ? window.authManager.getCurrentUserId() : 'user';
    this.saveLocal();
    if (window.realtimeSync) {
      window.realtimeSync.broadcastChange(actionMessage);
    }
    this.notifyChange();
  }

  initMonth(monthKey) {
    if (!this.data.months[monthKey]) {
      this.data.months[monthKey] = {
        incomes: [],
        expenses: [],
        schedules: [],
        todos: [],
        review: {
          highlight: '',
          achievement: '',
          improvement: '',
          nextMonthTarget: '',
          happinessRating: 5,
          notes: ''
        },
        habits: [
          { id: 'hb-1', name: '🏃‍♂️ Olahraga / Jalan Sehat (Min 30m)', assignee: 'bareng', checks: {} },
          { id: 'hb-2', name: '💧 Minum Air 2L Sehari', assignee: 'bareng', checks: {} },
          { id: 'hb-3', name: '📖 Membaca Buku / Skill Baru', assignee: 'dewa', checks: {} },
          { id: 'hb-4', name: '🌸 Skincare & Me Time Teratur', assignee: 'ayu', checks: {} },
          { id: 'hb-5', name: '💬 Deep Talk Tanpa HP (30m)', assignee: 'bareng', checks: {} },
          { id: 'hb-6', name: '💰 Catat Pengeluaran Harian', assignee: 'bareng', checks: {} }
        ]
      };
      this.saveLocal();
    }
  }

  getCurrentMonthKey() {
    return this.data.currentMonth;
  }

  setCurrentMonthKey(monthKey) {
    this.data.currentMonth = monthKey;
    if (!this.data.months[monthKey]) {
      this.initMonth(monthKey);
    }
    this.save('mengganti periode bulan');
  }

  getMonthData(monthKey = this.data.currentMonth) {
    if (!this.data.months[monthKey]) {
      this.initMonth(monthKey);
    }
    return this.data.months[monthKey];
  }

  // Financial Calculations
  getFinancialSummary(monthKey = this.data.currentMonth) {
    const month = this.getMonthData(monthKey);
    
    let incomeDewa = 0;
    let incomeAyu = 0;
    (month.incomes || []).forEach(item => {
      const amt = Number(item.amount) || 0;
      if (item.person === 'dewa') incomeDewa += amt;
      else if (item.person === 'ayu') incomeAyu += amt;
    });

    const totalIncome = incomeDewa + incomeAyu;

    let totalExpense = 0;
    let expenseByCategory = {};
    let expenseByPayer = { dewa: 0, ayu: 0, bareng: 0 };

    (month.expenses || []).forEach(item => {
      const amt = Number(item.amount) || 0;
      totalExpense += amt;
      expenseByCategory[item.category] = (expenseByCategory[item.category] || 0) + amt;
      if (item.paidBy) {
        expenseByPayer[item.paidBy] = (expenseByPayer[item.paidBy] || 0) + amt;
      }
    });

    const netSavings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;
    const dewaShare = totalIncome > 0 ? ((incomeDewa / totalIncome) * 100).toFixed(1) : 0;
    const ayuShare = totalIncome > 0 ? ((incomeAyu / totalIncome) * 100).toFixed(1) : 0;

    return {
      incomeDewa,
      incomeAyu,
      totalIncome,
      totalExpense,
      netSavings,
      savingsRate,
      dewaShare,
      ayuShare,
      expenseByCategory,
      expenseByPayer
    };
  }

  // Incomes & Expenses
  addIncome(item) {
    const month = this.getMonthData();
    item.id = 'inc-' + Date.now();
    item.amount = Number(item.amount) || 0;
    month.incomes.unshift(item);
    this.recordHistory('create', 'income', item.source, item.amount, window.authManager?.getCurrentUserId(), item);
    this.save(`menambahkan rezeki ${formatRupiah(item.amount)} (${item.source}) 💵`);
    return item;
  }

  deleteIncome(id) {
    const month = this.getMonthData();
    const item = month.incomes.find(i => i.id === id);
    if (item) {
      this.recordHistory('delete', 'income', item.source, item.amount, window.authManager?.getCurrentUserId(), item);
    }
    month.incomes = month.incomes.filter(i => i.id !== id);
    this.save('menghapus catatan rezeki 🗑️');
  }

  addExpense(item) {
    const month = this.getMonthData();
    item.id = 'exp-' + Date.now();
    item.amount = Number(item.amount) || 0;
    month.expenses.unshift(item);
    this.recordHistory('create', 'expense', item.title, item.amount, window.authManager?.getCurrentUserId(), item);
    this.save(`mencatat belanja ${formatRupiah(item.amount)} (${item.title}) 🛍️`);
    return item;
  }

  deleteExpense(id) {
    const month = this.getMonthData();
    const item = month.expenses.find(i => i.id === id);
    if (item) {
      this.recordHistory('delete', 'expense', item.title, item.amount, window.authManager?.getCurrentUserId(), item);
    }
    month.expenses = month.expenses.filter(i => i.id !== id);
    this.save('menghapus catatan belanja 🗑️');
  }

  // Tabungan Per Orang & Bersama
  getSavingsGoals(ownerFilter = 'all') {
    const all = this.data.savingsGoals || [];
    if (ownerFilter === 'all') return all;
    return all.filter(g => (g.owner || 'bareng') === ownerFilter);
  }

  getSavingsSummary() {
    const all = this.data.savingsGoals || [];
    let totalTarget = 0;
    let totalCollected = 0;
    let barengCollected = 0;
    let dewaCollected = 0;
    let ayuCollected = 0;

    all.forEach(g => {
      const tgt = Number(g.target) || 0;
      const col = Number(g.collected) || 0;
      totalTarget += tgt;
      totalCollected += col;
      const owner = g.owner || 'bareng';
      if (owner === 'dewa') dewaCollected += col;
      else if (owner === 'ayu') ayuCollected += col;
      else barengCollected += col;
    });

    return {
      totalTarget,
      totalCollected,
      barengCollected,
      dewaCollected,
      ayuCollected
    };
  }

  addSavingsGoal(goal) {
    goal.id = 'goal-' + Date.now();
    goal.owner = goal.owner || 'bareng';
    goal.target = Number(goal.target) || 0;
    goal.collected = Number(goal.collected) || 0;
    this.data.savingsGoals.push(goal);
    this.recordHistory('create', 'savings', goal.title, goal.target, window.authManager?.getCurrentUserId(), goal);
    this.save(`menambahkan celengan impian baru: "${goal.title}" 🍯`);
    return goal;
  }

  updateSavingsGoal(id, collectedDelta) {
    const goal = this.data.savingsGoals.find(g => g.id === id);
    if (goal) {
      goal.collected = Math.max(0, (goal.collected || 0) + Number(collectedDelta));
      this.save(`menabung ${formatRupiah(collectedDelta)} ke celengan "${goal.title}"! 🍯✨`);
    }
  }

  deleteSavingsGoal(id) {
    const item = (this.data.savingsGoals || []).find(g => g.id === id);
    if (item) {
      this.recordHistory('delete', 'savings', item.title, item.target, window.authManager?.getCurrentUserId(), item);
    }
    this.data.savingsGoals = this.data.savingsGoals.filter(g => g.id !== id);
    this.save('menghapus celengan impian 🗑️');
  }

  // Schedules
  getSchedules(monthKey = this.data.currentMonth) {
    return this.getMonthData(monthKey).schedules || [];
  }

  addSchedule(sch) {
    const month = this.getMonthData();
    sch.id = 'sch-' + Date.now();
    month.schedules.push(sch);
    month.schedules.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    this.recordHistory('create', 'schedule', sch.title, null, window.authManager?.getCurrentUserId(), sch);
    this.save(`menambahkan jadwal agenda: "${sch.title}" 📅`);
    return sch;
  }

  deleteSchedule(id) {
    const month = this.getMonthData();
    const item = month.schedules.find(s => s.id === id);
    if (item) {
      this.recordHistory('delete', 'schedule', item.title, null, window.authManager?.getCurrentUserId(), item);
    }
    month.schedules = month.schedules.filter(s => s.id !== id);
    this.save('menghapus agenda jadwal 🗑️');
  }

  // Todos
  getTodos(monthKey = this.data.currentMonth) {
    return this.getMonthData(monthKey).todos || [];
  }

  addTodo(todo) {
    const month = this.getMonthData();
    todo.id = 'td-' + Date.now();
    todo.status = todo.status || 'todo';
    month.todos.unshift(todo);
    this.recordHistory('create', 'todo', todo.title, null, window.authManager?.getCurrentUserId(), todo);
    this.save(`menambahkan misi baru: "${todo.title}" 🐰`);
    return todo;
  }

  toggleTodoStatus(id) {
    const month = this.getMonthData();
    const todo = month.todos.find(t => t.id === id);
    if (todo) {
      todo.status = todo.status === 'done' ? 'todo' : 'done';
      const statusText = todo.status === 'done' ? 'menyelesaikan misi' : 'membuka kembali misi';
      this.save(`${statusText}: "${todo.title}" 🎉`);
      return todo;
    }
    return null;
  }

  deleteTodo(id) {
    const month = this.getMonthData();
    const item = month.todos.find(t => t.id === id);
    if (item) {
      this.recordHistory('delete', 'todo', item.title, null, window.authManager?.getCurrentUserId(), item);
    }
    month.todos = month.todos.filter(t => t.id !== id);
    this.save('menghapus misi to-do 🗑️');
  }

  // Do's and Don'ts
  getDosAndDonts() {
    if (!this.data.dosAndDonts) {
      this.data.dosAndDonts = JSON.parse(JSON.stringify(defaultData.dosAndDonts));
    }
    return this.data.dosAndDonts;
  }

  addDo(text, category = 'Umum', addedBy = 'bareng') {
    const dnd = this.getDosAndDonts();
    const item = {
      id: 'do-' + Date.now(),
      text,
      category,
      addedBy,
      date: new Date().toISOString().split('T')[0]
    };
    dnd.dos.unshift(item);
    this.save('menambahkan resep bahagia (DO\'s) baru! 🎀');
    return item;
  }

  deleteDo(id) {
    const dnd = this.getDosAndDonts();
    const item = dnd.dos.find(d => d.id === id);
    if (item) {
      this.recordHistory('delete', 'do', item.text, null, window.authManager?.getCurrentUserId(), item);
    }
    dnd.dos = dnd.dos.filter(d => d.id !== id);
    this.save('menghapus resep bahagia 🗑️');
  }

  addDont(text, category = 'Umum', addedBy = 'bareng') {
    const dnd = this.getDosAndDonts();
    const item = {
      id: 'dont-' + Date.now(),
      text,
      category,
      addedBy,
      date: new Date().toISOString().split('T')[0]
    };
    dnd.donts.unshift(item);
    this.save('menambahkan pantangan (DON\'Ts) baru! 🚫');
    return item;
  }

  deleteDont(id) {
    const dnd = this.getDosAndDonts();
    const item = dnd.donts.find(d => d.id === id);
    if (item) {
      this.recordHistory('delete', 'dont', item.text, null, window.authManager?.getCurrentUserId(), item);
    }
    dnd.donts = dnd.donts.filter(d => d.id !== id);
    this.save('menghapus pantangan 🗑️');
  }

  // Shared Notes
  getNotes() {
    if (!this.data.notes) {
      this.data.notes = JSON.parse(JSON.stringify(defaultData.notes));
    }
    return this.data.notes;
  }

  addNote(title, content, category = 'Umum', author = 'bareng', color = '#fef3c7') {
    const notes = this.getNotes();
    const item = {
      id: 'nt-' + Date.now(),
      title,
      content,
      category,
      author,
      color,
      pinned: false,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    notes.unshift(item);
    this.save(`menempelkan memo baru: "${title}" 💌`);
    return item;
  }

  deleteNote(id) {
    const item = (this.getNotes() || []).find(n => n.id === id);
    if (item) {
      this.recordHistory('delete', 'note', item.title, null, window.authManager?.getCurrentUserId(), item);
    }
    this.data.notes = this.getNotes().filter(n => n.id !== id);
    this.save('menghapus memo 🗑️');
  }

  togglePinNote(id) {
    const note = this.getNotes().find(n => n.id === id);
    if (note) {
      note.pinned = !note.pinned;
      this.data.notes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
      this.save('mengubah pin memo 📌');
    }
  }

  // Review & Reflection
  getReview(monthKey = this.data.currentMonth) {
    return this.getMonthData(monthKey).review || {};
  }

  updateReview(reviewData) {
    const month = this.getMonthData();
    month.review = { ...month.review, ...reviewData };
    this.save('mengupdate refleksi & surat cinta bulanan! 💖');
  }

  // Habits
  getHabits(monthKey = this.data.currentMonth) {
    return this.getMonthData(monthKey).habits || [];
  }

  toggleHabitDay(habitId, dayNumber) {
    const month = this.getMonthData();
    const habit = month.habits.find(h => h.id === habitId);
    if (habit) {
      if (!habit.checks) habit.checks = {};
      habit.checks[dayNumber] = !habit.checks[dayNumber];
      const statusText = habit.checks[dayNumber] ? 'mencentang' : 'membatalkan';
      this.save(`${statusText} kebiasaan "${habit.name}" tgl ${dayNumber} ✨`);
      return habit.checks[dayNumber];
    }
    return false;
  }

  addHabit(habit) {
    const month = this.getMonthData();
    habit.id = 'hb-' + Date.now();
    habit.checks = {};
    month.habits.push(habit);
    this.save(`menambahkan kebiasaan sehat baru: "${habit.name}" 🌷`);
    return habit;
  }

  deleteHabit(habitId) {
    const month = this.getMonthData();
    const item = (month.habits || []).find(h => h.id === habitId);
    if (item) {
      this.recordHistory('delete', 'habit', item.name, null, window.authManager?.getCurrentUserId(), item);
    }
    month.habits = month.habits.filter(h => h.id !== habitId);
    this.save('menghapus kebiasaan 🗑️');
  }

  // Export / Import
  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profiles && parsed.months) {
        this.data = parsed;
        this.save('mengimpor data cadangan');
        return true;
      }
    } catch (e) {
      console.error('Invalid import data', e);
    }
    return false;
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(defaultData));
    this.save('mereset data ke contoh awal bawaan');
  }
}

// Utility: Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number || 0);
}

// Global state instance
window.appState = new StateManager();
window.formatRupiah = formatRupiah;
