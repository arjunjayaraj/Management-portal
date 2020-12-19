import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  dataSource; 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'name', 'userId', 'manager', 'client', 'edit', 'delete'];

  

  ngOnInit(): void {
    this.getProjects();
    
    
  }

  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(projects => { 
      this.projects = projects;
      this.dataSource = new MatTableDataSource<Project>(this.projects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   
  }

  
  delete(project: Project): void {
    
    this.projects = this.projects.filter(h => h !== project);
    this.projectService.delete(project).subscribe();
    this.dataSource.data =this.projects;
    
    
  }

}
