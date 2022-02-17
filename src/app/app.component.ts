import {FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

/** @title Focusing with a specific FocusOrigin */
@Component({
  selector: 'app.component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class FocusMonitorFocusViaExample implements OnDestroy, AfterViewInit {
  @ViewChild('monitored') monitoredEl!: ElementRef<HTMLElement>;

  origin = this.formatOrigin(null);

  constructor(
    public focusMonitor: FocusMonitor,
    private _cdr: ChangeDetectorRef,
    private _ngZone: NgZone,
  ) {}

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.monitoredEl).subscribe(origin =>
      this._ngZone.run(() => {
        this.origin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      }),
    );
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.monitoredEl);
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */