/* Dinner Deck recipe engine (unchanged from the original artifact) */
/* ===== Dinner Deck engine: helpers, proteins, formats ===== */
const g = (a, u, n, o = {}) => ({ a, u, n, ...o });
const garlic = (a, note = 'minced') => g(a, '', 'garlic clove', { pl: 'garlic cloves', note, key: 'garlic', short: 'garlic' });
const ginger = (a, u = 'tsp') => g(a, u, 'fresh ginger', { note: 'grated', short: 'ginger' });
const lemon = (a, u = 'tbsp') => g(a, u, 'fresh lemon juice', { short: 'lemon juice', hint: '1 lemon gives about 3 tbsp' });
const lime = (a, u = 'tbsp') => g(a, u, 'fresh lime juice', { short: 'lime juice', hint: '1 lime gives about 2 tbsp' });
const soy = (a, u = 'tbsp') => g(a, u, 'soy sauce');
const honey = (a, u = 'tsp') => g(a, u, 'honey');
const ricevin = (a, u = 'tsp') => g(a, u, 'rice vinegar');
const sesoil = (a) => g(a, 'tsp', 'toasted sesame oil', { short: 'sesame oil' });
const cstarch = (a = 0.5) => g(a, 'tsp', 'cornstarch');
const cil = () => g(1, 'tbsp', 'fresh cilantro', { note: 'chopped', short: 'cilantro', opt: true, tags: ['cilantro'] });
const scal = (a = 1) => g(a, '', 'scallion', { pl: 'scallions', note: 'thinly sliced', opt: true });
const sesame = () => g(0.5, 'tsp', 'sesame seeds', { opt: true });
const parsley = (a = 1, o = {}) => g(a, 'tbsp', 'fresh parsley', { note: 'chopped', short: 'parsley', ...o });
const feta = () => g(2, 'tbsp', 'feta', { note: 'crumbled', opt: true, tags: ['dairy'], p: 3 });
const parm = (a = 2, o = {}) => g(a, 'tbsp', 'parmesan', { note: 'grated', tags: ['dairy'], p: a * 2, ...o });
const yogurt = (a, o = {}) => g(a, 'tbsp', 'plain Greek yogurt', { short: 'yogurt', tags: ['dairy'], p: a * 1.5, ...o });
const tomatoes = (a = 0.5, o = {}) => g(a, 'cup', 'cherry tomatoes', { note: 'halved', ...o });
const cucumber = (a = 0.5, note = 'diced') => g(a, 'cup', 'cucumber', { note });
const carrot = (a = 0.25) => g(a, 'cup', 'shredded carrot', { short: 'carrot' });
const avocado = () => g(0.25, '', 'avocado', { pl: 'avocados', note: 'sliced', opt: true });
const redonion = (a = 2) => g(a, 'tbsp', 'red onion', { note: 'thinly sliced', opt: true });
const flakes = () => g(1, 'pinch', 'red pepper flakes', { opt: true, tags: ['spicy'] });
const bpepper = (a = 0.5, note = 'sliced') => g(a, '', 'bell pepper', { pl: 'bell peppers', note });
const onion = (a = 0.25, note = 'sliced') => g(a, '', 'yellow onion', { pl: 'yellow onions', note, short: 'onion' });
const broth = (a, u = 'cup') => g(a, u, 'chicken or vegetable broth', { short: 'broth', key: 'broth' });
const cream = (a, u = 'cup', o = {}) => g(a, u, 'heavy cream', { short: 'cream', tags: ['dairy'], ...o });
const cheddar = (a, u = 'tbsp', o = {}) => g(a, u, 'sharp cheddar', { note: 'shredded', short: 'cheddar', tags: ['dairy'], p: u === 'cup' ? a * 28 : a * 1.75, ...o });
const cumin = (a) => g(a, 'tsp', 'ground cumin', { short: 'cumin' });
const smoked = (a) => g(a, 'tsp', 'smoked paprika');
const garlicP = (a = 0.25) => g(a, 'tsp', 'garlic powder');
const oregano = (a) => g(a, 'tsp', 'dried oregano', { short: 'oregano' });
const pinch = (n, o = {}) => g(1, 'pinch', n, o);
const broccoli = (a = 1) => g(a, 'cup', 'broccoli florets', { short: 'broccoli', p: 2.5 * a });
const greenbeans = () => g(1, 'cup', 'green beans', { note: 'trimmed', p: 2 });
const blackbeans = (only) => g(1 / 3, 'cup', 'black beans', { note: 'rinsed and warmed', p: 5, only });
const VINAIGRETTE = { name: 'Vinaigrette', ings: [g(1, 'tbsp', 'olive oil', { key: 'olive oil' }), g(2, 'tsp', 'red wine vinegar'), g(0.5, 'tsp', 'Dijon mustard', { short: 'Dijon' }), g(0.25, 'tsp', 'honey')] };

const PROTEINS = [
  { id: 'chicken', chip: 'Chicken', label: 'Chicken', name: 'chicken', kind: 'pieces', time: 10,
    ing: g(6, 'oz', 'boneless, skinless chicken breasts or thighs', { p: 36, short: 'chicken' }),
    cook: 'Heat a drizzle of oil in a large skillet over medium-high. Add the chicken in a single layer and cook without moving it for 3–4 minutes, then stir and cook 3–5 minutes more, until browned and 165°F inside.',
    temp: 'Chicken is done at 165°F.' },
  { id: 'beef', chip: 'Beef', sub: 'ground', label: 'Beef', name: 'beef', kind: 'ground', time: 9,
    ing: g(6, 'oz', '90% lean ground beef', { p: 34, short: 'beef' }),
    cook: 'Heat a drizzle of oil in a large skillet over medium-high. Add the beef and break it into crumbles. Cook 6–8 minutes, until browned with no pink left (160°F), then spoon off any extra fat.',
    temp: 'Ground beef is done at 160°F.' },
  { id: 'steak', chip: 'Steak', label: 'Steak', name: 'steak', kind: 'steak', time: 14,
    ing: g(6, 'oz', 'sirloin or flank steak', { p: 35, short: 'steak' }),
    cook: 'Heat a drizzle of oil in a heavy skillet over high until it shimmers. Sear the steak 3–5 minutes per side, until 145°F in the thickest part. Move it to a cutting board, rest at least 3 minutes, then slice thinly across the grain.',
    temp: 'Steak is done at 145°F followed by a 3-minute rest.' },
  { id: 'pork', chip: 'Pork', sub: 'tenderloin', label: 'Pork', name: 'pork', kind: 'pieces', time: 10,
    ing: g(6, 'oz', 'pork tenderloin', { p: 35, short: 'pork' }),
    cook: 'Heat a drizzle of oil in a large skillet over medium-high. Add the pork in a single layer and cook 3 minutes, then stir and cook 2–4 minutes more, until 145°F. Let it rest 3 minutes.',
    temp: 'Pork is done at 145°F followed by a 3-minute rest.' },
  { id: 'salmon', chip: 'Salmon', label: 'Salmon', name: 'salmon', kind: 'salmon', time: 10,
    ing: g(6, 'oz', 'salmon fillets', { p: 34, short: 'salmon' }),
    cook: 'Heat a drizzle of oil in a nonstick skillet over medium-high. Lay the salmon in skin side up and cook 4 minutes without moving it. Flip and cook 3–4 minutes more, until 145°F and it flakes easily with a fork.',
    temp: 'Salmon is done at 145°F, when it flakes easily.' },
  { id: 'shrimp', chip: 'Shrimp', label: 'Shrimp', name: 'shrimp', kind: 'shrimp', time: 5,
    ing: g(6, 'oz', 'large shrimp', { note: 'peeled and deveined', p: 34, short: 'shrimp' }),
    cook: 'Heat a drizzle of oil in a large skillet over medium-high. Add the shrimp in a single layer and cook 1–2 minutes per side, until pink and opaque (145°F). Pull them as soon as they curl; they turn rubbery fast.',
    temp: 'Shrimp are done at 145°F, when pink and opaque.' },
  { id: 'turkey', chip: 'Turkey', sub: 'ground', label: 'Turkey', name: 'turkey', kind: 'ground', time: 9,
    ing: g(6, 'oz', '93% lean ground turkey', { p: 32, short: 'turkey' }),
    cook: 'Heat a drizzle of oil in a large skillet over medium-high. Add the turkey and break it into crumbles. Cook 7–9 minutes, until browned with no pink left (165°F).',
    temp: 'Ground turkey is done at 165°F.' },
  { id: 'eggs', chip: 'Eggs', label: 'Egg', name: 'eggs', kind: 'eggs', time: 5,
    ing: g(3, '', 'large egg', { pl: 'large eggs', p: 19, short: 'eggs', key: 'eggs' }),
    temp: 'USDA advises cooking eggs until the whites and yolks are firm, and egg dishes to 160°F.' }
];

const BASES = [
  { id: 'rice', chip: 'Rice' }, { id: 'potatoes', chip: 'Potatoes' }, { id: 'pasta', chip: 'Pasta' },
  { id: 'veg', chip: 'Veggies', sub: 'no grain' }, { id: 'greens', chip: 'Greens' }, { id: 'oats', chip: 'Oats', sub: 'savory' },
  { id: 'quinoa', chip: 'Quinoa' }, { id: 'tortillas', chip: 'Tortillas' }
];

const FORMATS = {
  'rice.bowl': { base: 'rice', label: 'Rice bowl', title: '{F} {P} Rice Bowls', time: 25, egg: 'fried', poach: true, cut: 'pieces',
    ings: [g(0.5, 'cup', 'long-grain white rice', { short: 'rice', p: 6 })],
    start: 'Start the rice. Rinse it, then bring it to a boil with twice its volume of water and a pinch of salt. Cover, turn the heat to low, and simmer 18 minutes. Let it sit off the heat 5 minutes, then fluff.',
    serve: c => `Divide the rice among bowls and top with ${c.top}.` },
  'rice.fried': { base: 'rice', label: 'Fried rice', title: '{F} {P} Fried Rice', time: 3, post: 7, egg: 'scrambled', cut: 'small', handlesSauce: true,
    ings: [g(1.5, 'cup', 'cold cooked rice', { note: 'day-old is best', short: 'rice', p: 5 }), g(0.5, 'cup', 'frozen peas and carrots', { short: 'peas and carrots' })],
    start: 'Use cold cooked rice so it fries instead of clumping. If you only have fresh rice, cook it, spread it on a sheet pan, and chill 15 minutes first.',
    finish: c => `${c.aside} Add a little more oil to the pan, then the rice and peas and carrots. Press it flat and cook 3 minutes without stirring so it crisps, then stir-fry 2 minutes more. Return the ${c.pn}${c.mode === 'glaze' ? `, pour in the ${c.sauce},` : ''} and toss 1 minute.`,
    serve: c => `Spoon into bowls${(c.extras.length + c.toppings.length) ? ` and top with ${list([...c.extras, ...c.toppings])}` : ''}.` },
  'potatoes.roasted': { base: 'potatoes', label: 'Roasted potatoes', title: '{F} {P} with Crispy Potatoes', time: 40, egg: 'fried', poach: true, cut: 'pieces',
    ings: [g(8, 'oz', 'Yukon Gold or baby potatoes', { short: 'potatoes', p: 4 })],
    start: 'Start the potatoes. Heat the oven to 425°F. Cut the potatoes into 1-inch pieces, toss with a drizzle of oil and a big pinch of salt, and spread on a sheet pan. Roast 30–35 minutes, flipping halfway, until crisp and golden.',
    serve: c => `Pile the potatoes onto plates with ${c.top}.` },
  'potatoes.mashed': { base: 'potatoes', label: 'Mashed potatoes', title: '{F} {P} with Mashed Potatoes', time: 30, egg: 'fried', cut: 'pieces', not: ['eggs'],
    ings: [g(8, 'oz', 'Yukon Gold potatoes', { short: 'potatoes', p: 4 }), g(1, 'tbsp', 'butter', { tags: ['dairy'], alt: g(1, 'tbsp', 'olive oil', { key: 'olive oil' }) }), g(0.25, 'cup', 'milk', { tags: ['dairy'], p: 2, alt: broth(0.25) })],
    start: 'Start the potatoes. Peel and cut them into 1½-inch chunks, cover with cold salted water, and bring to a boil. Cook 12–15 minutes, until a fork slides in easily. Drain, then mash with the butter and warm milk and season with salt and pepper.',
    serve: c => `Spoon the mashed potatoes onto plates and top with ${c.top}.` },
  'potatoes.loaded': { base: 'potatoes', label: 'Loaded potatoes', title: '{F} {P} Loaded Potatoes', time: 15, egg: 'fried', poach: true, cut: 'small', not: ['salmon'],
    ings: [g(1, '', 'large russet potato', { pl: 'large russet potatoes', short: 'potatoes', p: 5 })],
    start: 'Start the potatoes. Scrub them and prick all over with a fork. Microwave 5 minutes, flip, and microwave 3–6 minutes more, until tender all the way through. (Or bake at 425°F for 50–60 minutes.)',
    serve: c => `Split each potato open and fluff the inside with a fork. Pile on ${c.top}.` },
  'potatoes.hash': { base: 'potatoes', label: 'Potato hash', title: '{F} {P} Potato Hash', time: 25, egg: 'fried', cut: 'small',
    ings: [g(8, 'oz', 'Yukon Gold potatoes', { short: 'potatoes', p: 4 }), onion(0.25, 'diced')],
    start: 'Start the hash. Cut the potatoes into ½-inch cubes and microwave them, covered, 4 minutes. Heat a good drizzle of oil in a second large skillet over medium-high, add the potatoes and onion, and cook 10–12 minutes, turning now and then, until browned and crisp. Season with salt and pepper.',
    serve: c => `Spoon the hash onto plates and top with ${c.top}.` },
  'pasta.tossed': { base: 'pasta', label: 'Pasta', title: '{F} {P} Pasta', time: 20, post: 2, egg: 'fried', cut: 'pieces',
    ings: fl => [g(3, 'oz', fl.asian ? 'spaghetti or linguine' : 'penne or rigatoni', { short: 'pasta', p: 11, key: 'dry pasta' })],
    start: 'Start the pasta. Bring a large pot of well-salted water to a boil and cook the pasta 1 minute less than the package says. Save ½ cup of the cooking water, then drain.',
    finish: c => ({
      simmer: 'Add the drained pasta to the sauce with a splash of the pasta water and toss 1 minute until glossy.',
      glaze: 'Add the drained pasta and a splash of pasta water to the skillet and toss everything together.',
      pan: 'Add the drained pasta and a splash of pasta water to the skillet and toss everything together.',
      drizzle: `Toss the hot pasta with the ${c.sauce} and a splash of pasta water.`,
      toss: `Toss the hot pasta with the ${c.sauce} and a splash of pasta water until creamy.`,
      none: 'Toss the hot pasta with a drizzle of olive oil, a splash of pasta water, and salt and pepper.'
    })[c.mode],
    serve: c => c.mixed
      ? `Divide among bowls${(c.extras.length + c.toppings.length) ? ` and top with ${list([...c.extras, ...c.toppings])}` : ''}.`
      : `Divide among bowls and top with ${list([c.p, ...c.extras, ...c.toppings])}.` },
  'veg.sheetpan': { base: 'veg', label: 'Sheet-pan vegetables', title: '{F} {P} with Roasted Vegetables', time: 30, egg: 'fried', poach: true, cut: 'pieces', ownVeg: true,
    veg: [broccoli(1), bpepper(0.5, 'cut into 1-inch pieces'), g(0.25, '', 'red onion', { pl: 'red onions', note: 'cut into wedges' })],
    start: c => `Start the vegetables. Heat the oven to 425°F. Toss the ${list(c.vegNames)} with a drizzle of oil, salt, and pepper, spread on a sheet pan, and roast 20–25 minutes, until browned at the edges.`,
    serve: c => `Divide the roasted vegetables among plates and top with ${c.top}.` },
  'veg.stirfry': { base: 'veg', label: 'Stir-fry', title: '{F} {P} Stir-Fry', time: 0, post: 5, egg: 'scrambled', cut: 'strips', ownVeg: true, stir: true,
    veg: [broccoli(0.75), bpepper(0.5, 'sliced'), g(0.5, 'cup', 'snap peas', { p: 1 }), g(0.5, '', 'carrot', { pl: 'carrots', note: 'thinly sliced' })],
    serve: c => `Serve hot${c.toppings.length ? `, topped with ${list(c.toppings)}` : ''}.` },
  'greens.salad': { base: 'greens', label: 'Salad', title: '{F} {P} Salad', time: 5, egg: 'boiled', cut: 'pieces', salad: true,
    ings: [g(3, 'cup', 'romaine or mixed greens', { note: 'chopped', short: 'greens', p: 2 })],
    serve: c => `Toss the greens with about half of the ${c.dress}. Top with ${c.top} and drizzle with the rest.` },
  'greens.lettuce': { base: 'greens', label: 'Lettuce wraps', title: '{F} {P} Lettuce Wraps', time: 5, egg: 'scrambled', cut: 'small', not: ['eggs'],
    ings: [g(0.5, 'head', 'butter lettuce', { note: 'leaves separated', short: 'lettuce', p: 1 })],
    serve: c => `Spoon ${c.p} into the lettuce cups${(c.extras.length + c.toppings.length) ? ` and top with ${list([...c.extras, ...c.toppings])}` : ''}.` },
  'oats.savory': { base: 'oats', label: 'Savory oats', title: '{F} {P} Savory Oat Bowls', time: 10, egg: 'fried', poach: true, cut: 'pieces',
    ings: [g(0.5, 'cup', 'rolled oats', { short: 'oats', p: 5 }), broth(1)],
    start: 'Start the oats. Bring the broth to a simmer in a saucepan, stir in the oats and a pinch of salt, and cook 5 minutes, stirring often, until creamy. Keep warm over low heat, adding a splash of water if they get too thick.',
    serve: c => `Spoon the oats into bowls and top with ${c.top}.` },
  'oats.risotto': { base: 'oats', label: 'Oat risotto', title: '{F} {P} Oat Risotto', time: 12, egg: 'fried', cut: 'pieces',
    ings: [g(0.5, 'cup', 'rolled oats', { short: 'oats', p: 5 }), broth(1), parm(2), g(1, 'tsp', 'butter', { tags: ['dairy'], alt: g(1, 'tsp', 'olive oil', { key: 'olive oil' }) })],
    start: 'Start the oat risotto. Melt the butter in a saucepan over medium and toast the oats 1–2 minutes. Add the broth a splash at a time, stirring, until the oats are creamy and tender, about 6 minutes. Stir in the parmesan and season with salt and pepper.',
    serve: c => `Spoon the risotto into shallow bowls and top with ${c.top}.` },
  'quinoa.bowl': { base: 'quinoa', label: 'Quinoa bowl', title: '{F} {P} Quinoa Bowls', time: 22, egg: 'boiled', poach: true, cut: 'pieces',
    ings: [g(1 / 3, 'cup', 'quinoa', { p: 8 })],
    start: 'Start the quinoa. Rinse it well in a fine strainer, then simmer with twice its volume of water and a pinch of salt, covered, for 15 minutes. Let it sit off the heat 5 minutes, then fluff.',
    serve: c => `Divide the quinoa among bowls and top with ${c.top}.` },
  'tortillas.tacos': { base: 'tortillas', label: 'Tacos', title: '{F} {P} Tacos', time: 3, egg: 'scrambled', cut: 'strips',
    ings: [g(3, '', 'small corn or flour tortilla', { pl: 'small corn or flour tortillas', short: 'tortillas', p: 5 })],
    serve: c => `Warm the tortillas in a dry skillet about 30 seconds per side, or wrap them in a damp paper towel and microwave 30 seconds. Fill with ${c.top}.` },
  'tortillas.wraps': { base: 'tortillas', label: 'Wraps', title: '{F} {P} Wraps', time: 3, egg: 'scrambled', cut: 'strips', serveOwn: true,
    ings: [g(1, '', 'large (10-inch) flour tortilla', { pl: 'large (10-inch) flour tortillas', short: 'tortillas', p: 6 }), g(0.5, 'cup', 'romaine', { note: 'shredded' })],
    serve: c => `Warm the tortillas so they fold without cracking. Lay down the romaine, then ${list([c.p, ...c.extras, ...c.toppings, ...c.garnish])}${c.inSauce ? `, and a spoonful of the ${c.sauce}` : ''}. Fold in the sides, roll up tightly, and cut in half on the diagonal.` },
  'tortillas.quesadillas': { base: 'tortillas', label: 'Quesadillas', title: '{F} {P} Quesadillas', time: 0, post: 8, egg: 'scrambled', cut: 'small', serveOwn: true, not: ['salmon'],
    ings: [g(2, '', '8-inch flour tortilla', { pl: '8-inch flour tortillas', short: 'tortillas', p: 8 }), g(0.5, 'cup', 'Monterey Jack or cheddar', { note: 'shredded', short: 'cheese', tags: ['dairy'], p: 13 })],
    serve: c => `Lay the tortillas flat. Scatter cheese over half of each, add ${list([c.p, ...c.extras])}, and finish with a little more cheese. Fold and cook in a dry skillet over medium 2–3 minutes per side, until golden and melted. Cut into wedges${c.side.length ? ` and serve with ${list(c.side)}` : ''}.` }
};

