import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleLoaderService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  async loadStyles(cssFileName: string) {
    const remotePublicPath = this.getRemotePublicPath();

    // Dynamically find the actual CSS file with hash
    const actualCssPath = await this.findCssFile(remotePublicPath, cssFileName);

    if (!actualCssPath) {
      console.error(`Could not find CSS file: ${cssFileName}`);
      return;
    }

    const fullUrl = remotePublicPath + actualCssPath;
    console.log('Loading styles from:', fullUrl);

    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', fullUrl);
    this.renderer.setAttribute(link, 'id', 'products-mfe-styles');
    this.renderer.appendChild(document.head, link);
  }

  private async findCssFile(basePath: string, fileName: string): Promise<string | null> {
    try {
      // Try direct file first (development)
      const response = await fetch(basePath + fileName, { method: 'HEAD' });
      if (response.ok) {
        return fileName;
      }

      // If not found, fetch index.html and parse for hashed CSS
      const htmlResponse = await fetch(basePath + 'index.html');
      const html = await htmlResponse.text();

      // Look for link tags with href containing styles-[hash].css
      const styleMatch = html.match(/href="(styles-[a-zA-Z0-9]+\.css)"/);
      if (styleMatch) {
        return styleMatch[1];
      }

      return null;
    } catch (error) {
      console.error('Error finding CSS file:', error);
      return null;
    }
  }

  private getRemotePublicPath(): string {
    // change to env
    return 'http://localhost:4201/';
  }

  removeStyles(): void {
    const styleLink = document.getElementById('products-mfe-styles');
    if (styleLink) {
      styleLink.remove();
    }
  }
}
