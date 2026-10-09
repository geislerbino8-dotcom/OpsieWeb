// study/service-list.js — service-list exercise
// Run:  node study/service-list.js
// Fill in each TODO, run, and check the printed results.

const services = [
  { id: 1, name: "Website Redesign",      category: "Design",      price: 25000, hours: 40,  featured: true },
  { id: 2, name: "Mobile App Build",      category: "Development", price: 80000, hours: 120, featured: false },
  { id: 3, name: "SEO Setup",             category: "Marketing",   price: 12000, hours: 10,  featured: true },
  { id: 4, name: "Cloud Migration",       category: "Development", price: 95000, hours: 160, featured: false },
  { id: 5, name: "Brand Identity",        category: "Design",      price: 30000, hours: 35,  featured: true },
  { id: 6, name: "Social Media Campaign", category: "Marketing",   price: 18000, hours: 25,  featured: false },
  { id: 7, name: "E-commerce Store",      category: "Development", price: 60000, hours: 90,  featured: true },
  { id: 8, name: "UI Audit",              category: "Design",      price: 15000, hours: 12,  featured: false },
];

// Task 1 — return a new array of just the names.          (map)
function getServiceNames(list) {
  return list.map(s => s.name);
}

// Task 2 — services costing maxPrice or less.             (filter)
function getAffordable(list, maxPrice) {
  return list.filter(s => s.price <= maxPrice);
}

// Task 3 — the ONE service with this id, or undefined.    (find)
function findService(list, id) {
  return list.find(s => s.id === id);
}

// Task 4 — a NEW array sorted by price.
// direction: "asc" = cheapest first, "desc" = most expensive first.
// MUST NOT modify the original `services` array!          (sort)
function sortByPrice(list, direction) {
  return [...list].sort((a, b) =>
    direction === "asc" ? a.price - b.price : b.price - a.price
  );
}

// Task 5 — featured services of one category, names only. (filter + map)
function getFeaturedNames(list, category) {
  return list
    .filter(s => s.featured && s.category === category)
    .map(s => s.name);
}

// ---------- checks (don't edit) ----------
console.log("1. names:          ", getServiceNames(services));
console.log("2. under 30,000:   ", getAffordable(services, 30000).map(s => s.name));
console.log("3. find id 4:      ", findService(services, 4));
console.log("4a. price asc:     ", sortByPrice(services, "asc").map(s => s.price));
console.log("4b. price desc:    ", sortByPrice(services, "desc").map(s => s.price));
console.log("4c. original left: ", services.map(s => s.price).join(","));
console.log("5. featured design:", getFeaturedNames(services, "Design"));