function list(arr) {
  arr = arr.filter(Boolean);
  if (arr.length <= 1) return arr.join('');
  if (arr.length === 2) return arr.join(' and ');
  return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
}
/* ===== Two-base combos: offered only when both bases are selected ===== */
const bed = () => g(2, 'cup', 'romaine or mixed greens', { note: 'chopped', short: 'greens', p: 1 });
function combo(id, host, extra) { FORMATS[id] = { ...FORMATS[host], host, ...extra }; }
const RICE_INGS = FORMATS['rice.bowl'].ings, RICE_START = FORMATS['rice.bowl'].start;
const QUINOA_INGS = FORMATS['quinoa.bowl'].ings, QUINOA_START = FORMATS['quinoa.bowl'].start;
const VEG_START = FORMATS['veg.sheetpan'].start;

combo('rice+greens.bowl', 'rice.bowl', { bases: ['rice', 'greens'], label: 'Rice + greens bowl', title: '{F} {P} Rice and Greens Bowls', groupTitle: 'Rice and greens',
  ings: [...RICE_INGS, bed()],
  serve: c => `Make a bed of greens in each bowl, spoon the rice alongside, and top with ${c.top}.` });
combo('quinoa+greens.bowl', 'quinoa.bowl', { bases: ['quinoa', 'greens'], label: 'Quinoa + greens bowl', title: '{F} {P} Quinoa and Greens Bowls', groupTitle: 'Quinoa and greens',
  ings: [...QUINOA_INGS, bed()],
  serve: c => `Make a bed of greens in each bowl, spoon the quinoa alongside, and top with ${c.top}.` });
combo('potatoes+greens.plate', 'potatoes.roasted', { bases: ['potatoes', 'greens'], label: 'Potatoes + greens', title: '{F} {P} with Crispy Potatoes and Greens', groupTitle: 'Potatoes and greens',
  ings: [...FORMATS['potatoes.roasted'].ings, bed()],
  serve: c => `Make a bed of greens on each plate, pile on the crispy potatoes, and top with ${c.top}.` });
combo('veg+greens.bowl', 'veg.sheetpan', { bases: ['veg', 'greens'], label: 'Roasted veg + greens', title: '{F} {P} Bowls with Roasted Vegetables and Greens', groupTitle: 'Greens',
  ings: [bed()],
  serve: c => `Make a bed of greens in each bowl, add the roasted vegetables, and top with ${c.top}.` });
combo('veg+rice.bowl', 'veg.sheetpan', { bases: ['veg', 'rice'], label: 'Rice + roasted veg', title: '{F} {P} Bowls with Rice and Roasted Vegetables', groupTitle: 'Rice',
  ings: [...RICE_INGS], start: c => [RICE_START, VEG_START(c)],
  serve: c => `Divide the rice among bowls, add the roasted vegetables, and top with ${c.top}.` });
combo('veg+quinoa.bowl', 'veg.sheetpan', { bases: ['veg', 'quinoa'], label: 'Quinoa + roasted veg', title: '{F} {P} Bowls with Quinoa and Roasted Vegetables', groupTitle: 'Quinoa',
  ings: [...QUINOA_INGS], start: c => [QUINOA_START, VEG_START(c)],
  serve: c => `Divide the quinoa among bowls, add the roasted vegetables, and top with ${c.top}.` });
combo('veg+potatoes.sheetpan', 'veg.sheetpan', { bases: ['veg', 'potatoes'], label: 'Potatoes + roasted veg', title: '{F} {P} with Roasted Potatoes and Vegetables', groupTitle: 'Potatoes', time: 40,
  ings: [g(8, 'oz', 'Yukon Gold or baby potatoes', { short: 'potatoes', p: 4 })],
  start: c => `Start the sheet pan. Heat the oven to 425°F. Cut the potatoes into 1-inch pieces, toss with a drizzle of oil and a big pinch of salt, and roast 10 minutes. Add the ${list(c.vegNames)} tossed with oil, salt, and pepper, and roast 20–25 minutes more, flipping once, until everything is browned.`,
  serve: c => `Divide the potatoes and vegetables among plates and top with ${c.top}.` });
/* ===== Flavors, part 1 ===== */
const FLAVORS = [
{ id: 'teriyaki', name: 'Teriyaki', cuisine: 'Japanese', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'veg.stirfry', 'veg.sheetpan', 'quinoa.bowl', 'greens.lettuce'],
  sauce: { name: 'Teriyaki sauce', mode: 'glaze', water: true, ings: [soy(1.5), g(1, 'tbsp', 'mirin'), honey(2), ricevin(1), ginger(0.5), garlic(1), cstarch()] },
  extras: [{ how: 'steam', ings: [broccoli(1)] }],
  garnish: [sesame(), scal()] },

{ id: 'honey-garlic', name: 'Honey-Garlic', cuisine: 'American-Chinese', heat: 0, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'potatoes.mashed', 'veg.sheetpan', 'veg.stirfry'],
  sauce: { name: 'Honey-garlic sauce', mode: 'glaze', water: true, ings: [honey(1, 'tbsp'), soy(1), garlic(2), g(1, 'tsp', 'apple cider vinegar'), cstarch(), flakes()] },
  extras: [{ how: 'steam', ings: [greenbeans()] }],
  garnish: [sesame(), scal()] },

{ id: 'lemon-herb', name: 'Lemon-Herb', cuisine: 'Mediterranean', heat: 0, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'potatoes.hash', 'pasta.tossed', 'veg.sheetpan', 'greens.salad', 'oats.risotto', 'tortillas.wraps'],
  rub: [oregano(0.5), garlicP()],
  sauce: { name: 'Lemon-herb dressing', mode: 'drizzle', ings: [g(1, 'tbsp', 'olive oil', { key: 'olive oil' }), lemon(1), garlic(0.5, 'grated'), parsley(1), g(0.5, 'tsp', 'Dijon mustard', { short: 'Dijon' }), honey(0.25)] },
  extras: [{ how: 'saute', ings: [g(0.5, '', 'zucchini', { pl: 'zucchini', note: 'sliced into half-moons' })] }],
  toppings: [tomatoes()],
  garnish: [feta()] },

{ id: 'greek', name: 'Greek', cuisine: 'Greek', heat: 0, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'greens.salad', 'tortillas.wraps', 'veg.sheetpan'],
  titles: { 'tortillas.wraps': 'Greek {P} Gyro Wraps' },
  rub: [oregano(1), garlicP(), g(0.25, 'tsp', 'paprika')],
  sauce: { name: 'Tzatziki', altName: 'Herby hummus sauce', mode: 'drizzle', ings: [yogurt(4, { alt: g(3, 'tbsp', 'hummus', { p: 2 }) }), g(2, 'tbsp', 'cucumber', { note: 'grated', key: 'cucumber' }), garlic(0.5, 'grated'), lemon(1, 'tsp'), g(0.25, 'tsp', 'dried dill', { short: 'dill' })] },
  toppings: [cucumber(0.5), tomatoes(), redonion()],
  garnish: [g(2, 'tbsp', 'kalamata olives', { note: 'halved', opt: true }), feta()] },

{ id: 'tex-mex', name: 'Tex-Mex', cuisine: 'Tex-Mex', heat: 1, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.salad', 'potatoes.loaded', 'potatoes.hash', 'veg.sheetpan', 'tortillas.tacos', 'tortillas.wraps', 'tortillas.quesadillas'],
  titles: { 'rice.bowl': '{P} Burrito Bowls', 'greens.salad': '{P} Taco Salad', 'veg.sheetpan': 'Sheet-Pan {P} Fajitas' },
  vegMix: [bpepper(1, 'cut into strips'), onion(0.5, 'cut into wedges')],
  rub: [g(1, 'tsp', 'chili powder'), cumin(0.5), smoked(0.25), garlicP()],
  sauce: { name: 'Salsa', mode: 'drizzle', noMake: true, notDressing: true, ings: [g(3, 'tbsp', 'jarred salsa', { short: 'salsa' })] },
  extras: [{ how: 'saute', ings: [bpepper(0.5), onion(0.25)] }],
  toppings: [blackbeans(['rice.bowl', 'quinoa.bowl', 'greens.salad', 'potatoes.loaded'])],
  garnish: [cheddar(2, 'tbsp', { opt: true, skipIn: ['tortillas.quesadillas'] }), g(1, 'tbsp', 'sour cream', { opt: true, tags: ['dairy'] }), avocado(), cil()] },

{ id: 'chipotle-lime', name: 'Chipotle-Lime', cuisine: 'Mexican', heat: 2, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.salad', 'potatoes.loaded', 'potatoes.roasted', 'veg.sheetpan', 'tortillas.tacos', 'tortillas.quesadillas', 'tortillas.wraps'],
  sauce: { name: 'Chipotle-lime glaze', mode: 'glaze', water: true, ings: [g(1, 'tsp', 'chipotle in adobo', { note: 'minced', short: 'chipotle', tags: ['spicy'] }), lime(1), honey(2), garlic(1), cumin(0.25)] },
  extras: [{ how: 'sear', ings: [g(0.5, 'cup', 'corn kernels', { note: 'frozen and thawed', short: 'corn', p: 2 })] }],
  toppings: [tomatoes(0.5, { only: ['greens.salad', 'rice.bowl', 'quinoa.bowl'] })],
  garnish: [yogurt(2, { opt: true, note: 'or sour cream' }), avocado(), cil()] },

{ id: 'cajun', name: 'Cajun', cuisine: 'Cajun', heat: 1, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'potatoes.hash', 'veg.sheetpan', 'pasta.tossed', 'oats.savory', 'tortillas.tacos'],
  titles: { 'rice.bowl': 'Cajun {P} and Rice', 'oats.savory': 'Cajun {P} and Cheesy Savory Oats' },
  rub: [g(1.5, 'tsp', 'Cajun seasoning', { note: 'use less salt if yours is salted' }), garlicP()],
  extras: [{ how: 'saute', ings: [bpepper(0.5, 'diced'), g(1, 'stalk', 'celery', { note: 'diced' }), onion(0.25, 'diced')] }],
  garnish: [scal(), g(1, 'tsp', 'hot sauce', { opt: true, tags: ['spicy'] })],
  by: {
    'pasta.tossed': { title: 'Cajun {P} Cream Pasta',
      sauce: { name: 'Cajun cream sauce', mode: 'simmer', ings: [garlic(1), cream(1 / 3), parm(2), g(0.5, 'tsp', 'Cajun seasoning')],
        cook: 'Turn the heat to medium. Add the garlic and cook 30 seconds. Pour in the cream and simmer 2–3 minutes until it thickens slightly, then stir in the parmesan and the extra Cajun seasoning.' } },
    'oats.savory': { baseAdd: [cheddar(0.25, 'cup')], baseNote: 'Stir the cheddar into the oats right before serving.' }
  } },

{ id: 'garlic-butter', name: 'Garlic-Butter', cuisine: 'American', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'potatoes.mashed', 'pasta.tossed', 'rice.bowl', 'quinoa.bowl', 'veg.sheetpan', 'oats.risotto'],
  sauce: { name: 'Garlic butter', mode: 'pan', ings: [g(1, 'tbsp', 'butter', { tags: ['dairy'] }), garlic(2), lemon(1, 'tsp'), parsley(1), flakes()],
    cook: 'Turn the heat to medium. Add the butter and garlic and stir 1 minute until fragrant, then add the lemon juice and parsley.' },
  extras: [{ how: 'steam', ings: [greenbeans()] }] },

{ id: 'tuscan', name: 'Creamy Tuscan', cuisine: 'Italian', heat: 0, eggs: true,
  formats: ['pasta.tossed', 'potatoes.mashed', 'rice.bowl', 'oats.risotto', 'quinoa.bowl'],
  titles: { 'rice.bowl': 'Creamy Tuscan {P} over Rice', 'quinoa.bowl': 'Creamy Tuscan {P} over Quinoa' },
  rub: [g(0.5, 'tsp', 'Italian seasoning')],
  sauce: { name: 'Tuscan cream sauce', mode: 'simmer', ings: [garlic(1), g(2, 'tbsp', 'sun-dried tomatoes', { note: 'chopped' }), broth(0.25), cream(1 / 3), g(0.5, 'tsp', 'Italian seasoning'), g(1, 'cup', 'baby spinach', { short: 'spinach', p: 1 }), parm(2)],
    cook: 'Turn the heat to medium. Add the garlic and sun-dried tomatoes and stir 1 minute. Pour in the broth and cream, add the Italian seasoning, and simmer 3 minutes until slightly thickened. Stir in the spinach until it wilts, then the parmesan.' } },

{ id: 'marinara', name: 'Marinara', cuisine: 'Italian', heat: 0, eggs: true, proteins: ['chicken', 'beef', 'steak', 'pork', 'shrimp', 'turkey', 'eggs'],
  formats: ['pasta.tossed', 'veg.sheetpan'],
  titles: { 'pasta.tossed': '{P} Marinara Pasta', 'pasta.tossed@eggs': 'Marinara Pasta with Fried Eggs', 'veg.sheetpan': '{P} Marinara with Roasted Vegetables' },
  rub: [g(0.5, 'tsp', 'Italian seasoning')],
  sauce: { name: 'Marinara', mode: 'simmer', ings: [garlic(1), g(0.75, 'cup', 'crushed tomatoes', { p: 1.5 }), g(0.5, 'tsp', 'Italian seasoning'), flakes()],
    cook: 'Turn the heat to medium. Add the garlic and Italian seasoning and stir 30 seconds. Pour in the crushed tomatoes, season with salt, and simmer 8–10 minutes until thickened.', time: 10 },
  garnish: [parm(2, { opt: true }), g(4, '', 'fresh basil leaf', { pl: 'fresh basil leaves', opt: true, short: 'basil' })] },

