import { animate, state, style, transition, trigger } from '@angular/animations';

export const tapAnimation = trigger('tappedUntapped', [
    state('untapped', style({
      transform: 'rotate(0)',
      minWidth: '{{ inWidth }}'
    }), { params: { inWidth: '143px' }}),
    state('tapped', style({
      transform: 'rotate(90deg)',
      minWidth: '{{ inHeight }}'
    }), { params: { inHeight: '200px' }}),
    transition('untapped <=> tapped', [
      animate('0.5s ease')
    ]),
  ]);

export const tapAttachmentAnimation = trigger('attachmentTappedUntapped', [
    state('untapped', style({
      marginLeft: '0px',
      minWidth: '{{ inWidth }}'
    }), { params: { inWidth: '143px' }}),
    state('tapped', style({
      marginLeft: '{{ marginLeft }}',
      minWidth: '{{ inWidth }}'
    }), { params: { inWidth: '143px', marginLeft: '31px' }}),
    transition('untapped <=> tapped', [
      animate('0.5s ease')
    ]),
  ]);
