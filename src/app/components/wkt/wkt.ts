import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeDirective } from './fontawesome';

@NgModule({
  declarations: [FontAwesomeDirective],
  exports: [FontAwesomeDirective],
  imports: [CommonModule]
})
export class WKTModule {}
