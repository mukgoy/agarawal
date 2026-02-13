import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../components/dialogs/user/user.component';
import { ConfirmComponent } from '../components/dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  confirmDialog(msgString: string, title?: string, isShowCancel=false) {
    let msg = { title: '', text: '', isShowCancel: false };
    msg.title = title || 'Help';
    msg.text = msgString || '';
    msg.isShowCancel = isShowCancel;
    return this.dialog.open(ConfirmComponent, {
      data: { msg: msg }, 
      // width: '100%'
    });

    // dialogRef.afterClosed().subscribe((result) => { });
  }

  userDialog(data: any) {
    const config = { data };
    return this.dialog.open(UserComponent, {
      data: config,
      width: '100%'
    });
  }


}
