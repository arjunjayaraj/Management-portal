import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService } from '../user.service';
import { first } from '../../../node_modules/rxjs/operators';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.userService.getUser(this.id)
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
          this.createUser();
      } else {
          this.updateUser();
      }
  }

  private createUser() {
    this.userService.add(this.form.value)
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

private updateUser() {
    this.user = this.form.value;
    this.user.id = parseInt(this.id.toString());
    this.userService.update(this.user)
        .pipe(first())
        .subscribe({
            next: (output) => {
             
               // this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            error: error => {
                //this.alertService.error(error);
                this.loading = false;
            }
        });
}


}
