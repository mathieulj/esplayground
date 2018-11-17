const A = require('./A/i18n');

let username = 'alien';

const a = new A();
A.updateLocale('en', {User:'User','not':'not', found: 'found'});
A.updateLocale('fr', {User:'Utilisateur','not':'pas', found: 'trouvé'});

console.log(a.translate`User ${username} not found`);
// => User alien not found

a.locale = 'fr';
console.log(a.translate`User ${username} not found`);
// => Utilisateur alien pas trouvé

const B = require('./B/i18n');

const b = new B();
B.updateLocale('en', {'user {}(id {}) missing' : 'User {0}(id {1}) not found.'});
B.updateLocale('fr', {'user {}(id {}) missing' : 'Incapable de trouver l\'utilisateur id {1} avec le nom {0}.'});

console.log(b.translate`user ${username}(id ${10}) missing`);
// => User alien(id 10) not found.

b.locale = 'fr';
console.log(b.translate`user ${username}(id ${10}) missing`);
// => Incapable de trouver l'utilisateur id 10 avec le nom alien.