{ id: 'pesto', name: 'Pesto', cuisine: 'Italian', heat: 0, eggs: true,
  formats: ['pasta.tossed', 'quinoa.bowl', 'potatoes.roasted', 'veg.sheetpan', 'greens.salad', 'tortillas.wraps', 'oats.risotto'],
  sauce: { name: 'Pesto', mode: 'toss', noMake: true, ings: [g(2, 'tbsp', 'basil pesto', { short: 'pesto', tags: ['dairy', 'nuts'], p: 2 })] },
  toppings: [tomatoes()],
  garnish: [parm(1, { opt: true }), g(1, 'tbsp', 'pine nuts', { note: 'toasted', opt: true, tags: ['nuts'], p: 1 })],
  by: { 'greens.salad': { sauce: { name: 'Pesto vinaigrette', mode: 'drizzle', ings: [g(1.5, 'tbsp', 'basil pesto', { short: 'pesto', tags: ['dairy', 'nuts'], p: 1.5 }), g(2, 'tsp', 'olive oil', { key: 'olive oil' }), lemon(2, 'tsp')] } } } },

{ id: 'gochujang', name: 'Gochujang', cuisine: 'Korean', heat: 2, eggs: true, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'quinoa.bowl', 'greens.lettuce', 'tortillas.tacos', 'veg.stirfry', 'oats.savory'],
  titles: { 'tortillas.tacos': 'Korean Gochujang {P} Tacos' },
  sauce: { name: 'Gochujang sauce', mode: 'glaze', water: true, ings: [g(1, 'tbsp', 'gochujang', { tags: ['spicy'] }), soy(2, 'tsp'), honey(2), ricevin(1), sesoil(1), garlic(1, 'grated')] },
  toppings: [cucumber(0.5, 'thinly sliced'), g(0.25, 'cup', 'kimchi', { note: 'chopped', opt: true })],
  garnish: [scal(), sesame()] },

{ id: 'korean-bbq', name: 'Korean BBQ', cuisine: 'Korean', heat: 0, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'quinoa.bowl', 'greens.lettuce', 'tortillas.tacos', 'veg.stirfry'],
  sauce: { name: 'Korean BBQ sauce', mode: 'glaze', water: true, ings: [soy(1.5), g(2, 'tsp', 'brown sugar'), sesoil(1), garlic(1, 'grated'), ginger(0.5), ricevin(0.5), cstarch()] },
  toppings: [carrot(), cucumber(0.25, 'thinly sliced')],
  garnish: [scal(), sesame()] },

{ id: 'thai-peanut', name: 'Thai Peanut', cuisine: 'Thai', heat: 1, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'pasta.tossed', 'greens.salad', 'greens.lettuce', 'tortillas.wraps', 'veg.stirfry'],
  titles: { 'pasta.tossed': 'Thai Peanut {P} Noodles' },
  sauce: { name: 'Peanut sauce', mode: 'drizzle', ings: [g(1.5, 'tbsp', 'creamy peanut butter', { short: 'peanut butter', tags: ['nuts'], p: 6 }), soy(2, 'tsp'), lime(2, 'tsp'), honey(1), g(0.5, 'tsp', 'sriracha', { opt: true, tags: ['spicy'] }), garlic(0.5, 'grated')],
    make: 'Make the peanut sauce: whisk together the {list} with 1–2 tablespoons of warm water per serving until it pours easily.' },
  toppings: [g(0.75, 'cup', 'shredded cabbage or coleslaw mix', { short: 'cabbage' }), carrot()],
  garnish: [g(1, 'tbsp', 'roasted peanuts', { note: 'chopped', short: 'peanuts', opt: true, tags: ['nuts'], p: 2 }), cil()] },

{ id: 'red-curry', name: 'Thai Red Curry', cuisine: 'Thai', heat: 2, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl'],
  titles: { 'rice.bowl': 'Thai Red Curry {P} with Rice', 'quinoa.bowl': 'Thai Red Curry {P} over Quinoa' },
  sauce: { name: 'Red curry sauce', mode: 'simmer', ings: [g(1, 'tbsp', 'Thai red curry paste', { short: 'curry paste', tags: ['spicy'] }), g(0.5, 'cup', 'canned coconut milk', { short: 'coconut milk', tags: ['coconut'], p: 1 }), g(0.5, 'tsp', 'fish sauce'), g(0.5, 'tsp', 'brown sugar'), bpepper(0.5), g(0.5, 'cup', 'snap peas', { p: 1 }), lime(1, 'tsp')],
    cook: 'Turn the heat to medium. Stir the curry paste into the pan for 30 seconds, then add the coconut milk, fish sauce, and brown sugar. Add the bell pepper and snap peas and simmer 4–5 minutes until crisp-tender. Stir in the lime juice.', time: 6 },
  garnish: [g(1, 'tbsp', 'fresh basil or cilantro', { note: 'torn', short: 'basil or cilantro', opt: true })] },

{ id: 'coconut-curry', name: 'Coconut Curry', cuisine: 'Indian-inspired', heat: 0, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'veg.sheetpan', 'oats.savory'],
  titles: { 'rice.bowl': 'Coconut Curry {P} with Rice', 'quinoa.bowl': 'Coconut Curry {P} over Quinoa', 'oats.savory': 'Coconut Curry {P} Masala Oats' },
  sauce: { name: 'Coconut curry sauce', mode: 'simmer', ings: [garlic(1), ginger(0.5), g(1.5, 'tsp', 'curry powder'), g(0.5, 'cup', 'canned coconut milk', { short: 'coconut milk', tags: ['coconut'], p: 1 }), g(0.25, 'cup', 'crushed tomatoes', { p: 0.5 }), g(1, 'cup', 'baby spinach', { short: 'spinach', p: 1 })],
    cook: 'Turn the heat to medium. Add the garlic, ginger, and curry powder and stir 30 seconds. Pour in the coconut milk and crushed tomatoes, season with salt, and simmer 5 minutes. Stir in the spinach until it wilts.', time: 6 },
  garnish: [cil()] },

{ id: 'tikka', name: 'Tikka Masala', cuisine: 'Indian', heat: 1, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'veg.sheetpan', 'tortillas.wraps'],
  titles: { 'rice.bowl': '{P} Tikka Masala with Rice', 'quinoa.bowl': '{P} Tikka Masala over Quinoa', 'potatoes.roasted': '{P} Tikka Masala with Crispy Potatoes', 'veg.sheetpan': '{P} Tikka Masala with Roasted Vegetables', 'tortillas.wraps': '{P} Tikka Masala Wraps' },
  rub: [g(1, 'tsp', 'garam masala'), cumin(0.5), g(0.25, 'tsp', 'ground turmeric', { short: 'turmeric' })],
  sauce: { name: 'Tikka masala sauce', mode: 'simmer', ings: [garlic(1), ginger(0.5), g(0.5, 'tsp', 'garam masala'), g(0.5, 'cup', 'crushed tomatoes', { p: 1 }), pinch('sugar'), cream(2, 'tbsp', { alt: g(2, 'tbsp', 'canned coconut milk', { short: 'coconut milk', tags: ['coconut'] }) })],
    cook: 'Turn the heat to medium. Add the garlic, ginger, and garam masala and stir 30 seconds. Add the crushed tomatoes and sugar and simmer 5 minutes, then stir in the cream.', time: 6 },
  garnish: [cil()] },

{ id: 'bbq', name: 'BBQ', cuisine: 'American', heat: 0,
  formats: ['potatoes.loaded', 'potatoes.roasted', 'rice.bowl', 'quinoa.bowl', 'greens.salad', 'tortillas.tacos', 'tortillas.wraps', 'tortillas.quesadillas', 'veg.sheetpan'],
  titles: { 'greens.salad': 'BBQ {P} Chopped Salad' },
  rub: [smoked(0.5), garlicP(), g(0.5, 'tsp', 'brown sugar')],
  sauce: { name: 'BBQ sauce', mode: 'glaze', noMake: true, ings: [g(3, 'tbsp', 'BBQ sauce')] },
  dressing: { name: 'Ranch', ings: [g(2, 'tbsp', 'ranch dressing', { tags: ['dairy'] })] },
  toppings: [g(0.5, 'cup', 'coleslaw mix', { note: 'tossed with a splash of cider vinegar', short: 'slaw' })],
  garnish: [g(2, 'tbsp', 'dill pickle chips', { opt: true, short: 'pickles' }), cheddar(2, 'tbsp', { opt: true }), redonion(1)] },

{ id: 'buffalo', name: 'Buffalo', cuisine: 'American', heat: 2,
  formats: ['greens.salad', 'tortillas.wraps', 'tortillas.quesadillas', 'tortillas.tacos', 'potatoes.loaded', 'rice.bowl', 'quinoa.bowl'],
  sauce: { name: 'Buffalo sauce', mode: 'glaze', ings: [g(2, 'tbsp', 'cayenne pepper hot sauce', { note: 'such as Frank’s', short: 'hot sauce', tags: ['spicy'] }), g(1, 'tsp', 'butter', { tags: ['dairy'], alt: g(1, 'tsp', 'olive oil', { key: 'olive oil' }) })],
    make: 'Make the buffalo sauce: melt the {list} together in the microwave, about 20 seconds, and stir.' },
  dressing: { name: 'Ranch or blue cheese dressing', ings: [g(2, 'tbsp', 'ranch or blue cheese dressing', { short: 'dressing', tags: ['dairy'] })] },
  toppings: [g(0.5, 'stalk', 'celery', { note: 'thinly sliced' }), carrot()],
  garnish: [g(1, 'tbsp', 'ranch or blue cheese dressing', { opt: true, tags: ['dairy'], short: 'ranch or blue cheese dressing', skipIn: ['greens.salad'] })] },

{ id: 'moroccan', name: 'Moroccan-Spiced', cuisine: 'North African', heat: 0, eggs: true,
  formats: ['quinoa.bowl', 'rice.bowl', 'veg.sheetpan', 'greens.salad', 'potatoes.roasted', 'tortillas.wraps'],
  rub: [cumin(0.5), g(0.5, 'tsp', 'ground coriander', { short: 'coriander' }), smoked(0.5), g(1 / 8, 'tsp', 'ground cinnamon', { short: 'cinnamon' })],
  sauce: { name: 'Lemon-honey dressing', mode: 'drizzle', ings: [g(1, 'tbsp', 'olive oil', { key: 'olive oil' }), lemon(2, 'tsp'), honey(0.5), pinch('ground cumin', { short: 'cumin' })] },
  extras: [{ how: 'saute', ings: [g(1 / 3, 'cup', 'canned chickpeas', { note: 'rinsed and patted dry', short: 'chickpeas', p: 4 })], text: 'Heat a drizzle of oil in a large skillet over medium-high and fry the chickpeas 4–5 minutes, shaking the pan, until golden and a little crisp. Season with salt and move to a plate.' }],
  toppings: [carrot(), g(1, 'tbsp', 'golden raisins', { opt: true })],
  garnish: [parsley(1, { opt: true }), g(1, 'tbsp', 'sliced almonds', { note: 'toasted', short: 'almonds', opt: true, tags: ['nuts'], p: 1 })] },

{ id: 'chimichurri', name: 'Chimichurri', cuisine: 'Argentine', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'potatoes.hash', 'rice.bowl', 'quinoa.bowl', 'veg.sheetpan', 'greens.salad', 'tortillas.tacos'],
  titles: { 'potatoes.roasted': '{P} Chimichurri with Crispy Potatoes' },
  sauce: { name: 'Chimichurri', mode: 'drizzle', ings: [g(0.25, 'cup', 'fresh parsley', { note: 'finely chopped', short: 'parsley' }), g(1.5, 'tbsp', 'olive oil', { key: 'olive oil' }), g(2, 'tsp', 'red wine vinegar'), garlic(1), oregano(0.25), flakes()],
    make: 'Make the chimichurri: stir together the {list} with a pinch of salt and let it sit while you cook.' },
  toppings: [tomatoes(0.5, { only: ['greens.salad', 'quinoa.bowl', 'rice.bowl'] })] },

{ id: 'ginger-scallion', name: 'Ginger-Scallion', cuisine: 'Chinese', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'quinoa.bowl', 'veg.stirfry', 'oats.savory', 'pasta.tossed', 'greens.lettuce'],
  titles: { 'oats.savory': 'Ginger-Scallion {P} Oat Congee', 'pasta.tossed': 'Ginger-Scallion {P} Noodles' },
  sauce: { name: 'Ginger-scallion sauce', mode: 'drizzle', ings: [g(2, '', 'scallion', { pl: 'scallions', note: 'finely sliced', short: 'scallions' }), ginger(1, 'tbsp'), g(1.5, 'tbsp', 'avocado oil'), soy(1, 'tsp'), ricevin(0.5)],
    make: 'Make the ginger-scallion sauce: put the scallions, ginger, and a pinch of salt in a heatproof bowl. Heat the avocado oil in a small pan until it shimmers, then pour it over (it will sizzle). Stir in the soy sauce and rice vinegar.' },
  extras: [{ how: 'steam', ings: [g(1, 'head', 'baby bok choy', { note: 'halved', short: 'bok choy', p: 1 })] }],
  garnish: [sesame()],
  by: { 'oats.savory': { baseNote: 'For a looser, congee-style bowl, stir in an extra ¼ cup of broth per serving.' } } },

{ id: 'orange-sesame', name: 'Orange-Sesame', cuisine: 'American-Chinese', heat: 0, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'veg.sheetpan', 'greens.lettuce'],
  sauce: { name: 'Orange-sesame sauce', mode: 'glaze', ings: [g(3, 'tbsp', 'orange juice'), g(0.5, 'tsp', 'orange zest'), soy(1), honey(2), ricevin(1), garlic(1), ginger(0.25), cstarch(), sesoil(0.5)] },
  extras: [{ how: 'steam', ings: [broccoli(1)] }],
  garnish: [sesame(), scal()] },

{ id: 'jerk', name: 'Jerk', cuisine: 'Jamaican', heat: 2,
  formats: ['rice.bowl', 'quinoa.bowl', 'tortillas.tacos', 'greens.salad', 'potatoes.roasted', 'veg.sheetpan'],
  rub: [g(1.5, 'tsp', 'jerk seasoning', { tags: ['spicy'] }), lime(1, 'tsp')],
  sauce: { name: 'Pineapple salsa', mode: 'drizzle', notDressing: true, ings: [g(0.5, 'cup', 'pineapple', { note: 'finely diced' }), g(1, 'tbsp', 'red onion', { note: 'minced' }), lime(1, 'tsp'), cil(), g(0.25, '', 'jalapeño', { pl: 'jalapeños', note: 'minced', opt: true, tags: ['spicy'] })],
    make: 'Make the pineapple salsa: stir together the {list} with a pinch of salt.' } },

{ id: 'lemon-pepper', name: 'Lemon-Pepper', cuisine: 'American', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'potatoes.mashed', 'pasta.tossed', 'rice.bowl', 'quinoa.bowl', 'veg.sheetpan', 'greens.salad', 'oats.savory'],
  rub: [g(1, 'tsp', 'lemon-pepper seasoning'), garlicP()],
  sauce: { name: 'Lemon butter', mode: 'pan', ings: [g(2, 'tsp', 'butter', { tags: ['dairy'], alt: g(2, 'tsp', 'olive oil', { key: 'olive oil' }) }), lemon(1), parsley(1)],
    cook: 'Turn the heat to medium-low. Add the butter and lemon juice and swirl until it melts into a glossy sauce, then add the parsley.' },
  extras: [{ how: 'steam', ings: [g(1, 'cup', 'asparagus', { note: 'cut into 2-inch pieces', p: 3 })] }] }
];
/* ===== Flavors, part 2 ===== */
FLAVORS.push(
{ id: 'smoky-paprika', name: 'Smoky Paprika', cuisine: 'Spanish', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'potatoes.hash', 'rice.bowl', 'quinoa.bowl', 'veg.sheetpan', 'oats.savory', 'greens.salad'],
  rub: [smoked(1), garlicP(0.5), cumin(0.25)],
  sauce: { name: 'Roasted red pepper sauce', mode: 'drizzle', ings: [g(0.25, 'cup', 'jarred roasted red peppers', { short: 'roasted red peppers' }), g(1, 'tsp', 'olive oil', { key: 'olive oil' }), g(0.5, 'tsp', 'red wine vinegar'), garlic(0.5), smoked(0.25)],
    make: 'Make the red pepper sauce: blend or very finely chop the {list} with a pinch of salt until smooth.' },
  garnish: [parsley(1, { opt: true }), g(1, 'tbsp', 'sliced almonds', { note: 'toasted', short: 'almonds', opt: true, tags: ['nuts'], p: 1 })] },

{ id: 'ranch', name: 'Ranch', cuisine: 'American', heat: 0, proteins: ['chicken', 'beef', 'steak', 'pork', 'shrimp', 'turkey'],
  formats: ['potatoes.loaded', 'potatoes.roasted', 'greens.salad', 'tortillas.wraps', 'veg.sheetpan', 'quinoa.bowl'],
  rub: [g(1, 'tsp', 'ranch seasoning')],
  sauce: { name: 'Yogurt ranch', mode: 'drizzle', ings: [yogurt(3), g(0.5, 'tsp', 'ranch seasoning'), lemon(0.5, 'tsp')],
    make: 'Make the yogurt ranch: whisk the {list} with a splash of water until it drizzles.' },
  toppings: [tomatoes(0.5, { only: ['greens.salad', 'potatoes.loaded', 'quinoa.bowl', 'tortillas.wraps'] })],
  garnish: [cheddar(2, 'tbsp', { opt: true }), g(1, 'tbsp', 'fresh chives', { note: 'chopped', short: 'chives', opt: true })] },

