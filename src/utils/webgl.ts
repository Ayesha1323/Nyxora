/**
 * WebGL Capability and Software Renderer Detector
 * Provides safe fallbacks for low-end, headless or software-rendered devices.
 */
export function checkWebGLSupport(): {
  supported: boolean;
  isSoftwareGl: boolean;
  pixelRatio: number;
} {
  if (typeof window === 'undefined') {
    return { supported: false, isSoftwareGl: true, pixelRatio: 1 };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      return { supported: false, isSoftwareGl: true, pixelRatio: 1 };
    }

    let isSoftwareGl = false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const gpu = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    }

    // Free the probe canvas context
    const loseExt = gl.getExtension('WEBGL_lose_context');
    if (loseExt) {
      loseExt.loseContext();
    }

    const pixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    return {
      supported: true,
      isSoftwareGl,
      pixelRatio
    };
  } catch (e) {
    return { supported: false, isSoftwareGl: true, pixelRatio: 1 };
  }
}
