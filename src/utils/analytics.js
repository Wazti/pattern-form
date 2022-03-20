const sourceStorageName = 'sports:special:pattern-form';
let source = '-';

export function initAnalyticsModule() {
  const srcFromLs = localStorage.getItem(sourceStorageName);

  if (!srcFromLs) {
    const params = new URLSearchParams(window.parent.document.location.search);
    const utmSource = params.get('utm_source') || '-';

    source = utmSource;
  } else {
    source = srcFromLs;
  }

  localStorage.setItem(sourceStorageName, source);
}

export default {
  send({ name = '', label = '', value = '' }) {
    if (!window.specialDataLayer) window.specialDataLayer = [];

    // event и eventCategory должны всегда начинаться с special-
    // сбор аналитики настроен так, чтобы собирать события с этим префиксом
    const data = {
      event: 'special-pattern-form',
      eventCategory: 'special-pattern-form',
      eventLabel: label,
      eventName: name,
      eventValue: `${value}_${source}`,
    };

    window.specialDataLayer.push(data);

    if (process.env.BASE_URL?.indexOf('/demo/') > -1 || process.env.NODE_ENV === 'development') {
      console.log(`%cSended analytics %ceventName: ${name} | eventLabel: ${label}${value ? ` | eventValue: ${value}` : ''}`, 'color: blue; font-size: 14px', 'color: red; font-size: 18px');
    }
  },
};
