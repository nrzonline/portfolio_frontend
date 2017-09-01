import { trigger, animate, style, transition } from '@angular/core';


export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({
                opacity: 0
            }),
            animate('.3s', style({
                opacity: 1
            }))
        ]),
   ]);

export const fadeOutAnimation =
    trigger('fadeOutAnimation', [
        transition(':leave', [
            style({
                opacity: 1
            }),
            animate('.3s', style({
                opacity: 0
            }))
        ]),
    ]);