{ id: 'caesar', name: 'Caesar', cuisine: 'American-Italian', heat: 0, eggs: true,
  formats: ['greens.salad', 'tortillas.wraps', 'quinoa.bowl'],
  titles: { 'greens.salad': '{P} Caesar Salad', 'tortillas.wraps': '{P} Caesar Wraps', 'quinoa.bowl': '{P} Caesar Quinoa Bowls' },
  rub: [garlicP()],
  sauce: { name: 'Caesar dressing', mode: 'drizzle', ings: [yogurt(2), parm(1), lemon(1, 'tsp'), g(0.5, 'tsp', 'Dijon mustard', { short: 'Dijon' }), g(0.5, 'tsp', 'Worcestershire sauce', { short: 'Worcestershire' }), garlic(0.5, 'grated'), g(1, 'tsp', 'olive oil', { key: 'olive oil' })] },
  toppings: [g(0.5, 'cup', 'romaine', { note: 'shredded', only: ['quinoa.bowl'] })],
  garnish: [parm(1, { opt: true, note: 'shaved' }), g(0.25, 'cup', 'croutons', { opt: true, only: ['greens.salad'], p: 1 })] },

{ id: 'miso-ginger', name: 'Miso-Ginger', cuisine: 'Japanese', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'oats.savory', 'greens.salad', 'veg.sheetpan', 'veg.stirfry'],
  sauce: { name: 'Miso-ginger glaze', mode: 'glaze', water: true, ings: [g(2, 'tsp', 'white miso', { short: 'miso', p: 1 }), soy(1, 'tsp'), honey(1), ricevin(1), ginger(0.5), sesoil(0.5)] },
  toppings: [g(0.25, 'cup', 'shelled edamame', { note: 'thawed', short: 'edamame', p: 4 }), carrot()],
  garnish: [scal(), sesame()] },

{ id: 'mushroom-thyme', name: 'Mushroom-Thyme', cuisine: 'French', heat: 0, eggs: true,
  formats: ['potatoes.mashed', 'oats.risotto', 'pasta.tossed', 'rice.bowl', 'quinoa.bowl'],
  sauce: { name: 'Mushroom-thyme sauce', mode: 'simmer', ings: [g(1, 'cup', 'cremini mushrooms', { note: 'sliced', short: 'mushrooms', tags: ['mushroom'], p: 2 }), garlic(1), g(0.25, 'tsp', 'dried thyme', { short: 'thyme' }), broth(1 / 3), cream(2, 'tbsp'), g(0.5, 'tsp', 'Dijon mustard', { short: 'Dijon' })],
    cook: 'Turn the heat to medium. Add the mushrooms with a pinch of salt and cook 5–6 minutes until browned. Add the garlic and thyme for 30 seconds, then pour in the broth, scraping up the browned bits. Stir in the cream and Dijon and simmer 2 minutes.', time: 9 } },

{ id: 'maple-dijon', name: 'Maple-Dijon', cuisine: 'American', heat: 0, proteins: ['chicken', 'pork', 'salmon', 'steak'],
  formats: ['potatoes.roasted', 'potatoes.mashed', 'veg.sheetpan', 'quinoa.bowl', 'rice.bowl', 'greens.salad'],
  sauce: { name: 'Maple-Dijon glaze', mode: 'glaze', ings: [g(1, 'tbsp', 'Dijon mustard', { short: 'Dijon' }), g(2, 'tsp', 'maple syrup'), g(0.5, 'tsp', 'apple cider vinegar'), garlic(0.5), pinch('dried thyme', { short: 'thyme' })] },
  extras: [{ how: 'saute', ings: [g(1, 'cup', 'Brussels sprouts', { note: 'halved', p: 3 })], text: 'Heat a drizzle of oil in a large skillet over medium-high. Cook the Brussels sprouts cut side down 5–6 minutes until deeply browned, stir, and cook 2 minutes more. Season with salt and move to a plate.', time: 8 }] },

{ id: 'balsamic', name: 'Balsamic-Rosemary', cuisine: 'Italian', heat: 0, proteins: ['chicken', 'pork', 'steak', 'salmon', 'shrimp'],
  formats: ['potatoes.roasted', 'veg.sheetpan', 'greens.salad', 'quinoa.bowl', 'pasta.tossed'],
  sauce: { name: 'Balsamic glaze', mode: 'glaze', ings: [g(1.5, 'tbsp', 'balsamic vinegar'), honey(1), garlic(1), g(0.25, 'tsp', 'dried rosemary', { note: 'crushed', short: 'rosemary' })] },
  toppings: [tomatoes()],
  garnish: [g(1, 'oz', 'fresh mozzarella pearls', { short: 'mozzarella', opt: true, tags: ['dairy'], p: 6 }), g(4, '', 'fresh basil leaf', { pl: 'fresh basil leaves', opt: true, short: 'basil' })] },

{ id: 'salsa-verde', name: 'Salsa Verde', cuisine: 'Mexican', heat: 1, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'tortillas.tacos', 'tortillas.quesadillas', 'potatoes.loaded'],
  sauce: { name: 'Salsa verde sauce', mode: 'simmer', ings: [g(1 / 3, 'cup', 'jarred salsa verde', { short: 'salsa verde' }), cumin(0.25)],
    cook: 'Turn the heat to medium. Add the salsa verde and cumin to the pan and simmer 3 minutes, scraping up the browned bits.', time: 4 },
  garnish: [avocado(), g(1, 'tbsp', 'cotija or queso fresco', { note: 'crumbled', short: 'cotija', opt: true, tags: ['dairy'], p: 2 }), cil(), redonion(1)] },

{ id: 'al-pastor', name: 'Al Pastor-Style', cuisine: 'Mexican', heat: 1, proteins: ['pork', 'chicken', 'shrimp'],
  formats: ['tortillas.tacos', 'rice.bowl', 'quinoa.bowl', 'tortillas.quesadillas'],
  sauce: { name: 'Pastor glaze', mode: 'glaze', ings: [g(2, 'tbsp', 'pineapple juice'), g(1, 'tsp', 'ancho or regular chili powder', { short: 'chili powder' }), cumin(0.5), oregano(0.25), g(1, 'tsp', 'apple cider vinegar'), garlic(1), g(0.5, 'tsp', 'chipotle in adobo', { note: 'minced', short: 'chipotle', opt: true, tags: ['spicy'] })] },
  extras: [{ how: 'sear', ings: [g(1 / 3, 'cup', 'pineapple', { note: 'diced' })] }],
  garnish: [g(1, 'tbsp', 'white onion', { note: 'finely diced', opt: true }), cil()] },

{ id: 'baja', name: 'Baja', cuisine: 'Baja Mexican', heat: 0, proteins: ['salmon', 'shrimp', 'chicken'],
  formats: ['tortillas.tacos', 'rice.bowl', 'quinoa.bowl', 'greens.salad', 'tortillas.wraps'],
  titles: { 'rice.bowl': 'Baja {P} Bowls' },
  rub: [g(0.5, 'tsp', 'chili powder'), cumin(0.25), garlicP()],
  sauce: { name: 'Lime crema', mode: 'drizzle', ings: [g(2, 'tbsp', 'sour cream or Greek yogurt', { short: 'sour cream', tags: ['dairy'], p: 1.5, alt: g(1, 'tbsp', 'mayonnaise', { short: 'mayonnaise' }) }), lime(1, 'tsp'), pinch('garlic powder')] },
  toppings: [g(0.75, 'cup', 'shredded cabbage', { short: 'cabbage' }), g(1, 'tbsp', 'pickled red onion', { opt: true })],
  garnish: [avocado(), cil()] },

{ id: 'sweet-chili', name: 'Sweet Chili-Lime', cuisine: 'Thai', heat: 1, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.lettuce', 'greens.salad', 'tortillas.wraps', 'veg.stirfry'],
  sauce: { name: 'Sweet chili sauce', mode: 'glaze', ings: [g(2, 'tbsp', 'Thai sweet chili sauce', { short: 'sweet chili sauce' }), lime(1, 'tsp'), soy(1, 'tsp'), garlic(0.5, 'grated')] },
  toppings: [cucumber(0.5, 'thinly sliced'), carrot()],
  garnish: [g(1, 'tbsp', 'fresh mint or cilantro', { note: 'chopped', short: 'mint or cilantro', opt: true }), g(1, 'tbsp', 'roasted peanuts', { note: 'chopped', short: 'peanuts', opt: true, tags: ['nuts'], p: 2 })] },

{ id: 'huli-huli', name: 'Huli Huli', cuisine: 'Hawaiian', heat: 0, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'quinoa.bowl', 'tortillas.tacos', 'veg.sheetpan'],
  titles: { 'rice.fried': 'Pineapple Huli Huli {P} Fried Rice' },
  sauce: { name: 'Huli huli sauce', mode: 'glaze', ings: [g(3, 'tbsp', 'pineapple juice'), soy(1), g(2, 'tsp', 'brown sugar'), g(1, 'tsp', 'ketchup'), ginger(0.5), garlic(1), cstarch()] },
  extras: [{ how: 'sear', ings: [g(1 / 3, 'cup', 'pineapple chunks', { short: 'pineapple', key: 'pineapple' })] }],
  garnish: [scal(), sesame()] },

{ id: 'shawarma', name: 'Shawarma', cuisine: 'Middle Eastern', heat: 0,
  formats: ['rice.bowl', 'quinoa.bowl', 'tortillas.wraps', 'greens.salad', 'potatoes.roasted', 'veg.sheetpan'],
  rub: [cumin(0.5), g(0.5, 'tsp', 'ground coriander', { short: 'coriander' }), smoked(0.5), g(0.25, 'tsp', 'ground turmeric', { short: 'turmeric' }), garlicP(), pinch('ground cinnamon', { short: 'cinnamon' })],
  sauce: { name: 'Garlic yogurt sauce', altName: 'Lemon tahini sauce', mode: 'drizzle', ings: [yogurt(3, { alt: g(1, 'tbsp', 'tahini', { p: 3 }) }), lemon(1, 'tsp'), garlic(0.5, 'grated')],
    make: 'Make the sauce: whisk the {list} with a pinch of salt and a splash of water until it drizzles.' },
  toppings: [cucumber(0.5), tomatoes(), redonion()],
  garnish: [parsley(1, { opt: true })] },

{ id: 'italian-herb', name: 'Italian Herb', cuisine: 'Italian', heat: 0, eggs: true,
  formats: ['pasta.tossed', 'potatoes.roasted', 'veg.sheetpan', 'quinoa.bowl', 'rice.bowl', 'greens.salad', 'oats.risotto', 'tortillas.wraps'],
  rub: [g(1, 'tsp', 'Italian seasoning'), garlicP()],
  sauce: { name: 'Herb vinaigrette', mode: 'drizzle', ings: [g(2, 'tsp', 'olive oil', { key: 'olive oil' }), g(1, 'tsp', 'red wine vinegar'), pinch('dried oregano', { short: 'oregano' })] },
  garnish: [parm(2, { opt: true })] },

{ id: 'cilantro-lime', name: 'Cilantro-Lime', cuisine: 'Mexican', heat: 0, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'tortillas.tacos', 'greens.salad', 'tortillas.wraps'],
  rub: [cumin(0.5), garlicP()],
  sauce: { name: 'Cilantro-lime sauce', mode: 'drizzle', ings: [g(0.25, 'cup', 'fresh cilantro', { note: 'finely chopped', short: 'cilantro', tags: ['cilantro'] }), lime(1), g(1, 'tbsp', 'olive oil', { key: 'olive oil' }), honey(0.5), garlic(0.5, 'grated')] },
  toppings: [blackbeans(['rice.bowl', 'quinoa.bowl', 'greens.salad'])],
  garnish: [avocado()] },

{ id: 'mongolian', name: 'Mongolian', cuisine: 'American-Chinese', heat: 0, asian: true, proteins: ['steak', 'beef', 'chicken', 'shrimp', 'pork', 'turkey'],
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'greens.lettuce'],
  sauce: { name: 'Mongolian sauce', mode: 'glaze', water: true, ings: [soy(1.5), g(1, 'tbsp', 'brown sugar'), garlic(2), ginger(1), cstarch(1), flakes()] },
  garnish: [scal(2)] },

{ id: 'kung-pao', name: 'Kung Pao', cuisine: 'Sichuan-inspired', heat: 2, asian: true, proteins: ['chicken', 'shrimp', 'pork', 'steak', 'turkey'],
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'greens.lettuce'],
  sauce: { name: 'Kung pao sauce', mode: 'glaze', water: true, ings: [soy(1), ricevin(2), honey(1), cstarch(), garlic(1), ginger(0.5), g(1, 'tsp', 'chili garlic sauce', { tags: ['spicy'] })] },
  extras: [{ how: 'saute', ings: [bpepper(0.5, 'diced'), g(0.5, '', 'zucchini', { pl: 'zucchini', note: 'diced' })] }],
  garnish: [g(2, 'tbsp', 'roasted peanuts', { short: 'peanuts', opt: true, tags: ['nuts'], p: 4 }), scal()] },

{ id: 'broccoli-cheddar', name: 'Broccoli-Cheddar', cuisine: 'American', heat: 0, eggs: true, proteins: ['chicken', 'beef', 'turkey', 'steak', 'pork', 'eggs'],
  formats: ['potatoes.loaded', 'rice.bowl', 'oats.savory', 'quinoa.bowl', 'pasta.tossed'],
  titles: { 'rice.bowl': 'Cheesy Broccoli {P} and Rice' },
  sauce: { name: 'Cheddar sauce', mode: 'simmer', ings: [g(1 / 3, 'cup', 'milk', { tags: ['dairy'], p: 3 }), cstarch(), garlicP(), g(0.25, 'tsp', 'Dijon mustard', { short: 'Dijon' }), cheddar(1 / 3, 'cup')],
    cook: 'Turn the heat to medium-low. Whisk the milk with the cornstarch, garlic powder, and Dijon, pour it into the pan, and simmer 1–2 minutes until it thickens. Take it off the heat and stir in the cheddar until smooth.', time: 4 },
  extras: [{ how: 'steam', ings: [broccoli(1)] }] },

{ id: 'sausage-spiced', name: 'Italian Sausage-Spiced', cuisine: 'Italian-American', heat: 0, proteins: ['beef', 'turkey'],
  formats: ['pasta.tossed', 'potatoes.hash', 'potatoes.roasted', 'veg.sheetpan', 'quinoa.bowl', 'rice.bowl'],
  titles: { 'pasta.tossed': 'Italian Sausage-Spiced {P} and Pepper Pasta' },
  vegMix: [bpepper(1, 'cut into strips'), onion(0.5, 'cut into wedges'), g(0.5, '', 'zucchini', { pl: 'zucchini', note: 'sliced' })],
  rub: [g(0.5, 'tsp', 'fennel seed', { note: 'lightly crushed' }), smoked(0.25), oregano(0.25), garlicP(), flakes()],
  extras: [{ how: 'saute', ings: [bpepper(0.5), onion(0.25)] }],
  garnish: [parm(2, { opt: true })] },

{ id: 'zaatar', name: 'Za’atar', cuisine: 'Levantine', heat: 0, eggs: true,
  formats: ['quinoa.bowl', 'rice.bowl', 'greens.salad', 'veg.sheetpan', 'potatoes.roasted', 'tortillas.wraps'],
  rub: [g(1.5, 'tsp', 'za’atar')],
  sauce: { name: 'Lemon tahini', mode: 'drizzle', ings: [g(1, 'tbsp', 'tahini', { p: 3 }), lemon(2, 'tsp'), garlic(0.5, 'grated')],
    make: 'Make the lemon tahini: whisk the {list} with a pinch of salt and 1–2 tablespoons of water per serving until smooth and pourable.' },
  toppings: [cucumber(0.5), tomatoes()],
  garnish: [parsley(1, { opt: true })] },

{ id: 'harissa', name: 'Harissa-Honey', cuisine: 'North African', heat: 2, eggs: true,
  formats: ['quinoa.bowl', 'rice.bowl', 'veg.sheetpan', 'potatoes.roasted', 'greens.salad', 'tortillas.wraps'],
  sauce: { name: 'Harissa-honey glaze', mode: 'glaze', water: true, ings: [g(2, 'tsp', 'harissa paste', { short: 'harissa', tags: ['spicy'] }), honey(1), lemon(1, 'tsp'), garlic(0.5, 'grated')] },
  garnish: [yogurt(2, { opt: true }), g(1, 'tbsp', 'fresh mint or parsley', { note: 'chopped', short: 'mint or parsley', opt: true })] },

{ id: 'hot-honey', name: 'Hot Honey', cuisine: 'Southern', heat: 2,
  formats: ['potatoes.roasted', 'rice.bowl', 'quinoa.bowl', 'greens.salad', 'tortillas.tacos', 'veg.sheetpan'],
  rub: [smoked(0.5), garlicP()],
  sauce: { name: 'Hot honey', mode: 'glaze', ings: [honey(1, 'tbsp'), g(1, 'tsp', 'hot sauce', { tags: ['spicy'] }), g(0.25, 'tsp', 'red pepper flakes', { tags: ['spicy'] }), g(0.5, 'tsp', 'apple cider vinegar')],
    make: 'Make the hot honey: warm the {list} together in the microwave for 15 seconds and stir.' },
  toppings: [g(0.5, 'cup', 'coleslaw mix', { note: 'tossed with a splash of cider vinegar', short: 'slaw', only: ['tortillas.tacos', 'rice.bowl'] })],
  garnish: [g(2, 'tbsp', 'dill pickle chips', { opt: true, short: 'pickles', only: ['tortillas.tacos', 'rice.bowl'] })] },

