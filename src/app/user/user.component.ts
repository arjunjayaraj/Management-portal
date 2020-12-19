import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '../../../node_modules/@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  dataSource; 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'district', 'state', 'country', 'edit', 'delete'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    
    
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => { 
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   
  }

  add(user: User): void {
    user.firstName = user.firstName.trim();
    if (!user.firstName) { return; }
    this.userService.add(user)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    
    this.users = this.users.filter(h => h !== user);
    this.userService.delete(user).subscribe();
    this.dataSource.data =this.users;
    
    
  }
  

}
