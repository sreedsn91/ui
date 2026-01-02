import { Component } from '@angular/core';
import { ClientUserService } from 'src/app/services/client-User/client-user.service';
import { ClientStatus, ClientChartData } from 'src/app/services/client-User/client.model'; 
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  loading = true;
  error: string | null = null;
  chartData: ClientChartData | null = null;

  // Chart Types
  pieChartType = 'pie' as const;
  barChartType = 'bar' as const;
  doughnutChartType = 'doughnut' as const;
  
  // Pie Chart
  pieChartData: ChartData<'pie'> = {
    labels: ['Active', 'Expiring Soon', 'Expired'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14 },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Bar Chart
  barChartData: ChartData<'bar'> = {
    labels: ['Active', 'Expiring Soon', 'Expired'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      borderColor: ['#1e7e34', '#e0a800', '#c82333'],
      borderWidth: 2,
      label: 'Number of Clients'
    }]
  };

  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Clients: ${context.parsed.y}`
        }
      }
    }
  };

  // Doughnut Chart
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Active', 'Expiring Soon', 'Expired'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      borderWidth: 3,
      borderColor: '#fff'
    }]
  };

  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14 },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  constructor(private clientService: ClientUserService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.loading = true;
    this.error = null;

    this.clientService.getClientChart().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.chartData = data;
        this.updateCharts(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.error = 'Failed to load chart data. Please try again.';
        this.loading = false;
      }
    });
  }

  updateCharts(data: ClientChartData): void {
    const chartValues = [data.active, data.expiring, data.expired];

    // Update Pie Chart
    this.pieChartData = {
      labels: ['Active', 'Expiring Soon', 'Expired'],
      datasets: [{
        data: chartValues,
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    // Update Bar Chart
    this.barChartData = {
      labels: ['Active', 'Expiring Soon', 'Expired'],
      datasets: [{
        data: chartValues,
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderColor: ['#1e7e34', '#e0a800', '#c82333'],
        borderWidth: 2,
        label: 'Number of Clients'
      }]
    };

    // Update Doughnut Chart
    this.doughnutChartData = {
      labels: ['Active', 'Expiring Soon', 'Expired'],
      datasets: [{
        data: chartValues,
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderWidth: 3,
        borderColor: '#fff'
      }]
    };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Expiring': return 'status-expiring';
      case 'Expired': return 'status-expired';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active': return '✓';
      case 'Expiring': return '⚠';
      case 'Expired': return '✕';
      default: return '';
    }
  }

  getDaysRemainingText(days: number): string {
    if (days < 0) {
      return `Expired ${Math.abs(days)} days ago`;
    } else if (days === 0) {
      return 'Expires today';
    } else if (days === 1) {
      return 'Expires tomorrow';
    } else {
      return `${days} days remaining`;
    }
  }

  // User Count Methods
  isUserLimitReached(client: ClientStatus): boolean {
    return client.activeUserCount >= client.numberOfUsers;
  }

  isUserLimitWarning(client: ClientStatus): boolean {
    const percentageUsed = (client.activeUserCount / client.numberOfUsers) * 100;
    return percentageUsed >= 80 && percentageUsed < 100;
  }

  getRemainingUsers(client: ClientStatus): number {
    return Math.max(0, client.numberOfUsers - client.activeUserCount);
  }

  getUserLimitClass(client: ClientStatus): string {
    if (this.isUserLimitReached(client)) {
      return 'limit-reached';
    } else if (this.isUserLimitWarning(client)) {
      return 'limit-warning';
    }
    return '';
  }

  refresh(): void {
    this.loadChartData();
  }
}