{ id: 'philly', name: 'Philly Cheesesteak', cuisine: 'American', heat: 0, proteins: ['steak', 'beef', 'chicken', 'turkey'],
  formats: ['tortillas.wraps', 'tortillas.quesadillas', 'potatoes.loaded', 'rice.bowl', 'greens.salad'],
  titles: { 'tortillas.wraps': 'Philly {P} Cheesesteak Wraps', 'tortillas.wraps@steak': 'Philly Cheesesteak Wraps',
    'tortillas.quesadillas': 'Philly {P} Cheesesteak Quesadillas', 'tortillas.quesadillas@steak': 'Philly Cheesesteak Quesadillas',
    'potatoes.loaded': 'Philly {P} Cheesesteak Loaded Potatoes', 'potatoes.loaded@steak': 'Philly Cheesesteak Loaded Potatoes',
    'rice.bowl': 'Philly {P} Cheesesteak Rice Bowls', 'rice.bowl@steak': 'Philly Cheesesteak Rice Bowls',
    'greens.salad': 'Philly {P} Cheesesteak Salad', 'greens.salad@steak': 'Philly Cheesesteak Salad' },
  rub: [garlicP()],
  sauce: { name: 'Melted provolone', mode: 'pan', noToss: true, ings: [g(1, '', 'slice provolone', { pl: 'slices provolone', short: 'provolone', tags: ['dairy'], p: 7 })],
    cook: 'Pile the peppers and onion back into the pan, lay the provolone over the top, and cover for 1 minute until melted.' },
  extras: [{ how: 'saute', ings: [bpepper(0.5, 'thinly sliced'), onion(0.5, 'thinly sliced')], text: 'Heat a drizzle of oil in a large skillet over medium-high. Cook the bell pepper and onion 6–8 minutes, until soft and browned. Season with salt and move to a plate.', time: 8 }] },

{ id: 'cheeseburger', name: 'Cheeseburger', cuisine: 'American', heat: 0, proteins: ['beef', 'turkey'],
  formats: ['greens.salad', 'potatoes.loaded', 'tortillas.tacos', 'tortillas.quesadillas', 'rice.bowl', 'potatoes.roasted'],
  titles: { 'greens.salad': '{P} Cheeseburger Salad', 'potatoes.loaded': '{P} Cheeseburger Loaded Potatoes', 'tortillas.tacos': '{P} Cheeseburger Tacos', 'tortillas.quesadillas': '{P} Cheeseburger Quesadillas', 'rice.bowl': '{P} Cheeseburger Bowls', 'potatoes.roasted': '{P} Cheeseburger Bowls with Crispy Potatoes' },
  rub: [garlicP(), g(0.25, 'tsp', 'onion powder'), g(1, 'tsp', 'Worcestershire sauce', { short: 'Worcestershire' })],
  sauce: { name: 'Burger sauce', mode: 'drizzle', ings: [g(1, 'tbsp', 'mayonnaise', { short: 'mayo' }), g(2, 'tsp', 'ketchup'), g(1, 'tsp', 'dill pickle relish', { short: 'relish' }), g(0.5, 'tsp', 'yellow mustard', { short: 'mustard' })] },
  toppings: [tomatoes(), g(2, 'tbsp', 'dill pickle chips', { short: 'pickles' })],
  garnish: [cheddar(0.25, 'cup', { opt: true }), redonion(1)] }
);
/* ===== Gram weights: approximate USDA household-measure values ===== */
const CUP_G = {
  // grains and bases (raw unless noted)
  'long-grain white rice': 185, 'quinoa': 170, 'rolled oats': 81, 'cold cooked rice': 158,
  'romaine or mixed greens': 40, 'romaine': 47, 'frozen peas and carrots': 134,
  // liquids
  'chicken or vegetable broth': 240, 'milk': 244, 'heavy cream': 238, 'canned coconut milk': 226, 'crushed tomatoes': 242,
  'soy sauce': 255, 'mirin': 270, 'honey': 339, 'maple syrup': 315, 'rice vinegar': 240, 'apple cider vinegar': 239,
  'red wine vinegar': 239, 'balsamic vinegar': 255, 'fresh lemon juice': 244, 'fresh lime juice': 242, 'orange juice': 248,
  'pineapple juice': 250, 'fish sauce': 288, 'olive oil': 216, 'avocado oil': 218, 'toasted sesame oil': 218,
  'olive or avocado oil': 216, 'cayenne pepper hot sauce': 240, 'hot sauce': 240, 'sriracha': 270, 'chili garlic sauce': 270,
  'Worcestershire sauce': 275,
  // sauces, pastes, spreads
  'BBQ sauce': 286, 'Thai sweet chili sauce': 320, 'ketchup': 272, 'mayonnaise': 220, 'ranch dressing': 240,
  'ranch or blue cheese dressing': 240, 'sour cream': 230, 'sour cream or Greek yogurt': 240, 'plain Greek yogurt': 245,
  'hummus': 246, 'tahini': 240, 'creamy peanut butter': 258, 'basil pesto': 256, 'gochujang': 304, 'Thai red curry paste': 256,
  'harissa paste': 256, 'white miso': 275, 'chipotle in adobo': 240, 'Dijon mustard': 249, 'yellow mustard': 249,
  'dill pickle relish': 245, 'jarred salsa': 259, 'jarred salsa verde': 259, 'jarred roasted red peppers': 140,
  // vegetables and fruit
  'broccoli florets': 71, 'green beans': 100, 'snap peas': 63, 'asparagus': 134, 'Brussels sprouts': 88, 'baby spinach': 30,
  'cremini mushrooms': 72, 'cherry tomatoes': 149, 'cucumber': 125, 'shredded carrot': 110, 'coleslaw mix': 70,
  'shredded cabbage or coleslaw mix': 70, 'shredded cabbage': 70, 'corn kernels': 145, 'shelled edamame': 155,
  'black beans': 172, 'canned chickpeas': 160, 'kimchi': 150, 'pineapple': 165, 'pineapple chunks': 165,
  'sun-dried tomatoes': 110, 'kalamata olives': 135, 'dill pickle chips': 140, 'golden raisins': 165, 'pickled red onion': 150,
  'red onion': 115, 'white onion': 160, 'croutons': 30,
  // herbs (fresh)
  'fresh cilantro': 16, 'fresh parsley': 60, 'fresh chives': 48, 'fresh basil or cilantro': 42, 'fresh mint or cilantro': 24,
  'fresh mint or parsley': 60, 'fresh ginger': 96, 'orange zest': 96,
  // cheese, nuts, seeds
  'feta': 150, 'parmesan': 100, 'sharp cheddar': 113, 'Monterey Jack or cheddar': 113, 'cotija or queso fresco': 130,
  'butter': 227, 'roasted peanuts': 146, 'pine nuts': 135, 'sliced almonds': 92, 'sesame seeds': 144,
  // dry seasonings
  'chili powder': 130, 'ancho or regular chili powder': 130, 'ground cumin': 101, 'smoked paprika': 110, 'paprika': 110,
  'garlic powder': 149, 'onion powder': 115, 'dried oregano': 48, 'Italian seasoning': 48, 'dried thyme': 48,
  'dried rosemary': 58, 'dried dill': 48, 'ground cinnamon': 125, 'ground coriander': 86, 'ground turmeric': 144,
  'garam masala': 96, 'curry powder': 96, 'Cajun seasoning': 134, 'jerk seasoning': 120, 'ranch seasoning': 144,
  'lemon-pepper seasoning': 144, 'za’atar': 86, 'fennel seed': 96, 'red pepper flakes': 86, 'cornstarch': 128,
  'brown sugar': 220, 'sugar': 200
};
const EACH_G = {
  'garlic clove': 5, 'avocado': 150, 'bell pepper': 120, 'carrot': 61, 'jalapeño': 14, 'large egg': 50,
  '8-inch flour tortilla': 49, 'large (10-inch) flour tortilla': 72, 'small corn or flour tortilla': 28,
  'large russet potato': 369, 'red onion': 110, 'yellow onion': 110, 'scallion': 15, 'fresh basil leaf': 0.5,
  'slice provolone': 28, 'zucchini': 196, 'baby bok choy': 90, 'butter lettuce': 163, 'celery': 40
};
const PER_CUP = { tsp: 48, tbsp: 16, cup: 1 };
function gramsPerUnit(ing) {
  if (ing.u === 'oz') return 28.35;
  if (ing.u === 'lb') return 453.6;
  if (ing.u === 'pinch') return CUP_G[ing.n] != null ? 0.36 : null;
  if (PER_CUP[ing.u]) return CUP_G[ing.n] != null ? CUP_G[ing.n] / PER_CUP[ing.u] : null;
  return EACH_G[ing.n] != null ? EACH_G[ing.n] : null;
}
function gramsOf(ing, a) { const per = gramsPerUnit(ing); return (per == null || a == null) ? null : per * a; }
function fmtG(g) {
  if (g == null) return '';
  if (g < 1) return '<1 g';
  return Math.round(g).toLocaleString('en-US') + ' g';
}

/* Cooked weight ÷ raw weight, from typical cooking losses and grain absorption */
const PROTEIN_Y = { chicken: .75, beef: .70, steak: .75, pork: .75, salmon: .80, shrimp: .80, turkey: .75, eggs: .95 };
function cookedYield(ing, role, x) {
  const n = ing.n;
  if (role === 'pantry') return 0;
  if (role === 'protein') return PROTEIN_Y[x.pid] || .75;
  if (role === 'base') {
    if (n === 'long-grain white rice') return 2.7;
    if (n === 'quinoa') return 3.0;
    if (/penne|spaghetti/.test(n)) return 2.3;
    if (n === 'cold cooked rice') return .95;
    if (/potato/.test(n)) return x.hid === 'potatoes.mashed' ? 1 : x.hid === 'potatoes.loaded' ? .9 : .75;
    if (n === 'chicken or vegetable broth') return .8;
    if (n === 'yellow onion') return .75;
    return 1;
  }
  if (role === 'veg') {
    if (x.how === 'steam') return .95;
    if (x.how === 'saute') return .8;
    if (x.how === 'sear') return .85;
    if (x.stir) return .85;
    if (x.own) return .7;
    return .85;
  }
  if (role === 'sauce') {
    if (x.smode === 'glaze') return .85;
    if (x.smode !== 'simmer') return 1;
    if (n === 'chicken or vegetable broth') return .5;
    if (n === 'crushed tomatoes') return .75;
    if (/coconut milk|heavy cream/.test(n)) return .8;
    if (n === 'milk') return .85;
    if (n === 'cremini mushrooms') return .6;
    if (n === 'baby spinach') return .9;
    if (/bell pepper|snap peas/.test(n)) return .85;
    return 1;
  }
  return 1;
}

/* Per-serving cooked weight, split the way you'd plate it */
function portion(groups, x) {
  const rows = new Map();
  const addTo = (label, g, opt) => { const r = rows.get(label) || { label, g: 0, opt }; r.g += g; rows.set(label, r); };
  for (const gr of groups) {
    if (gr.role === 'pantry') continue;
    let g = 0;
    for (const i of gr.items) g += (gramsOf(i, i.a) || 0) * cookedYield(i, gr.role, { ...x, how: i.how });
    const label = { protein: gr.title, seasoning: x.pLabel, veg: 'Vegetables', garnish: 'Optional finish' }[gr.role] || gr.title;
    addTo(label, g, gr.role === 'garnish');
  }
  const list = [...rows.values()].filter(r => r.g >= 2).map(r => ({ ...r, g: Math.round(r.g) }));
  const core = list.filter(r => !r.opt).reduce((s, r) => s + r.g, 0);
  const opt = list.filter(r => r.opt).reduce((s, r) => s + r.g, 0);
  return { rows: list, total: Math.round(core / 5) * 5, opt };
}
/* ===== Nutrition per 100 g as purchased: [kcal, protein, carbs, fat] — approximate USDA FoodData Central values ===== */
const NUT = {
  // proteins (raw)
  'boneless, skinless chicken breasts or thighs': [120, 22.5, 0, 2.6], '90% lean ground beef': [176, 20, 0, 10],
  'sirloin or flank steak': [150, 21.5, 0, 6.5], 'pork tenderloin': [109, 21, 0, 2.2], 'salmon fillets': [208, 20.4, 0, 13.4],
  'large shrimp': [85, 20.1, 0, 0.5], '93% lean ground turkey': [150, 18.7, 0, 8.3], 'large egg': [143, 12.6, 0.7, 9.5],
  // grains, starches, wraps
  'long-grain white rice': [365, 7.1, 80, 0.7], 'cold cooked rice': [130, 2.7, 28.2, 0.3], 'quinoa': [368, 14.1, 64.2, 6.1],
  'rolled oats': [379, 13.2, 67.7, 6.5], 'penne or rigatoni': [371, 13, 74.7, 1.5], 'spaghetti or linguine': [371, 13, 74.7, 1.5],
  'Yukon Gold or baby potatoes': [77, 2, 17.5, 0.1], 'Yukon Gold potatoes': [77, 2, 17.5, 0.1], 'large russet potato': [79, 2.1, 18.1, 0.1],
  '8-inch flour tortilla': [310, 8.3, 51, 7.7], 'large (10-inch) flour tortilla': [310, 8.3, 51, 7.7], 'small corn or flour tortilla': [265, 7, 48, 5.3],
  'croutons': [440, 11, 65, 15],
  // greens and vegetables
  'romaine or mixed greens': [17, 1.2, 3.3, 0.3], 'romaine': [17, 1.2, 3.3, 0.3], 'butter lettuce': [13, 1.4, 2.2, 0.2],
  'frozen peas and carrots': [53, 3.4, 11, 0.4], 'broccoli florets': [34, 2.8, 6.6, 0.4], 'green beans': [31, 1.8, 7, 0.2],
  'snap peas': [42, 2.8, 7.6, 0.2], 'asparagus': [20, 2.2, 3.9, 0.1], 'Brussels sprouts': [43, 3.4, 9, 0.3], 'baby spinach': [23, 2.9, 3.6, 0.4],
  'cremini mushrooms': [22, 2.5, 4.3, 0.1], 'cherry tomatoes': [18, 0.9, 3.9, 0.2], 'cucumber': [15, 0.7, 3.6, 0.1],
  'shredded carrot': [41, 0.9, 9.6, 0.2], 'carrot': [41, 0.9, 9.6, 0.2], 'coleslaw mix': [25, 1.3, 5.8, 0.1],
  'shredded cabbage or coleslaw mix': [25, 1.3, 5.8, 0.1], 'shredded cabbage': [25, 1.3, 5.8, 0.1], 'corn kernels': [86, 3.3, 19, 1.4],
  'shelled edamame': [121, 11.9, 8.9, 5.2], 'black beans': [132, 8.9, 23.7, 0.5], 'canned chickpeas': [139, 7, 22.5, 2.6],
  'kimchi': [15, 1.1, 2.4, 0.5], 'pineapple': [50, 0.5, 13.1, 0.1], 'pineapple chunks': [50, 0.5, 13.1, 0.1],
  'sun-dried tomatoes': [213, 5, 23.3, 14], 'kalamata olives': [230, 1.6, 6, 21], 'dill pickle chips': [12, 0.5, 2.4, 0.2],
  'golden raisins': [302, 3.4, 79.5, 0.5], 'pickled red onion': [40, 0.8, 9, 0.1], 'red onion': [40, 1.1, 9.3, 0.1],
  'white onion': [40, 1.1, 9.3, 0.1], 'yellow onion': [40, 1.1, 9.3, 0.1], 'jarred roasted red peppers': [25, 0.8, 4.5, 0.3],
  'avocado': [160, 2, 8.5, 14.7], 'bell pepper': [26, 1, 6, 0.3], 'celery': [14, 0.7, 3, 0.2], 'zucchini': [17, 1.2, 3.1, 0.3],
  'baby bok choy': [13, 1.5, 2.2, 0.2], 'scallion': [32, 1.8, 7.3, 0.2], 'jalapeño': [29, 0.9, 6.5, 0.4], 'garlic clove': [149, 6.4, 33, 0.5],
  // herbs and aromatics
  'fresh cilantro': [23, 2.1, 3.7, 0.5], 'fresh parsley': [36, 3, 6.3, 0.8], 'fresh chives': [30, 3.3, 4.4, 0.7],
  'fresh basil leaf': [23, 3.2, 2.7, 0.6], 'fresh basil or cilantro': [23, 2.6, 3.2, 0.6], 'fresh mint or cilantro': [45, 3, 9, 0.7],
  'fresh mint or parsley': [50, 3.4, 10.5, 0.9], 'fresh ginger': [80, 1.8, 17.8, 0.8], 'orange zest': [97, 1.5, 25, 0.2],
  // liquids
  'chicken or vegetable broth': [6, 0.6, 0.5, 0.2], 'milk': [50, 3.3, 4.8, 2], 'heavy cream': [340, 2.8, 2.7, 36],
  'canned coconut milk': [197, 2, 2.8, 21], 'crushed tomatoes': [32, 1.6, 7.3, 0.3], 'soy sauce': [53, 8.1, 4.9, 0.6],
  'mirin': [240, 0.3, 43, 0], 'honey': [304, 0.3, 82.4, 0], 'maple syrup': [260, 0, 67, 0.1], 'rice vinegar': [0, 0, 0, 0],
  'apple cider vinegar': [21, 0, 0.9, 0], 'red wine vinegar': [19, 0, 0.3, 0], 'balsamic vinegar': [88, 0.5, 17, 0],
  'fresh lemon juice': [22, 0.4, 6.9, 0.2], 'fresh lime juice': [25, 0.4, 8.4, 0.1], 'orange juice': [45, 0.7, 10.4, 0.2],
  'pineapple juice': [53, 0.4, 12.9, 0.1], 'fish sauce': [35, 5.1, 3.6, 0],
  'olive oil': [884, 0, 0, 100], 'avocado oil': [884, 0, 0, 100], 'toasted sesame oil': [884, 0, 0, 100], 'olive or avocado oil': [884, 0, 0, 100],
  // sauces, condiments, pastes
  'cayenne pepper hot sauce': [11, 0.5, 1.8, 0.4], 'hot sauce': [11, 0.5, 1.8, 0.4], 'sriracha': [93, 1.9, 19, 0.9],
  'chili garlic sauce': [60, 1.4, 10, 1.5], 'Worcestershire sauce': [78, 0, 19.5, 0], 'BBQ sauce': [172, 0.8, 41, 0.6],
  'Thai sweet chili sauce': [200, 0.3, 50, 0.2], 'ketchup': [101, 1, 27.4, 0.1], 'mayonnaise': [680, 1, 0.6, 75],
  'ranch dressing': [430, 1.3, 6, 44.5], 'ranch or blue cheese dressing': [450, 1.4, 5.5, 47], 'sour cream': [198, 2.4, 4.6, 19.4],
  'sour cream or Greek yogurt': [135, 6.2, 4.3, 10.6], 'plain Greek yogurt': [73, 10, 3.9, 1.9], 'hummus': [166, 7.9, 14.3, 9.6],
  'tahini': [595, 17, 21, 53.8], 'creamy peanut butter': [588, 25, 20, 50], 'basil pesto': [460, 5, 6, 45], 'gochujang': [215, 4.5, 44, 2],
  'Thai red curry paste': [95, 2, 14, 3], 'harissa paste': [130, 2.5, 12, 8], 'white miso': [198, 12.8, 25.4, 6],
  'chipotle in adobo': [70, 1.6, 11, 2.5], 'Dijon mustard': [66, 4.4, 5.8, 4], 'yellow mustard': [60, 3.7, 5.8, 3.3],
  'dill pickle relish': [20, 0.6, 4, 0.2], 'jarred salsa': [36, 1.5, 7, 0.2], 'jarred salsa verde': [35, 1, 6, 0.6],
  // cheese, butter, nuts, seeds
  'feta': [264, 14.2, 4.1, 21.3], 'parmesan': [420, 28.4, 13.9, 27.8], 'sharp cheddar': [404, 24, 3.1, 33],
  'Monterey Jack or cheddar': [390, 24, 1.5, 32], 'cotija or queso fresco': [330, 19, 3.5, 27], 'butter': [717, 0.9, 0.1, 81],
  'slice provolone': [351, 25.6, 2.1, 26.6], 'fresh mozzarella pearls': [280, 19.5, 2.4, 21],
  'roasted peanuts': [585, 24, 21.5, 49.7], 'pine nuts': [673, 13.7, 13.1, 68.4], 'sliced almonds': [579, 21.2, 21.6, 49.9],
  'sesame seeds': [573, 17.7, 23.4, 49.7],
  // dry seasonings
  'chili powder': [282, 13.5, 50, 14.3], 'ancho or regular chili powder': [282, 13.5, 50, 14.3], 'ground cumin': [375, 17.8, 44, 22.3],
  'smoked paprika': [282, 14.1, 54, 13], 'paprika': [282, 14.1, 54, 13], 'garlic powder': [331, 16.6, 72.7, 0.7],
  'onion powder': [341, 10.4, 79, 1], 'dried oregano': [265, 9, 69, 4.3], 'Italian seasoning': [265, 9, 69, 4.3],
  'dried thyme': [276, 9.1, 64, 7.4], 'dried rosemary': [331, 4.9, 64, 15.2], 'dried dill': [253, 20, 56, 4.4],
  'ground cinnamon': [247, 4, 81, 1.2], 'ground coriander': [298, 12.4, 55, 17.8], 'ground turmeric': [312, 9.7, 67, 3.3],
  'garam masala': [380, 15, 45, 15], 'curry powder': [325, 14.3, 55.8, 14], 'Cajun seasoning': [200, 7, 40, 4],
  'jerk seasoning': [200, 5, 40, 4], 'ranch seasoning': [330, 8, 66, 3], 'lemon-pepper seasoning': [150, 5, 30, 2],
  'za’atar': [300, 10, 45, 12], 'fennel seed': [345, 15.8, 52.3, 14.9], 'red pepper flakes': [318, 12, 56.6, 17.3],
  'cornstarch': [381, 0.3, 91.3, 0.1], 'brown sugar': [380, 0.1, 98, 0], 'sugar': [387, 0, 100, 0]
};

