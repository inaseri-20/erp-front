import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../../modules/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { FeaturesListComponent } from '../../../share/components/features-list/features-list.component';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {

  constructor(private dialog: MatDialog,
              private dashboardService: DashboardService,
              private router: Router) {
  }

  getClientSettings(): void {
    let clientSettings: any = localStorage.getItem('pezeshkitoClientSetting');
    clientSettings = JSON.parse(clientSettings);
    if (!clientSettings.feature_list_unshow) {
      this.dialog.open(FeaturesListComponent, { width: '600px' });
    }
    if (clientSettings.graduated) {
      this.router.navigate(['/access-denied'], { queryParams: { graduated: true } });
    }
    if (!clientSettings.has_joon) {
      this.router.navigate(['/access-denied'], { queryParams: { fired: true } });
    }
    if (!clientSettings.is_active) {
      this.router.navigate(['/access-denied'], { queryParams: { active: false } });
    }
    if (clientSettings.is_limite) {
      this.router.navigate(['/access-denied'], { queryParams: { limited: true } });
    }
  }

  getCommentCount(): string {
    let clientSettings: any = localStorage.getItem('pezeshkitoClientSetting');
    clientSettings = JSON.parse(clientSettings);
    return String(clientSettings?.minimum_comment_number);
  }

  setClientAvatar(clientSex: number, clientType: string): string {
    let imagePath = ''
    if (clientType.includes('استارتر')) {
      imagePath = 'assets/images/profile/Starter 1.svg'
    }
    if (clientSex === 0 && clientType.includes('پا به کار')) {
      imagePath = 'assets/images/profile/Pabekar 2.svg'
    }
    if (clientSex === 0 && clientType.includes('کاربلد')) {
      imagePath = 'assets/images/profile/Karbalad 1.svg'
    }
    if (clientSex === 0 && clientType.includes('ماهر')) {
      imagePath = 'assets/images/profile/Maher 2.svg'
    }
    if (clientSex === 0 && clientType.includes('حرفه ای')) {
      imagePath = 'assets/images/profile/Herfeyi 2.svg'
    }
    if (clientSex === 1 && clientType.includes('پا به کار')) {
      imagePath = 'assets/images/profile/Pabekar 1.svg'
    }
    if (clientSex === 1 && clientType.includes('کاربلد')) {
      imagePath = 'assets/images/profile/Karbalad 2.svg'
    }
    if (clientSex === 1 && clientType.includes('ماهر')) {
      imagePath = 'assets/images/profile/Maher 1.svg'
    }
    if (clientSex === 1 && clientType.includes('حرفه ای')) {
      imagePath = 'assets/images/profile/Herfeyi 1.svg'
    }
    return imagePath
  }
}
