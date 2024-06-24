import { ApiService } from '../../../../Service/api.service';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserInterface } from '../../../Interface/user-interface';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfilmComponent } from '../../dialog-confilm/dialog-confilm.component';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private service: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog :MatDialog,
    private _snackBar:MatSnackBar
  ) { }
  displayedColumns: string[] = ['id', 'name', 'username', 'phone','email','company','website','action'];
  dataSource = new MatTableDataSource<UserInterface>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getUsers().subscribe(data => {
      this.dataSource.data = data; // Set data to MatTableDataSource
      console.log('Fetched users:', data);
    });
  }

  async deleteUser(id:number): Promise<UserInterface> {
    return await lastValueFrom(this.service.deleteUser(id));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {
    const dialogRef = this._dialog.open(DialogConfilmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this item?' }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const data = await this.deleteUser(id);
        if(!!data) this.openSnackBar('Delete success !');
        else this.openSnackBar('Delete faild !');
        console.log('User clicked OK',data);
      } else {
        console.log('User clicked Cancel',id);
      }
    });
  
  }

  openSnackBar(content: string) {
    this._snackBar.open(content, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(1111,this.dataSource.filter);
    console.log(1111,filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

