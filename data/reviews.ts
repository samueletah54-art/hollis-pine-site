// PLACEHOLDER REVIEWS. These are sample text so the layout can be judged.
// Replace with real customer reviews before launch. Publishing invented reviews
// (especially in Review schema) can violate FTC rules and Google guidelines.

export type Review = {
  slug: string;
  name: string;
  city: string;
  state: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO
  title: string;
  body: string;
};

export const reviews: Review[] = [
  { slug: "fraser-fir", name: "Dana", city: "Asheville", state: "NC", rating: 5, date: "2025-12-04", title: "Arrived on a Wednesday, up by Thursday", body: "The trunk was wet and the tag said it was cut Monday. Needles stayed put until we took it down on the 4th. We'd drag a seven-footer home from the lot and hate it. This was easier." },
  { slug: "fraser-fir", name: "Marcus", city: "Pittsburgh", state: "PA", rating: 4, date: "2025-12-09", title: "Great tree, one tilted box", body: "Box was crushed at one corner but the tree was fine. Fluffed out in an hour." },
  { slug: "balsam-fir", name: "Katie", city: "Burlington", state: "VT", rating: 5, date: "2025-12-11", title: "Smells like Christmas", body: "Walked in the front door and the whole house smelled like it. Water twice a day and don't skip it." },
  { slug: "noble-fir", name: "Priya", city: "Denver", state: "CO", rating: 5, date: "2025-12-06", title: "Held our heavy glass ornaments", body: "My grandmother's ornaments are heavy. Every branch held. Tree was still green on January 8th." },
  { slug: "douglas-fir", name: "Tom", city: "Spokane", state: "WA", rating: 4, date: "2025-12-02", title: "Good for the price", body: "Soft and full. Needed daily water. Kids loved the feel of it." },
  { slug: "scotch-pine", name: "Lena", city: "Columbus", state: "OH", rating: 5, date: "2025-12-14", title: "I forgot to water it twice", body: "And it still held every needle. I'm sorry, tree. Thank you, tree." },
  { slug: "colorado-blue-spruce", name: "Ray", city: "Minneapolis", state: "MN", rating: 5, date: "2025-12-08", title: "That color", body: "Silvery blue under white lights. People stop in the street to look. Wear gloves." },
  { slug: "classic-full-prelit", name: "Joanne", city: "Tucson", state: "AZ", rating: 5, date: "2025-11-29", title: "Finally, a fake tree that looks real", body: "Twenty minutes of fluffing and it looked like a tree. Lights are even and warm. Will keep it ten years." },
  { slug: "slim-pencil-prelit", name: "Ben", city: "Brooklyn", state: "NY", rating: 5, date: "2025-12-01", title: "Fits our hallway", body: "Two feet wide, six feet tall. It does not block the door." },
  { slug: "commercial-giant-fir", name: "Rosa", city: "Charleston", state: "SC", rating: 5, date: "2025-12-03", title: "Installed in one morning", body: "A twenty-foot tree in our hotel lobby, up and lit before the first guests came down for breakfast. They took it away January 3rd." },
];

export const testimonials = [
  { quote: "The trunk was wet and the tag said it was cut Monday. Needles stayed put until the 4th.", name: "Dana", where: "Asheville, NC", bought: "Fraser fir, 7–8 ft" },
  { quote: "A twenty-foot tree in our lobby, up and lit before the first guests came down for breakfast.", name: "Rosa", where: "Charleston, SC", bought: "Commercial giant fir, 20 ft" },
  { quote: "I forgot to water it twice and it still held every needle. I'm sorry, tree. Thank you, tree.", name: "Lena", where: "Columbus, OH", bought: "Scotch pine, 6–7 ft" },
];
