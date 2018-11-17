/**
 * Simple internationalisation management utility that utilises a template literal function localise strings.
 *
 * Best used with template literals
 * @example
 * const I18n = require('I18n');
 * I18n.updateLocale('en', {'user {} missing' : 'User {0} not found.'});
 * I18n.updateLocale('fr', {'user {} missing' : 'Utilisateur {0} introuvable.'});
 *
 * const i18n = new I18n();
 *
 * let username = 'alien';
 *
 * console.log(i18n.translate`user ${username} missing`);
 * // => User alien not found
 *
 * i18n.locale = 'fr'
 * console.log(i18n.translate`user ${username} missing`);
 * // => Utilisateur alien introuvable
 *
 * @example
 * const I18n = require('I18n');
 *
 * // Allows different translations to have different replacement orders
 *
 * I18n.updateLocale('en', {'user {}(id {}) missing' : 'User {0}(id {1}) not found.'});
 * I18n.updateLocale('fr', {'user {}(id {}) missing' : 'Incapable de trouver l\'utilisateur id {1} avec le nom {0}.'});
 *
 * const i18n = new I18n();
 *
 * let username = 'alien';
 *
 * console.log(i18n.translate`user ${username}(id ${10}) missing`);
 * // => User alien(id 10) not found.
 *
 * i18n.locale = 'fr'
 * console.log(i18n.translate`user ${username}(id ${10}) missing`);
 * // => Incapable de trouver l'utilisateur id 10 avec le nom alien.
 *
 * @type {I18n}
 */
module.exports = class I18n {
    /**
     * Construct an internationalisation instance.
     * @param {String} [locale='en']
     */
    constructor(locale = "en") {
        /**
         * Current locale.
         * @type {String}
         */
        this.locale = locale;
    }

    /**
     * Translates a string template with the given literals.
     * @param {Array<String>} template
     * @param {Array<String>} literals
     * @returns {String}
     */
    translate(template, ...literals) {
        const dictionary = dictionaries[this.locale] || {};
        const key = template.join('{}');
        const format = key in dictionary ? dictionary[key] : `??${this.locale}:${key}??`;

        return format.replace(/{([0-9]+)}/g, (m, position) => literals[position]);
    }

    /**
     * (Re)Load a i18n locale
     * @param {String} newLocale
     * @param {I18nLocaleDictionary} dictionary
     */
    static updateLocale(newLocale, dictionary) {
        dictionaries[newLocale] = dictionary;
    }
};

/**
 * @typedef {Object<String, String>} I18nLocaleDictionary
 */

/**
 * Hash map of loaded locale dictionaries
 * @type {Object<String, I18nLocaleDictionary>}
 */
const dictionaries = {};
