/**
 * Realtime Zero-Delay Synchronization Engine
 * Combines WebRTC Peer-to-Peer Data Channels (PeerJS), Server-Sent Events (SSE),
 * BroadcastChannel, and Fast Adaptive Polling for true instant multi-device sync!
 */

class RealtimeSyncEngine {
  constructor() {
    this.peer = null;
    this.peerConnection = null;
    this.isPeerConnected = false;
    this.sseSource = null;
    this.broadcastChannel = null;
    this.pollInterval = null;
    this.lastSyncTimestamp = 0;

    this.initBroadcastChannel();
    this.initSSE();
    this.startFastPolling();
    this.initPeerJS();

    // Instant sync when user opens / unlocks phone or focuses tab
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.triggerImmediateSync();
      }
    });
    window.addEventListener('focus', () => this.triggerImmediateSync());
  }

  // 1. BroadcastChannel (Instant 0ms sync across tabs on same device)
  initBroadcastChannel() {
    try {
      if ('BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('dewa_ayu_sweet_sync');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.type === 'SYNC_UPDATE') {
            this.handleIncomingData(event.data.data, event.data.sender, event.data.action);
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported', e);
    }
  }

  // 2. Server-Sent Events (SSE) from server.js / api/stream
  initSSE() {
    try {
      if ('EventSource' in window) {
        this.sseSource = new EventSource('/api/stream');
        this.sseSource.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);
            if (payload && payload.data) {
              this.handleIncomingData(payload.data, payload.sender || 'server', payload.action);
            }
          } catch (e) {}
        };
        this.sseSource.onerror = () => {
          // SSE reconnects automatically
        };
      }
    } catch (e) {}
  }

  // 3. WebRTC Peer-to-Peer via PeerJS (True zero-delay sub-50ms sync directly between laptop & phone!)
  initPeerJS() {
    const currentUserId = window.authManager ? window.authManager.getCurrentUserId() : null;
    if (!currentUserId || typeof Peer === 'undefined') {
      // Retry once auth or PeerJS is ready
      setTimeout(() => this.initPeerJS(), 2000);
      return;
    }

    const myPeerId = `dewa_ayu_room_${currentUserId}_v2`;
    const targetPeerId = currentUserId === 'dewa' ? 'dewa_ayu_room_ayu_v2' : 'dewa_ayu_room_dewa_v2';

    try {
      if (this.peer) {
        try { this.peer.destroy(); } catch (e) {}
      }

      this.peer = new Peer(myPeerId, {
        debug: 1
      });

      this.peer.on('open', (id) => {
        console.log('🌸 PeerJS Online with ID:', id);
        this.updateRealtimeBadge('online');
        // Try connecting to partner's device
        this.connectToPeer(targetPeerId);
      });

      // Handle incoming connection from partner
      this.peer.on('connection', (conn) => {
        this.setupConnectionHandlers(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('PeerJS notice:', err.type);
        // If peer ID already taken (e.g. reload), re-connect after delay
        if (err.type === 'unavailable-id') {
          setTimeout(() => this.initPeerJS(), 3000);
        }
      });
    } catch (e) {
      console.warn('PeerJS initialization skipped:', e);
    }
  }

  connectToPeer(targetPeerId) {
    if (!this.peer || this.peer.destroyed) return;
    try {
      const conn = this.peer.connect(targetPeerId, {
        reliable: true
      });
      this.setupConnectionHandlers(conn);
    } catch (e) {}
  }

  setupConnectionHandlers(conn) {
    this.peerConnection = conn;

    conn.on('open', () => {
      this.isPeerConnected = true;
      this.updateRealtimeBadge('p2p');
      console.log('💖 WebRTC P2P Direct Zero-Delay Connected to Partner!');
    });

    conn.on('data', (packet) => {
      if (packet && packet.type === 'P2P_SYNC') {
        this.handleIncomingData(packet.data, packet.sender, packet.action);
      }
    });

    conn.on('close', () => {
      this.isPeerConnected = false;
      this.updateRealtimeBadge('online');
    });

    conn.on('error', () => {
      this.isPeerConnected = false;
    });
  }

  // 4. Fast Adaptive Polling (1.5s fallback so updates are never missed even if P2P is establishing)
  startFastPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.pollServer();
    }, 1500);
  }

  async pollServer() {
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.initialized && json.data) {
          const incomingStr = JSON.stringify(json.data);
          const currentStr = JSON.stringify(window.appState.data);
          if (incomingStr !== currentStr) {
            this.handleIncomingData(json.data, 'server', 'update');
          }
        }
        if (!this.isPeerConnected) {
          this.updateRealtimeBadge('online');
        }
      } else {
        if (!this.isPeerConnected) {
          this.updateRealtimeBadge('offline');
        }
      }
    } catch (e) {
      if (!this.isPeerConnected) {
        this.updateRealtimeBadge('offline');
      }
    }
  }

  async triggerImmediateSync() {
    await this.pollServer();
  }

  // Handle incoming data packet
  handleIncomingData(incomingData, sender, actionMessage) {
    const currentStr = JSON.stringify(window.appState.data);
    const incomingStr = JSON.stringify(incomingData);

    if (incomingStr === currentStr) return; // No change

    window.appState.data = incomingData;
    window.appState.saveLocal();
    window.appState.notifyChange();

    // Display cute announcement toast if partner made changes!
    const myId = window.authManager ? window.authManager.getCurrentUserId() : null;
    if (sender && sender !== myId && sender !== 'server') {
      const senderName = sender === 'dewa' ? '🐻 Mas Dewa' : '🐰 Neng Ayu';
      const actionText = actionMessage || 'baru saja mengupdate data berdua!';
      if (window.showToast) {
        window.showToast(`${senderName} ${actionText} ✨`, '💖');
      }
    }
  }

  // Broadcast change IMMEDIATELY to partner's device
  broadcastChange(actionMessage = 'mengupdate data') {
    const myId = window.authManager ? window.authManager.getCurrentUserId() : 'user';
    const payload = {
      type: 'SYNC_UPDATE',
      data: window.appState.data,
      sender: myId,
      action: actionMessage,
      timestamp: Date.now()
    };

    // 1. Send via WebRTC P2P Data Channel (sub-50ms instant)
    if (this.peerConnection && this.isPeerConnected) {
      try {
        this.peerConnection.send({
          type: 'P2P_SYNC',
          ...payload
        });
      } catch (e) {}
    }

    // 2. Send via BroadcastChannel (same device 0ms)
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {}
    }

    // 3. Persist to Server API
    this.pushToServer(payload);
  }

  async pushToServer(payload) {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.data)
      });
    } catch (e) {
      console.warn('Push to server error:', e);
    }
  }

  updateRealtimeBadge(status) {
    const badge = document.getElementById('sync-status-indicator');
    if (!badge) return;

    if (status === 'p2p') {
      badge.innerHTML = '⚡ <span>Realtime Langsung (0 Jeda)</span>';
      badge.className = 'sync-badge sync-p2p';
      badge.title = 'Terhubung langsung antar HP & Laptop via WebRTC P2P Data Channel tanpa jeda!';
    } else if (status === 'online') {
      badge.innerHTML = '🟢 <span>Realtime Aktif (Sinkron)</span>';
      badge.className = 'sync-badge sync-online';
      badge.title = 'Terhubung ke server online Vercel / lokal. Data otomatis sinkron secara realtime.';
    } else {
      badge.innerHTML = '📡 <span>Mode Offline</span>';
      badge.className = 'sync-badge sync-offline';
      badge.title = 'Data tersimpan di perangkat lokal.';
    }
  }
}

// Global realtime instance
window.realtimeSync = new RealtimeSyncEngine();