/* Per-serving totals. Everything except the optional finish counts, including the cooking oil. */
function nutrition(groups) {
  const main = [0, 0, 0, 0], opt = [0, 0, 0, 0];
  for (const gr of groups) for (const i of gr.items) {
    const g = gramsOf(i, i.a), n = NUT[i.n];
    if (g == null || !n) continue;
    const tgt = gr.role === 'garnish' ? opt : main;
    for (let k = 0; k < 4; k++) tgt[k] += g * n[k] / 100;
  }
  const r = a => ({ kcal: Math.round(a[0] / 10) * 10, p: Math.round(a[1]), c: Math.round(a[2]), f: Math.round(a[3]) });
  return { ...r(main), opt: r(opt) };
}
/* ===== Flavors, part 3 ===== */
FLAVORS.push(
{ id: 'lemongrass', name: 'Lemongrass', cuisine: 'Vietnamese', heat: 1, eggs: true, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.lettuce', 'greens.salad', 'pasta.tossed', 'veg.stirfry'],
  titles: { 'pasta.tossed': 'Lemongrass {P} Noodle Bowls' },
  sauce: { name: 'Lemongrass glaze', mode: 'glaze', water: true, ings: [g(1, 'tbsp', 'lemongrass paste'), g(2, 'tsp', 'fish sauce'), g(2, 'tsp', 'brown sugar'), garlic(1), lime(1, 'tsp'), flakes()] },
  dressing: { name: 'Nuoc cham dressing', make: true, ings: [g(2, 'tsp', 'fish sauce'), lime(1), g(1, 'tsp', 'brown sugar'), garlic(0.5, 'grated')] },
  toppings: [cucumber(0.5, 'thinly sliced'), carrot()],
  garnish: [g(1, 'tbsp', 'fresh mint or cilantro', { note: 'chopped', short: 'mint or cilantro', opt: true }), g(1, 'tbsp', 'roasted peanuts', { note: 'chopped', short: 'peanuts', opt: true, tags: ['nuts'], p: 2 })] },

{ id: 'banh-mi', name: 'Banh Mi-Style', cuisine: 'Vietnamese', heat: 1, asian: true,
  formats: ['tortillas.wraps', 'rice.bowl', 'quinoa.bowl', 'greens.salad', 'greens.lettuce'],
  rub: [g(0.5, 'tsp', 'Chinese five-spice', { short: 'five-spice' }), garlicP()],
  sauce: { name: 'Sriracha mayo', mode: 'drizzle', ings: [g(1.5, 'tbsp', 'mayonnaise', { short: 'mayo' }), g(1, 'tsp', 'sriracha', { opt: true, tags: ['spicy'] }), lime(0.5, 'tsp')] },
  toppings: [g(1 / 3, 'cup', 'shredded carrot', { note: 'tossed with a splash of rice vinegar and a pinch of sugar', short: 'pickled carrot' }), cucumber(1 / 3, 'cut into thin sticks'), g(0.25, '', 'jalapeño', { pl: 'jalapeños', note: 'thinly sliced', opt: true, tags: ['spicy'] })],
  garnish: [cil()] },

{ id: 'adobo', name: 'Adobo', cuisine: 'Filipino', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted', 'greens.lettuce'],
  titles: { 'rice.bowl': '{P} Adobo with Rice', 'quinoa.bowl': '{P} Adobo over Quinoa', 'potatoes.roasted': '{P} Adobo with Crispy Potatoes', 'potatoes.mashed': '{P} Adobo with Mashed Potatoes', 'greens.lettuce': '{P} Adobo Lettuce Wraps' },
  sauce: { name: 'Adobo sauce', mode: 'simmer', time: 6, ings: [garlic(3, 'smashed'), soy(1.5), g(1.5, 'tbsp', 'apple cider vinegar'), g(1, '', 'bay leaf', { pl: 'bay leaves' }), g(0.25, 'tsp', 'whole black peppercorns', { short: 'peppercorns' }), g(1, 'tsp', 'brown sugar')],
    cook: 'Turn the heat to medium. Add the garlic and cook 30 seconds, then add the soy sauce, vinegar, bay leaves, peppercorns, brown sugar, and ¼ cup of water per serving. Simmer 5 minutes, until reduced by about half, then remove the bay leaves.' },
  garnish: [scal()] },

{ id: 'general-tso', name: 'General Tso’s', cuisine: 'American-Chinese', heat: 1, asian: true, proteins: ['chicken', 'shrimp', 'pork', 'steak', 'turkey'],
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'greens.lettuce', 'rice.fried'],
  sauce: { name: 'General Tso’s sauce', mode: 'glaze', water: true, ings: [soy(1), g(1, 'tbsp', 'hoisin sauce', { short: 'hoisin' }), ricevin(2), g(2, 'tsp', 'brown sugar'), garlic(1), ginger(0.5), cstarch(), flakes()] },
  extras: [{ how: 'steam', ings: [broccoli(1)] }],
  garnish: [scal(), sesame()] },

{ id: 'sesame-ginger', name: 'Sesame-Ginger', cuisine: 'Asian-inspired', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'greens.salad', 'pasta.tossed', 'greens.lettuce', 'oats.savory'],
  titles: { 'pasta.tossed': 'Sesame-Ginger {P} Noodles' },
  sauce: { name: 'Sesame-ginger dressing', mode: 'drizzle', ings: [g(1, 'tbsp', 'toasted sesame oil', { short: 'sesame oil' }), soy(2, 'tsp'), ricevin(2), honey(1), ginger(1), garlic(0.5, 'grated')] },
  toppings: [g(0.25, 'cup', 'shelled edamame', { note: 'thawed', short: 'edamame', p: 4 }), carrot()],
  garnish: [scal(), sesame()] },

{ id: 'chili-crisp', name: 'Chili Crisp', cuisine: 'Chinese', heat: 2, eggs: true, asian: true,
  formats: ['rice.bowl', 'rice.fried', 'pasta.tossed', 'oats.savory', 'quinoa.bowl', 'greens.salad'],
  titles: { 'pasta.tossed': 'Chili Crisp {P} Noodles', 'greens.salad': 'Chili Crisp {P} and Smashed Cucumber Salad' },
  sauce: { name: 'Chili crisp sauce', mode: 'drizzle', ings: [g(1, 'tbsp', 'chili crisp', { tags: ['spicy'] }), soy(1, 'tsp'), ricevin(1), honey(0.5), garlic(0.5, 'grated')] },
  toppings: [cucumber(0.5, 'smashed and cut into chunks')],
  garnish: [scal(), g(1, 'tbsp', 'roasted peanuts', { note: 'chopped', short: 'peanuts', opt: true, tags: ['nuts'], p: 2 })] },

{ id: 'piri-piri', name: 'Piri-Piri', cuisine: 'Portuguese', heat: 2,
  formats: ['potatoes.roasted', 'rice.bowl', 'quinoa.bowl', 'greens.salad', 'veg.sheetpan', 'tortillas.wraps'],
  rub: [smoked(1), garlicP(), oregano(0.25), g(0.25, 'tsp', 'cayenne pepper', { tags: ['spicy'] })],
  sauce: { name: 'Piri-piri sauce', mode: 'drizzle', ings: [g(0.25, 'cup', 'jarred roasted red peppers', { short: 'roasted red peppers' }), lemon(1), g(1, 'tbsp', 'olive oil', { key: 'olive oil' }), garlic(1), g(0.5, 'tsp', 'red pepper flakes', { tags: ['spicy'] })],
    make: 'Make the piri-piri sauce: blend or very finely chop the {list} with a pinch of salt.' },
  toppings: [redonion()],
  garnish: [parsley(1, { opt: true })] },

{ id: 'blackened', name: 'Blackened', cuisine: 'Cajun', heat: 1, proteins: ['chicken', 'salmon', 'shrimp', 'steak', 'pork'],
  formats: ['rice.bowl', 'potatoes.roasted', 'potatoes.mashed', 'greens.salad', 'tortillas.tacos', 'tortillas.wraps', 'quinoa.bowl', 'oats.savory'],
  titles: { 'oats.savory': 'Blackened {P} and Cheesy Oat “Grits”' },
  rub: [g(1, 'tsp', 'paprika'), garlicP(), g(0.25, 'tsp', 'onion powder'), g(0.25, 'tsp', 'dried thyme', { short: 'thyme' }), g(1 / 8, 'tsp', 'cayenne pepper', { opt: true, tags: ['spicy'] })],
  sauce: { name: 'Remoulade', mode: 'drizzle', ings: [g(1.5, 'tbsp', 'mayonnaise', { short: 'mayo' }), g(0.5, 'tsp', 'Dijon mustard', { short: 'Dijon' }), lemon(0.5, 'tsp'), g(0.5, 'tsp', 'dill pickle relish', { short: 'relish' }), g(0.25, 'tsp', 'hot sauce', { opt: true, tags: ['spicy'] })] },
  toppings: [g(0.5, 'cup', 'coleslaw mix', { note: 'tossed with a splash of cider vinegar', short: 'slaw', only: ['tortillas.tacos', 'tortillas.wraps', 'rice.bowl'] })],
  garnish: [scal()],
  by: { 'oats.savory': { baseAdd: [cheddar(0.25, 'cup')], baseNote: 'Stir the cheddar into the oats right before serving, like cheese grits.' } } },

{ id: 'lemon-dill', name: 'Lemon-Dill', cuisine: 'Scandinavian-inspired', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'potatoes.mashed', 'quinoa.bowl', 'rice.bowl', 'greens.salad', 'veg.sheetpan'],
  rub: [g(0.5, 'tsp', 'dried dill', { short: 'dill' }), garlicP()],
  sauce: { name: 'Lemon-dill yogurt sauce', altName: 'Lemon-dill vinaigrette', mode: 'drizzle', ings: [yogurt(3, { alt: g(1, 'tbsp', 'olive oil', { key: 'olive oil' }) }), lemon(2, 'tsp'), g(0.25, 'tsp', 'dried dill', { short: 'dill' }), garlic(0.5, 'grated')] },
  extras: [{ how: 'steam', ings: [g(1, 'cup', 'asparagus', { note: 'cut into 2-inch pieces', p: 3 })] }],
  toppings: [cucumber(0.5, 'thinly sliced')],
  garnish: [g(1, 'tbsp', 'capers', { note: 'drained', opt: true })] },

{ id: 'paprikash', name: 'Paprikash', cuisine: 'Hungarian', heat: 0, proteins: ['chicken', 'pork', 'turkey', 'beef', 'steak'],
  formats: ['potatoes.mashed', 'pasta.tossed', 'rice.bowl', 'quinoa.bowl'],
  titles: { 'potatoes.mashed': '{P} Paprikash with Mashed Potatoes', 'pasta.tossed': '{P} Paprikash with Pasta', 'rice.bowl': '{P} Paprikash over Rice', 'quinoa.bowl': '{P} Paprikash over Quinoa' },
  sauce: { name: 'Paprikash sauce', mode: 'simmer', time: 8, ings: [onion(0.5, 'thinly sliced'), garlic(1), g(2, 'tsp', 'paprika'), broth(1 / 3), g(3, 'tbsp', 'sour cream', { tags: ['dairy'] })],
    cook: 'Turn the heat to medium. Add the onion with a pinch of salt and cook 5 minutes, until soft. Stir in the garlic and paprika for 30 seconds, then add the broth and simmer 2 minutes. Take the pan off the heat and stir in the sour cream.' },
  garnish: [parsley(1, { opt: true })] },

{ id: 'dijon-tarragon', name: 'Dijon-Tarragon', cuisine: 'French', heat: 0, proteins: ['chicken', 'pork', 'salmon', 'steak', 'turkey', 'shrimp'],
  formats: ['potatoes.mashed', 'potatoes.roasted', 'rice.bowl', 'pasta.tossed', 'oats.risotto', 'quinoa.bowl'],
  sauce: { name: 'Dijon-tarragon cream sauce', mode: 'simmer', time: 5, ings: [g(0.5, '', 'shallot', { pl: 'shallots', note: 'minced' }), broth(0.25), cream(2, 'tbsp'), g(2, 'tsp', 'Dijon mustard', { short: 'Dijon' }), g(0.5, 'tsp', 'dried tarragon', { short: 'tarragon' })],
    cook: 'Turn the heat to medium. Add the shallot and cook 1–2 minutes, until soft. Pour in the broth, scraping up the browned bits, then stir in the cream, Dijon, and tarragon and simmer 2–3 minutes, until it coats a spoon.' },
  extras: [{ how: 'steam', ings: [greenbeans()] }] },

{ id: 'provencal', name: 'Provençal', cuisine: 'French', heat: 0, eggs: true,
  formats: ['potatoes.roasted', 'quinoa.bowl', 'rice.bowl', 'pasta.tossed', 'veg.sheetpan'],
  rub: [g(1, 'tsp', 'herbes de Provence'), garlicP()],
  sauce: { name: 'Provençal tomato-olive sauce', mode: 'pan', ings: [garlic(1), tomatoes(0.75), g(2, 'tbsp', 'kalamata olives', { note: 'halved' }), broth(2, 'tbsp'), g(1, 'tsp', 'capers', { note: 'drained' })],
    cook: 'Turn the heat to medium. Add the garlic and cherry tomatoes and cook 3–4 minutes, until the tomatoes start to burst. Add the olives, capers, and broth and simmer 1 minute.' },
  garnish: [parsley(1, { opt: true }), feta()] },

