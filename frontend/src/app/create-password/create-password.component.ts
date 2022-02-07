import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss'],
})
export class CreatePasswordComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signUpForm = this.fb.group(
      {
        password: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'blur',
        }),
        rePassword: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'blur',
        }),
      },
      { validator: this.passwordConfirming }
    );
  }

  passwordConfirming(
    c: AbstractControl
  ): { noMatch: boolean } | { pattern: boolean } | undefined {
    if (c.get('password')?.value && c.get('rePassword')?.value.length < 8) {
      c.get('password')?.setValidators(Validators.minLength(8));
    } else if (
      c.get('rePassword')?.value &&
      c.get('password')?.value !== c.get('rePassword')?.value
    ) {
      c.get('password')?.setErrors({ noMatch: true });
      c.get('rePassword')?.setErrors({ noMatch: true });
      return { noMatch: true };
    } else if (
      c.get('rePassword')?.value &&
      c.get('password')?.value &&
      c.get('password')?.value === c.get('rePassword')?.value
    ) {
      c.get('password')?.setErrors(null);
      c.get('rePassword')?.setErrors(null);
    }
    return;
  }
  ngOnInit(): void {}

  async onSubmit() {
    const token = this.route.snapshot.paramMap.get('token') ?? undefined;
    const signUpRequest = {
      token,
      password: this.signUpForm?.get('password')?.value,
    };
    try {
      const res: any = await this.api.register(signUpRequest);
      this.router.navigate(['/login']);
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }
}
