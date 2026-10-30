import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ProgressService } from '../services/progress.service';

export const examSessionGuard: CanActivateFn = () => {
  const progress = inject(ProgressService);
  const router = inject(Router);
  return progress.activeExam() ? true : router.createUrlTree(['/exam']);
};
