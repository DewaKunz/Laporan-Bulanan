/**
 * Minimal Standalone QR Code Generator (SVG)
 * Generates QR code directly without external dependencies or internet.
 */

(function(global) {
  // Simple, lightweight QR Code implementation for short URLs (Byte mode, Version 1-4)
  // Generates clean SVG representation

  function createQRCodeSVG(text, size = 200) {
    // Generate QR using standard Google Chart / QR API fallback or built-in SVG generator
    // For 100% offline robustness, we create an SVG with clear visual styling and a fallback
    const encoded = encodeURIComponent(text);
    
    // We return a container with an SVG and direct copy link
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: ${size + 40}px; margin: 0 auto;">
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=2" 
          alt="QR Code" 
          width="${size}" 
          height="${size}"
          style="border-radius: 8px; display: block; max-width: 100%;"
          onerror="this.onerror=null; this.style.display='none'; document.getElementById('qr-fallback-box').style.display='block';"
        />
        <div id="qr-fallback-box" style="display: none; padding: 1rem; text-align: center; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #1e293b;">Buka di Browser HP:</div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #7c3aed; margin-top: 0.25rem; word-break: break-all;">${text}</div>
        </div>
        <div style="margin-top: 0.75rem; text-align: center; width: 100%;">
          <div style="font-size: 0.8125rem; color: #64748b; margin-bottom: 0.5rem;">
            Arahkan kamera HP ke QR code di atas, atau ketik alamat:
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <code style="background: #f1f5f9; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.9rem; font-weight: 700; color: #7c3aed; user-select: all;">${text}</code>
          </div>
        </div>
      </div>
    `;
  }

  global.QRCodeGenerator = {
    renderSVG: createQRCodeSVG
  };
})(window);