{ id: 'mojo', name: 'Mojo', cuisine: 'Cuban', heat: 0,
  formats: ['rice.bowl', 'tortillas.tacos', 'tortillas.wraps', 'quinoa.bowl', 'greens.salad', 'potatoes.roasted'],
  sauce: { name: 'Mojo glaze', mode: 'glaze', ings: [g(3, 'tbsp', 'orange juice'), lime(1), garlic(2), cumin(0.5), oregano(0.5), g(1, 'tsp', 'olive oil', { key: 'olive oil' })] },
  toppings: [blackbeans(['rice.bowl', 'quinoa.bowl', 'greens.salad']), redonion(1)],
  garnish: [cil(), avocado()] },

{ id: 'berbere', name: 'Berbere-Spiced', cuisine: 'Ethiopian', heat: 2, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.sheetpan', 'potatoes.roasted'],
  rub: [g(1, 'tsp', 'berbere', { tags: ['spicy'] })],
  sauce: { name: 'Spiced tomato sauce', mode: 'simmer', time: 9, ings: [onion(0.25, 'diced'), garlic(1), ginger(0.5), g(0.5, 'tsp', 'berbere', { tags: ['spicy'] }), g(0.5, 'cup', 'crushed tomatoes', { p: 1 }), g(1, 'tsp', 'butter', { tags: ['dairy'], alt: g(1, 'tsp', 'olive oil', { key: 'olive oil' }) })],
    cook: 'Turn the heat to medium. Add the onion and cook 4 minutes, until soft, then stir in the garlic, ginger, and berbere for 30 seconds. Add the crushed tomatoes and a pinch of salt and simmer 5 minutes, then stir in the butter.' },
  garnish: [yogurt(2, { opt: true }), cil()] },

{ id: 'aji-verde', name: 'Aji Verde', cuisine: 'Peruvian', heat: 1, eggs: true,
  formats: ['rice.bowl', 'potatoes.roasted', 'quinoa.bowl', 'greens.salad', 'tortillas.wraps', 'tortillas.tacos'],
  rub: [cumin(0.5), smoked(0.5), garlicP(), oregano(0.25)],
  sauce: { name: 'Aji verde', mode: 'drizzle', ings: [g(0.25, 'cup', 'fresh cilantro', { short: 'cilantro', tags: ['cilantro'] }), g(0.25, '', 'jalapeño', { pl: 'jalapeños', note: 'seeded', short: 'jalapeño', opt: true, tags: ['spicy'] }), g(1, 'tbsp', 'mayonnaise', { short: 'mayo' }), lime(2, 'tsp'), garlic(0.5), parm(1, { opt: true })],
    make: 'Make the aji verde: blend or very finely chop the {list} with a pinch of salt until smooth.' },
  toppings: [tomatoes(0.5, { only: ['greens.salad', 'quinoa.bowl', 'rice.bowl'] }), redonion(1)] },

{ id: 'sweet-sour', name: 'Sweet-and-Sour', cuisine: 'American-Chinese', heat: 0, asian: true, proteins: ['chicken', 'pork', 'shrimp', 'turkey'],
  formats: ['rice.bowl', 'quinoa.bowl', 'veg.stirfry', 'rice.fried', 'greens.lettuce'],
  sauce: { name: 'Sweet-and-sour sauce', mode: 'glaze', ings: [g(3, 'tbsp', 'pineapple juice'), ricevin(1, 'tbsp'), g(1, 'tbsp', 'ketchup'), g(2, 'tsp', 'brown sugar'), soy(1, 'tsp'), cstarch()] },
  extras: [{ how: 'saute', ings: [bpepper(0.5, 'cut into 1-inch pieces'), onion(0.25, 'cut into 1-inch pieces')] }, { how: 'sear', ings: [g(1 / 3, 'cup', 'pineapple chunks', { short: 'pineapple', key: 'pineapple' })] }],
  garnish: [scal()] },

{ id: 'spinach-artichoke', name: 'Spinach-Artichoke', cuisine: 'American', heat: 0, eggs: true, proteins: ['chicken', 'shrimp', 'turkey', 'salmon', 'eggs', 'pork'],
  formats: ['pasta.tossed', 'potatoes.loaded', 'rice.bowl', 'oats.risotto', 'quinoa.bowl', 'tortillas.quesadillas'],
  sauce: { name: 'Spinach-artichoke cream sauce', mode: 'simmer', time: 5, ings: [garlic(1), g(1 / 3, 'cup', 'canned artichoke hearts', { note: 'drained and chopped', short: 'artichoke hearts', p: 1 }), g(1, 'cup', 'baby spinach', { short: 'spinach', p: 1 }), cream(0.25), parm(2)],
    cook: 'Turn the heat to medium. Add the garlic and artichoke hearts and cook 1 minute. Pour in the cream and simmer 2 minutes, then stir in the spinach until it wilts and finish with the parmesan.' },
  garnish: [flakes()] },

{ id: 'saag', name: 'Saag', cuisine: 'Indian', heat: 1, eggs: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'potatoes.roasted'],
  titles: { 'rice.bowl': 'Saag {P} with Rice', 'quinoa.bowl': 'Saag {P} over Quinoa', 'potatoes.roasted': 'Saag {P} with Crispy Potatoes', 'veg.sheetpan': 'Saag {P} with Roasted Vegetables', 'tortillas.wraps': 'Saag {P} Wraps' },
  sauce: { name: 'Saag sauce', mode: 'simmer', time: 8, ings: [onion(0.25, 'diced'), garlic(1), ginger(0.5), g(0.75, 'tsp', 'garam masala'), g(2, 'cup', 'baby spinach', { short: 'spinach', p: 2 }), cream(2, 'tbsp', { alt: g(2, 'tbsp', 'canned coconut milk', { short: 'coconut milk', tags: ['coconut'] }) }), g(1, 'pinch', 'cayenne pepper', { opt: true, tags: ['spicy'] })],
    cook: 'Turn the heat to medium. Add the onion and cook 4 minutes, until soft, then stir in the garlic, ginger, and garam masala for 30 seconds. Add the spinach a handful at a time until it wilts, then stir in the cream and a splash of water and simmer 2 minutes. Mash or blend for a smoother sauce.' },
  garnish: [yogurt(2, { opt: true })] },

{ id: 'tandoori', name: 'Tandoori-Spiced', cuisine: 'Indian', heat: 1, proteins: ['chicken', 'shrimp', 'salmon', 'pork', 'steak'],
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.salad', 'tortillas.wraps', 'veg.sheetpan', 'potatoes.roasted'],
  rub: [yogurt(1, { alt: lemon(1, 'tsp') }), g(1, 'tsp', 'garam masala'), smoked(0.5), cumin(0.25), g(0.25, 'tsp', 'ground turmeric', { short: 'turmeric' }), g(1 / 8, 'tsp', 'cayenne pepper', { opt: true, tags: ['spicy'] })],
  sauce: { name: 'Mint chutney', mode: 'drizzle', ings: [g(0.25, 'cup', 'fresh mint', { short: 'mint' }), g(2, 'tbsp', 'fresh cilantro', { short: 'cilantro', tags: ['cilantro'], opt: true }), lime(1), honey(0.5), g(0.25, '', 'jalapeño', { pl: 'jalapeños', note: 'seeded', short: 'jalapeño', opt: true, tags: ['spicy'] })],
    make: 'Make the mint chutney: blend or very finely chop the {list} with a pinch of salt and 1–2 tablespoons of water until spoonable.' },
  toppings: [cucumber(0.5), redonion()] },

{ id: 'tomato-feta', name: 'Tomato-Feta', cuisine: 'Greek', heat: 0, eggs: true, proteins: ['shrimp', 'chicken', 'salmon', 'turkey', 'eggs', 'beef'],
  formats: ['pasta.tossed', 'rice.bowl', 'quinoa.bowl', 'oats.risotto', 'potatoes.roasted'],
  sauce: { name: 'Tomato-feta sauce', mode: 'simmer', time: 8, ings: [garlic(1), g(0.75, 'cup', 'crushed tomatoes', { p: 1.5 }), oregano(0.5), flakes(), g(3, 'tbsp', 'feta', { note: 'crumbled', tags: ['dairy'], p: 4 })],
    cook: 'Turn the heat to medium. Add the garlic, oregano, and red pepper flakes and stir 30 seconds. Pour in the crushed tomatoes, season with salt, and simmer 6 minutes, then scatter the feta over the top and let it soften 1 minute.' },
  garnish: [parsley(1, { opt: true })] },

{ id: 'piccata', name: 'Piccata', cuisine: 'Italian-American', heat: 0, proteins: ['chicken', 'pork', 'salmon', 'shrimp'],
  formats: ['pasta.tossed', 'potatoes.mashed', 'rice.bowl', 'quinoa.bowl'],
  titles: { 'pasta.tossed': '{P} Piccata with Pasta', 'potatoes.mashed': '{P} Piccata with Mashed Potatoes', 'rice.bowl': '{P} Piccata over Rice', 'quinoa.bowl': '{P} Piccata over Quinoa', 'veg.sheetpan': '{P} Piccata with Roasted Vegetables', 'oats.risotto': '{P} Piccata with Oat Risotto' },
  sauce: { name: 'Piccata sauce', mode: 'pan', ings: [garlic(1), broth(3, 'tbsp'), lemon(1), g(2, 'tsp', 'capers', { note: 'drained' }), g(2, 'tsp', 'butter', { tags: ['dairy'], alt: g(2, 'tsp', 'olive oil', { key: 'olive oil' }) }), parsley(1)],
    cook: 'Turn the heat to medium. Add the garlic for 30 seconds, then pour in the broth and lemon juice, scraping up the browned bits. Simmer 1 minute, add the capers, and swirl in the butter until glossy. Stir in the parsley.' },
  extras: [{ how: 'steam', ings: [g(1, 'cup', 'asparagus', { note: 'cut into 2-inch pieces', p: 3 })] }] },

{ id: 'hoisin', name: 'Hoisin-Five-Spice', cuisine: 'Chinese', heat: 0, eggs: true, asian: true,
  formats: ['rice.bowl', 'quinoa.bowl', 'greens.lettuce', 'tortillas.wraps', 'veg.stirfry', 'rice.fried'],
  sauce: { name: 'Hoisin glaze', mode: 'glaze', water: true, ings: [g(1.5, 'tbsp', 'hoisin sauce', { short: 'hoisin' }), soy(1, 'tsp'), ricevin(1), g(0.25, 'tsp', 'Chinese five-spice', { short: 'five-spice' }), garlic(1, 'grated'), cstarch()] },
  toppings: [cucumber(1 / 3, 'cut into thin sticks'), carrot()],
  garnish: [scal(), sesame()] }
);

/* Gram and nutrition data for the ingredients these flavors add */
Object.assign(CUP_G, { 'lemongrass paste': 240, 'Chinese five-spice': 96, 'whole black peppercorns': 139, 'dried tarragon': 77, 'herbes de Provence': 48,
  'canned artichoke hearts': 168, 'capers': 138, 'hoisin sauce': 256, 'berbere': 110, 'cayenne pepper': 86, 'fresh mint': 26, 'chili crisp': 208 });
Object.assign(EACH_G, { 'bay leaf': 0.2, 'shallot': 40 });
Object.assign(NUT, { 'lemongrass paste': [100, 1.5, 14, 4], 'Chinese five-spice': [350, 10, 60, 9], 'whole black peppercorns': [251, 10.4, 64, 3.3],
  'bay leaf': [313, 7.6, 75, 8.4], 'shallot': [72, 2.5, 16.8, 0.1], 'dried tarragon': [295, 22.8, 50, 7.2], 'herbes de Provence': [265, 9, 65, 5],
  'canned artichoke hearts': [45, 2, 8, 0.3], 'capers': [23, 2.4, 4.9, 0.9], 'hoisin sauce': [220, 3.3, 44, 3.4], 'berbere': [300, 12, 55, 10],
  'cayenne pepper': [318, 12, 56.6, 17.3], 'fresh mint': [70, 3.8, 14.9, 0.9], 'chili crisp': [600, 4, 10, 60] });
/* ===== Builder ===== */
const SKIPS = [
  { id: 'cilantro', label: 'Cilantro' }, { id: 'mushroom', label: 'Mushrooms' }, { id: 'dairy', label: 'Dairy' },
  { id: 'spicy', label: 'Spicy heat' }, { id: 'nuts', label: 'Nuts' }, { id: 'coconut', label: 'Coconut' }
];
const PMAP = Object.fromEntries(PROTEINS.map(p => [p.id, p]));
const FLMAP = Object.fromEntries(FLAVORS.map(f => [f.id, f]));
const BMAP = Object.fromEntries(BASES.map(b => [b.id, b]));
const short = i => i.short || i.n;
const KEEPCASE = /^(Korean|BBQ|Cajun|Tuscan|Caesar|Mongolian|General|Dijon|Provençal)/;
const ref = name => KEEPCASE.test(name) ? name : name[0].toLowerCase() + name.slice(1);
const soloize = t => t.replace(/^Turn the heat to ([^.]*)\./, 'Heat a drizzle of oil in a skillet over $1.');
const PANTRY = [g(2, 'tsp', 'olive or avocado oil', { key: 'cooking oil', pantry: true }), g(null, '', 'salt and black pepper', { note: 'to taste', pantry: true })];

function resolve(ing, S) {
  const hit = (ing.tags || []).some(t => S.has(t));
  if (!hit) return { ing };
  if (ing.alt && !(ing.alt.tags || []).some(t => S.has(t))) return { ing: ing.alt, swap: [short(ing), short(ing.alt)] };
  if (ing.opt) return null;
  return false;
}

function mergeIngs(a, b) {
  const out = a.map(i => ({ ...i }));
  for (const i of b) {
    const m = out.find(o => o.n === i.n && o.u === i.u);
    if (m) m.a += i.a; else out.push({ ...i });
  }
  return out;
}

function allowed(P, Fl, fid) {
  const fmt = FORMATS[fid];
  if (!Fl.formats.includes(fmt.host || fid)) return false;
  if (fmt.not && fmt.not.includes(P.id)) return false;
  if (Fl.proteins) return Fl.proteins.includes(P.id);
  if (P.id === 'eggs') return !!Fl.eggs;
  return true;
}

