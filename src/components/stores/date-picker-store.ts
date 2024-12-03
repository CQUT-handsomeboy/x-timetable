import { atom } from 'nanostores';
import { today } from '@/lib/utils';

export const selectedDate = atom(today);