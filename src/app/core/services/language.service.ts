import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'fil';

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home', check: 'Check', report: 'Report', map: 'Map', profile: 'Profile',
    alerts: 'Alerts', settings: 'Settings', weather: 'Cyber Weather', chat: 'Community Chat',
    analytics: 'Analytics', municipalities: 'Municipalities', barangays: 'Barangays',
    welcome: 'Welcome to CyberShield DN', choose: 'Choose what you need help with today.',
    checkSomething: 'Check something', checkHint: 'Check a link or message before you open it.',
    reportScam: 'Report a scam', reportHint: 'Tell your community about a suspicious message.',
    localWarnings: 'See local warnings', localWarningsHint: 'Find active cyber safety alerts near you.',
    english: 'English', filipino: 'Filipino',
  },
  fil: {
    home: 'Home', check: 'Suriin', report: 'I-report', map: 'Mapa', profile: 'Profile',
    alerts: 'Mga alerto', settings: 'Mga setting', weather: 'Panahon ng cyber', chat: 'Chat ng komunidad',
    analytics: 'Analytics', municipalities: 'Mga munisipyo', barangays: 'Mga barangay',
    welcome: 'Maligayang pagdating sa CyberShield DN', choose: 'Ano ang kailangan mong gawin ngayon?',
    checkSomething: 'Suriin ang isang mensahe', checkHint: 'Suriin ang link o mensahe bago ito buksan.',
    reportScam: 'I-report ang scam', reportHint: 'Sabihin sa komunidad ang tungkol sa kahina-hinalang mensahe.',
    localWarnings: 'Tingnan ang mga babala', localWarningsHint: 'Hanapin ang mga aktibong alerto sa inyong lugar.',
    english: 'English', filipino: 'Filipino',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>('en');

  toggle(): void {
    this.language.update(value => value === 'en' ? 'fil' : 'en');
  }

  t(key: string): string {
    return translations[this.language()][key] ?? translations.en[key] ?? key;
  }
}
