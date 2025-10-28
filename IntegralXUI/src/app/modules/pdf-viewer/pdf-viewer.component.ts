import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as pdfjsLib from 'pdfjs-dist';
import { MarkerData, Marker } from 'src/app/services/models/marker.model'; 

pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Updated Marker interface with normalized coordinates
interface NormalizedMarker {
  x: number;        // Normalized X (0-1)
  y: number;        // Normalized Y (0-1)
  page: number;
}

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('pdfCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() pdfFilePath: string = '';
  @Input() markerData: MarkerData | null = null;
  @Output() markersChanged = new EventEmitter<MarkerData>();

  pdfDoc: any = null;
  currentPage = 1;
  totalPages = 0;
  markers: Marker[] = [];
  scale = 1.5; // Default scale
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private currentPageWidth = 0;  // Store current page dimensions
  private currentPageHeight = 0;
  
  loading = false;
  error = '';

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['pdfFilePath'] && this.pdfFilePath && !changes['pdfFilePath'].firstChange) {
      await this.loadPdf(this.pdfFilePath);
    }
    debugger;
    if (changes['markerData'] && this.markerData) {
      alert("mark");
      this.loadMarkers(this.markerData);
    }
  }

  ngAfterViewInit() {
    if (this.pdfFilePath && this.canvasRef) {
      this.loadPdf(this.pdfFilePath);
    
    }
  }

  ngOnDestroy() {
    if (this.pdfDoc) {
      this.pdfDoc.destroy();
    }
  }
  fixPdfPath(path: string): string {
    if (!path) return '';
    
    // Replace all backslashes with forward slashes
    let fixedPath = path.replace(/\\/g, '/');
    return fixedPath;
  }

  async loadPdf(filePath: string) {
     filePath = this.fixPdfPath(filePath);
    debugger
    this.loading = true;
    this.error = '';
    
    try {
     const loadingTask = pdfjsLib.getDocument({
      url: filePath,
      httpHeaders: {
        'Accept': 'application/pdf'
      },
      withCredentials: false // Set to true if you need cookies/auth
    });

    this.pdfDoc = await loadingTask.promise;
    this.totalPages = this.pdfDoc.numPages;
    this.currentPage = 1;
    
    setTimeout(() => {
      this.canvas = this.canvasRef.nativeElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.renderPage(this.currentPage);
      this.loading = false;
    }, 50);
    } catch (err: any) {
      this.error = 'Failed to load PDF: ' + err.message;
      this.loading = false;
      console.error('Error loading PDF:', err);
    }
  }

  loadMarkers(data: MarkerData) {
    debugger;
     let parsedData: MarkerData;
     if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
      data = parsedData;
    } catch (error) {
      console.error('Error parsing marker data:', error);
      return;
    }
  } 
    if (data && data.markers) {
      this.markers = [...data.markers];
      if (this.canvas && this.pdfDoc) {
        this.renderPage(this.currentPage);
      }
    }
  }

  async renderPage(pageNum: number) {
    if (!this.pdfDoc || !this.canvas) return;

    try {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: this.scale });

      // Store current page dimensions for marker calculations
      this.currentPageWidth = viewport.width;
      this.currentPageHeight = viewport.height;

      this.canvas.width = viewport.width;
      this.canvas.height = viewport.height;

      await page.render({
        canvasContext: this.ctx,
        viewport: viewport
      }).promise;
      
      this.drawMarkers();
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.canvas || !this.pdfDoc) return;

    const rect = this.canvas.getBoundingClientRect();
    
    // Get click position relative to canvas
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Account for canvas scaling (CSS vs actual canvas size)
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    
    // Get actual canvas coordinates
    const canvasX = clickX * scaleX;
    const canvasY = clickY * scaleY;
    
    // Convert to NORMALIZED coordinates (0-1 range) - ZOOM INDEPENDENT
    const normalizedX = canvasX / this.canvas.width;
    const normalizedY = canvasY / this.canvas.height;

    // Remove existing marker on this page (only one marker per page)
    this.markers = this.markers.filter(m => m.page !== this.currentPage);
    
    // Store as normalized coordinates
    this.markers.push({ 
      x: normalizedX, 
      y: normalizedY, 
      page: this.currentPage 
    });
    
    console.log(`Marker added: Normalized(${normalizedX.toFixed(3)}, ${normalizedY.toFixed(3)}) on page ${this.currentPage}`);
    
    this.renderPage(this.currentPage);
    this.emitMarkersChange();
  }

  zoomIn() {
    if (this.scale < 3) {
      this.scale += 0.25;
      this.renderPage(this.currentPage);
    }
  }

  zoomOut() {
    if (this.scale > 0.5) {
      this.scale -= 0.25;
      this.renderPage(this.currentPage);
    }
  }

  resetZoom() {
    this.scale = 1.5;
    this.renderPage(this.currentPage);
  }

  getZoomPercentage(): number {
    return Math.round((this.scale / 1.5) * 100);
  }
drawMarkers() {
  if (!this.ctx || !this.canvas) return;

  const currentPageMarkers = this.markers.filter(m => m.page === this.currentPage);
  
  currentPageMarkers.forEach((marker) => {
    // Convert normalized coordinates (0-1) back to pixel coordinates
    // This ensures markers stay in the same relative position regardless of zoom
    const pixelX = marker.x * this.canvas.width;
    const pixelY = marker.y * this.canvas.height;

    // Draw outer marker circle
    this.ctx.beginPath();
    this.ctx.arc(pixelX, pixelY, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // Draw center dot
    this.ctx.beginPath();
    this.ctx.arc(pixelX, pixelY, 2, 0, 2 * Math.PI); // Small dot with radius 2
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  });
}

  removeMarker(index: number) {
    this.markers.splice(index, 1);
    this.renderPage(this.currentPage);
    this.emitMarkersChange();
  }

  clearMarkers() {
    if (confirm('Are you sure you want to clear all markers?')) {
      this.markers = [];
      this.renderPage(this.currentPage);
      this.emitMarkersChange();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  private emitMarkersChange() {
    const data: MarkerData = {
      markers: this.markers,
      totalPages: this.totalPages,
      timestamp: new Date().toISOString()
    };
    this.markersChanged.emit(data);
  }
}