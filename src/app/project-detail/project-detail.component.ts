import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { first } from '../../../node_modules/rxjs/operators';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  project: Project;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
      manager: ['', Validators.required],
      client: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.projectService.getProject(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createProject();
      } else {
          this.updateProject();
      }
  }

  private createProject() {
    this.projectService.add(this.form.value)
        .pipe(first())
        .subscribe({
            next: (output) => {
                console.log(output);
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                this.loading = false;
            }
        });
}

private updateProject() {
    this.project = this.form.value;
    this.project.id = parseInt(this.id.toString());
    this.projectService.update(this.project)
        .pipe(first())
        .subscribe({
            next: (output) => {
             
               
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            error: error => {
               
                this.loading = false;
            }
        });
}

}