function build(pid, flid, fid, S) {
  const P = PMAP[pid], Fl = FLMAP[flid], fmt = FORMATS[fid];
  if (!allowed(P, Fl, fid)) return null;
  if (S.has('spicy') && Fl.heat >= 2) return null;
  const hid = fmt.host || fid;
  const by = (Fl.by && Fl.by[hid]) || {};
  const sauceDef = by.sauce !== undefined ? by.sauce : (Fl.sauce || null);
  let blocked = false;
  const swaps = [];
  const fits = i => (!i.only || i.only.includes(hid)) && (!i.skipIn || !i.skipIn.includes(hid));
  const take = arr => {
    const out = [];
    for (const i of (arr || [])) {
      if (!fits(i)) continue;
      const r = resolve(i, S);
      if (r === false) { blocked = true; continue; }
      if (r === null) continue;
      if (r.swap) swaps.push(r.swap);
      out.push(r.ing);
    }
    return out;
  };

  const baseIngs = take(typeof fmt.ings === 'function' ? fmt.ings(Fl) : fmt.ings).concat(take(by.baseAdd));
  let veg = [];
  const extras = [];
  if (fmt.ownVeg) {
    veg = take(Fl.vegMix || fmt.veg);
    for (const ex of (Fl.extras || [])) veg = mergeIngs(veg, take(ex.ings));
  } else {
    for (const ex of (Fl.extras || [])) { const ings = take(ex.ings); if (ings.length) extras.push({ ...ex, ings }); }
  }
  const rub = take(Fl.rub);
  let sauce = null;
  if (sauceDef) {
    const before = swaps.length;
    const ings = take(sauceDef.ings);
    sauce = { ...sauceDef, ings, label: (swaps.length > before && sauceDef.altName) ? sauceDef.altName : sauceDef.name };
  }
  const toppings = take(Fl.toppings);
  const garnish = take(Fl.garnish);
  let dressing = null;
  if (fmt.salad && !(sauce && sauce.mode === 'drizzle' && !sauce.notDressing)) {
    const was = blocked;
    let d = Fl.dressing ? take(Fl.dressing.ings) : null;
    if (blocked && !was) { blocked = false; d = null; }
    dressing = (d && d.length) ? { name: Fl.dressing.name, ings: d, store: !Fl.dressing.make } : { name: VINAIGRETTE.name, ings: VINAIGRETTE.ings.slice() };
  }
  if (blocked) return null;

  // ---------- context ----------
  const isEgg = P.kind === 'eggs';
  const mode = sauce ? sauce.mode : 'none';
  const sref = sauce ? ref(sauce.label) : '';
  const pn = P.name;
  const flake = ['strips', 'small'].includes(fmt.cut) || ['pasta', 'oats', 'greens'].includes(fmt.base);
  const pPhrase = P.kind === 'steak' ? 'the sliced steak' : P.kind === 'salmon' ? (flake ? 'the flaked salmon' : 'the salmon') : 'the ' + pn;
  const aside = P.kind === 'steak' ? 'Set the sliced steak aside.' : `Move the ${pn} to a plate.`;
  const poach = isEgg && mode === 'simmer' && !!fmt.poach;
  const eggStyle = isEgg ? (poach ? 'poached' : fmt.egg) : null;
  const solo = isEgg && !poach && ['glaze', 'pan', 'simmer'].includes(mode) && !fmt.stir && !(fmt.handlesSauce && mode === 'glaze');
  const isPasta = fmt.base === 'pasta';
  let fm = mode;
  if (solo) fm = 'drizzle';
  if (isPasta && P.kind === 'steak' && mode === 'glaze') fm = 'none';
  if (isPasta && P.kind === 'salmon' && (mode === 'glaze' || mode === 'pan')) fm = 'none';
  const mixed = isPasta && !isEgg && P.kind !== 'salmon' && ['simmer', 'glaze', 'pan'].includes(fm);
  const extraNames = extras.flatMap(e => e.ings.map(short));
  const topNames = toppings.map(short);
  const garNames = garnish.map(short);
  const rubNames = rub.map(short);
  const dref = dressing ? ref(dressing.name) : sref;
  const sauceSide = sauce && (mode === 'drizzle' || mode === 'toss' || solo);
  const c = {
    p: pPhrase, pn, aside, mode: fm, mixed, sauce: sref, dress: dref,
    extras: extraNames, toppings: topNames, garnish: garNames, vegNames: veg.map(short),
    top: list([pPhrase, ...extraNames, ...topNames]),
    inSauce: sauceSide,
    side: [...topNames, ...(sauceSide ? ['the ' + sref] : []), ...garNames]
  };

  // ---------- steps ----------
  const steps = [];
  const add = s => { if (s) steps.push(s.replace(/\s+/g, ' ').trim()); };
  const swapText = t => swaps.reduce((acc, [from, to]) => acc.replace(new RegExp('\\b' + from + '\\b', 'g'), to), t);

  if (fmt.start) {
    const ss = [].concat(typeof fmt.start === 'function' ? fmt.start(c) : fmt.start);
    if (by.baseNote) ss[0] += ' ' + by.baseNote;
    ss.forEach(s => add(s));
  }
  if (sauce && ['glaze', 'drizzle', 'toss'].includes(mode) && !sauce.noMake) {
    const names = list(sauce.ings.map(short));
    add(sauce.make ? sauce.make.replace('{list}', names) : `Make the ${sref}: whisk together the ${names}${sauce.water ? ', plus 1 tablespoon of water per serving' : ''}.`);
  }
  if (dressing && !dressing.store) add(`Make the ${dref}: whisk together the ${list(dressing.ings.map(short))} with a pinch of salt.`);
  if (toppings.length) add(`Prep the ${list(topNames)} and set aside.`);
  for (const ex of extras.filter(e => e.how === 'steam')) add(`Microwave the ${list(ex.ings.map(short))} in a covered bowl with a splash of water for 3–4 minutes, until crisp-tender. Season with salt.`);
  if (eggStyle === 'boiled') add(`Cook the eggs: lower them into boiling water and cook 7 minutes for jammy yolks or 10 for firm (USDA recommends firm). Cool in ice water, peel, and halve. Season with ${list(['salt', 'pepper', ...rubNames])}.`);

  const sea = list([...rubNames, 'salt', 'pepper']);
  const cutTxt = { pieces: 'cut it into 1-inch pieces', strips: 'slice it into thin strips', small: 'cut it into ½-inch pieces' }[fmt.cut];
  if (P.kind === 'pieces') add(`Pat the ${pn} dry, ${cutTxt}, and toss with ${sea}.`);
  if (P.kind === 'shrimp') add(`Pat the shrimp dry${fmt.cut === 'small' ? ' and chop into bite-size pieces' : ''}, then toss with ${sea}.`);
  if (P.kind === 'steak') add(`Pat the steak dry and season all over with ${sea}.`);
  if (P.kind === 'salmon') add(`Pat the salmon dry and season the flesh side with ${sea}.`);

  const panExtras = extras.filter(e => e.how !== 'steam');
  for (const ex of panExtras) {
    const names = list(ex.ings.map(short));
    add(ex.text || (ex.how === 'sear'
      ? `Heat a drizzle of oil in a large skillet over medium-high. Sear the ${names} 2–3 minutes, until lightly charred, and move to a plate.`
      : `Heat a drizzle of oil in a large skillet over medium-high. Cook the ${names} 4–5 minutes, until softened and browned in spots. Season with salt and move to a plate.`));
  }

  if (solo) {
    if (mode === 'glaze') add(sauce.noMake ? `Warm the ${sref} in a small pan.` : `Simmer the ${sref} in a small pan 1–2 minutes, until it thickens.`);
    else add(soloize(sauce.cook));
  }

  if (!isEgg) {
    let ck = P.cook;
    if (panExtras.length) ck = ck.replace(/in a (large|heavy|nonstick) skillet/, 'in the same skillet');
    if (P.kind === 'ground') ck += rub.length ? ` Stir in the ${list([...rubNames, 'a big pinch of salt'])} during the last minute.` : ' Season with salt and pepper.';
    add(ck);
  } else if (eggStyle === 'scrambled') {
    add(`Whisk the eggs with ${list(['a pinch of salt', ...rubNames])}. Cook in a drizzle of oil in a nonstick skillet over medium-low, stirring gently, 2–3 minutes, until just set (160°F).`);
  } else if (poach) {
    add(`${soloize(sauce.cook)} Make 2 or 3 small wells per serving, crack an egg into each, cover, and cook on low 5–7 minutes, until the whites are set and the yolks are as firm as you like (USDA recommends firm). Season with ${list(['salt', 'pepper', ...rubNames])}.`);
  }

  if (fmt.stir) {
    let s = `${aside} Add a little more oil and the ${list(veg.map(short))}, and stir-fry 4–5 minutes, until crisp-tender.`;
    const ret = P.kind === 'steak' ? 'the steak' : 'the ' + pn;
    if (mode === 'glaze') s += ` Return ${ret}, pour in the ${sref}, and toss 1–2 minutes, until it bubbles and coats everything.`;
    else if (mode === 'simmer') s += ` ${sauce.cook} Return ${ret} and toss to coat.`;
    else if (mode === 'pan') s += ` Return ${ret}. ${sauce.cook}`;
    else s += ` Return ${ret} and toss.`;
    add(s);
  } else if (!isEgg && !poach) {
    if (mode === 'glaze' && !fmt.handlesSauce) {
      if (P.kind === 'steak') add(`While the steak rests, pour the ${sref} into the hot pan and simmer about 1 minute, until glossy. Spoon it over the sliced steak.`);
      else if (P.kind === 'salmon') add(`Turn the heat to medium-low, pour in the ${sref}, and spoon it over the fillets for about 1 minute as it bubbles and thickens.`);
      else add(`Turn the heat to medium, pour in the ${sref}, and toss 1–2 minutes, until it bubbles and coats everything.`);
    } else if (mode === 'pan') {
      const tail = sauce.noToss ? '' : (P.kind === 'salmon' ? ' Spoon it over the fillets.' : ' Toss to coat.');
      add((P.kind === 'steak' ? 'Return the sliced steak to the pan. ' : '') + sauce.cook + tail);
    } else if (mode === 'simmer') {
      if (P.kind === 'steak') add(`${sauce.cook} Add the sliced steak at the end just to warm it through.`);
      else if (P.kind === 'salmon') add(`Move the salmon to a plate. ${sauce.cook}${isPasta ? '' : ' Nestle the salmon back in and spoon the sauce over it for 1 minute.'}`);
      else add(`Move the ${pn} to a plate. ${sauce.cook} Return the ${pn} and any juices and simmer 1–2 minutes more.`);
    } else if (mode === 'toss' && !isPasta) {
      if (P.kind === 'steak') add(`Toss the sliced steak with the ${sref}.`);
      else if (P.kind === 'salmon') add(`Spoon the ${sref} over the salmon.`);
      else add(`Take the pan off the heat and toss the ${pn} with the ${sref}.`);
    }
  }

  if (fmt.finish) add(fmt.finish(c));
  if (eggStyle === 'fried') add(`Fry the eggs: heat a drizzle of oil in a nonstick skillet over medium, crack in the eggs, and cook 3–4 minutes, until the whites are set. Cover for the last minute for firmer yolks (USDA recommends firm). Season with ${list(['salt', 'pepper', ...rubNames])}.`);

  let serve = fmt.serve(c);
  if (!fmt.serveOwn) {
    let line = '';
    if (sauce) {
      if (fmt.salad) { if (mode === 'drizzle' && sauce.notDressing) line = `Spoon the ${sref} over the top.`; }
      else if (isPasta) { if (fm === 'none' && mode !== 'none') line = `Spoon any extra ${sref} over the top.`; }
      else if (mode === 'drizzle') line = `Spoon the ${sref} over the top.`;
      else if (isEgg && (solo || mode === 'toss')) line = `Spoon the ${sref} over the eggs.`;
      else if (mode === 'simmer' && !fmt.stir) line = 'Spoon the extra sauce over everything.';
    }
    if (line) serve += ' ' + line;
    if (garNames.length) serve += ` Finish with ${list(garNames)}.`;
  }
  add(serve);

  // ---------- numbers ----------
  let cook = P.time;
  if (panExtras.length) cook += Math.max(...panExtras.map(e => e.time || (e.how === 'sear' ? 3 : 5)));
  if (sauce) cook += mode === 'simmer' ? (sauce.time || 5) : (mode === 'glaze' || mode === 'pan') ? 2 : 0;
  if (eggStyle === 'boiled') cook = 12;
  if (poach) cook = (sauce.time || 5) + 7;
  if (fmt.stir) cook += 0;
  let total = Math.max(fmt.time + 3, 10 + cook) + (fmt.post || 0);
  total = Math.ceil(total / 5) * 5;

  const groups = [];
  groups.push({ title: P.chip, role: 'protein', items: [P.ing] });
  if (baseIngs.length) groups.push({ title: fmt.groupTitle || BMAP[fmt.base].chip, role: 'base', items: baseIngs });
  if (veg.length) groups.push({ title: 'Vegetables', role: 'veg', items: veg });
  if (rub.length) groups.push({ title: 'Seasoning', role: 'seasoning', items: rub });
  if (sauce && sauce.ings.length) groups.push({ title: sauce.label, role: 'sauce', items: sauce.ings });
  if (dressing) groups.push({ title: dressing.name, role: 'dressing', items: dressing.ings });
  if (extras.length) groups.push({ title: veg.length ? 'Extras' : 'Vegetables', role: 'veg', items: extras.flatMap(e => e.ings.map(i => ({ ...i, how: e.how }))) });
  if (toppings.length) groups.push({ title: 'Toppings', role: 'toppings', items: toppings });
  if (garnish.length) groups.push({ title: 'To finish (optional)', role: 'garnish', items: garnish });
  groups.push({ title: 'Pantry', role: 'pantry', items: PANTRY });
  const cooked = portion(groups, { pid, pLabel: P.chip, hid, own: !!fmt.ownVeg && !fmt.stir, stir: !!fmt.stir, smode: solo ? 'drizzle' : mode });

  const macros = nutrition(groups);
  const protein = macros.p;
  const tKey = fmt.host ? fmt.title : ((Fl.titles && (Fl.titles[fid + '@' + pid] || (by.title ? null : Fl.titles[fid]))) || by.title || fmt.title);
  const pLabel = Fl.name.toLowerCase().endsWith(P.label.toLowerCase()) && tKey.includes('{F} {P}') ? '' : P.label;
  const title = tKey.replace('{F}', Fl.name).replace('{P}', pLabel).replace(/\s+/g, ' ').trim();

  return { id: `${pid}|${flid}|${fid}`, title, cuisine: Fl.cuisine, heat: Fl.heat, format: fmt.label, time: total, protein, macros, cooked, groups, steps: steps.map(swapText), temp: P.temp };
}

/* Pool for any mix of proteins and bases. Single-base dishes join when their base is picked;
   two-base combos (e.g. rice + greens bowls) join only when both of their bases are picked. */
const BUILT = new Map();
function cachedBuild(pid, flid, fid, S, sk) {
  const k = `${sk}#${pid}|${flid}|${fid}`;
  if (!BUILT.has(k)) BUILT.set(k, build(pid, flid, fid, S));
  return BUILT.get(k);
}
function recipesFor(pids, bases, S, maxTime) {
  const sel = new Set([].concat(bases));
  const sk = [...S].sort().join(',');
  const fids = Object.keys(FORMATS).filter(fid => {
    const f = FORMATS[fid];
    return f.bases ? f.bases.every(b => sel.has(b)) : sel.has(f.base);
  });
  const out = [];
  for (const pid of [].concat(pids)) for (const Fl of FLAVORS) for (const fid of fids) {
    if (!Fl.formats.includes(FORMATS[fid].host || fid)) continue;
    const r = cachedBuild(pid, Fl.id, fid, S, sk);
    if (r && (!maxTime || r.time <= maxTime)) out.push(r);
  }
  return out;
}

/* Random order with no back-to-back repeats of the same flavor, dish style, or protein when avoidable. */
function spreadShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  const key = r => r.id.split('|');
  const out = [];
  while (a.length) {
    const last = out.length ? key(out[out.length - 1]) : null;
    let pick = 0;
    if (last) {
      const score = r => { const [p, f, fm] = key(r); return (f === last[1] ? 4 : 0) + (fm === last[2] ? 2 : 0) + (p === last[0] ? 1 : 0); };
      let best = Infinity;
      for (let i = 0; i < Math.min(a.length, 60); i++) { const s = score(a[i]); if (s < best) { best = s; pick = i; if (!s) break; } }
    }
    out.push(a.splice(pick, 1)[0]);
  }
  return out;
}

/* ---------- amounts ---------- */
const FR = [[0, ''], [1 / 8, '⅛'], [1 / 4, '¼'], [1 / 3, '⅓'], [3 / 8, '⅜'], [1 / 2, '½'], [5 / 8, '⅝'], [2 / 3, '⅔'], [3 / 4, '¾'], [7 / 8, '⅞'], [1, '']];
function nice(a) {
  let w = Math.floor(a + 1e-9); const f = a - w; let best = FR[0], d = 9;
  for (const fr of FR) { const dd = Math.abs(f - fr[0]); if (dd < d - 1e-9) { d = dd; best = fr; } }
  if (best[0] === 1) return String(w + 1);
  if (!w && !best[1]) return '⅛';
  return (w ? String(w) : '') + best[1];
}
const isMult = (a, m) => Math.abs(a / m - Math.round(a / m)) < 0.02;
function norm(a, u) {
  if (u === 'tsp' && a >= 3 - 1e-9 && (isMult(a, 1.5) || a >= 6)) { a /= 3; u = 'tbsp'; }
  if (u === 'tbsp' && a >= 4 - 1e-9 && (isMult(a, 4) || isMult(a, 16 / 3) || a >= 8)) { a /= 16; u = 'cup'; }
  if (u === 'oz' && a >= 16 - 1e-9) { a /= 16; u = 'lb'; }
  return [a, u];
}
const UNIT = { tsp: ['tsp', 'tsp'], tbsp: ['tbsp', 'tbsp'], cup: ['cup', 'cups'], oz: ['oz', 'oz'], lb: ['lb', 'lb'], head: ['head', 'heads'], stalk: ['stalk', 'stalks'] };
function amount(a, u, ing) {
  if (a == null) return '';
  if (u === 'pinch') return a <= 1.01 ? 'pinch' : `${Math.round(a)} pinches`;
  if (u === '') {
    const step = ing.key === 'eggs' ? 1 : ing.key === 'garlic' ? 0.5 : 0.25;
    const r = Math.max(step, Math.round(a / step) * step);
    return nice(r);
  }
  [a, u] = norm(a, u);
  if (u === 'oz') return `${Math.max(1, Math.round(a))} oz`;
  return `${nice(a)} ${UNIT[u][a > 1.01 ? 1 : 0]}`;
}
function itemName(a, ing) { return (ing.u === '' && a > 1.01 && ing.pl) ? ing.pl : ing.n; }
function line(ing, s) {
  const a = ing.a == null ? null : ing.a * s;
  return { amt: amount(a, ing.u, ing), item: itemName(a ?? 1, ing) + (ing.note ? ', ' + ing.note : ''), g: fmtG(gramsOf(ing, a)) };
}

/* ---------- grocery list ---------- */
const VOL = { tsp: 1, tbsp: 3, cup: 48 };
function grocery(r, s) {
  const map = new Map();
  for (const gr of r.groups) for (const i of gr.items) {
    if (i.pantry || i.a == null) continue;
    const fam = VOL[i.u] ? 'vol' : i.u === 'oz' ? 'wt' : 'n:' + i.u;
    const k = (i.key || i.n).toLowerCase() + '|' + fam;
    const amt = (VOL[i.u] ? i.a * VOL[i.u] : i.a) * s;
    if (map.has(k)) map.get(k).amt += amt; else map.set(k, { ing: i, fam, amt });
  }
  const lines = [];
  for (const { ing, fam, amt } of map.values()) {
    const a = fam === 'vol' ? amount(amt, 'tsp', ing) : amount(amt, ing.u, ing);
    const grams = gramsOf(ing, fam === 'vol' ? amt / VOL[ing.u] : amt);
    const notes = [grams != null && grams >= 1 ? fmtG(grams) : '', ing.hint || ''].filter(Boolean).join('; ');
    lines.push(`- ${a ? a + ' ' : ''}${itemName(amt, ing)}${notes ? ` (${notes})` : ''}`);
  }
  return `${r.title} (${s} serving${s > 1 ? 's' : ''})\n\n${lines.join('\n')}\n\nPantry check: olive or avocado oil, salt, black pepper`;
}
