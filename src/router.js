/* eslint-disable import/prefer-default-export */
import { createRouter, createWebHistory } from 'vue-router';
import { setI18nLanguage, loadLocaleMessages, SUPPORT_LOCALES } from './i18n';

import App from './App.vue';

export function setupRouter(i18n) {
  const locale = i18n.mode === 'legacy' ? i18n.global.locale : i18n.global.locale.value;

  // setup routes
  const routes = [
    {
      path: '/:locale/',
      name: 'app',
      component: App,
    },
  ];

  // create router instance
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // navigation guards
  router.beforeEach(async (to) => {
    const paramsLocale = to.params.locale;

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return `/${locale}`;
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale);
    return 1;
  });

  return router;
}
