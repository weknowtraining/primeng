import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
    // tslint:disable-next-line
    selector: '.pi, .ui-dropdown-trigger-icon'
})
export class FontAwesomeDirective implements OnInit, OnDestroy {
    observer: MutationObserver;

    replacements = {
        pi: 'fa'
    };

    get native(): HTMLElement {
        return this.elem.nativeElement;
    }

    constructor(private elem: ElementRef) { }

    ngOnInit() {
        // Set classes once.
        this.setFaClasses();

        // Setup an observer to watch for future changes.
        this.observer = new MutationObserver(() => {
            this.setFaClasses();
        });

        // Actually start watching the element.
        this.observer.observe(this.native, { attributeFilter: ['class'] });
    }

    ngOnDestroy() {
        // Remember to disconnect when we go away.
        this.observer.disconnect();
    }

    setFaClasses() {
        // Figure out what classes SHOULD be on element.
        const classesToEnsurePresent: string[] = [];
        const activeFaClasses: string[] = [];
        this.native.classList.forEach(c => {
            if (c.startsWith('fa')) {
                activeFaClasses.push(c);
            }

            if (c.startsWith('pi')) {
                const fa = this.replacementFor(c);
                classesToEnsurePresent.push(fa);
            }
        });

        // Figure out what we need to add and remove.
        const classesToAdd = classesToEnsurePresent.filter(c => !activeFaClasses.includes(c));
        const classesToRemove = activeFaClasses.filter(c => !classesToEnsurePresent.includes(c));

        // Add classes.
        if (classesToAdd.length > 0) {
            this.native.classList.add(...classesToAdd);
        }

        // Remove classes.
        if (classesToRemove.length > 0) {
            this.native.classList.remove(...classesToRemove);
        }
    }

    replacementFor(c: string): string {
        return this.replacements[c] || c.replace('pi-', 'fa-');
    }
}
