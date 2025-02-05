export const SelectBudgetOption = [
  {
    id: 1,
    icon: "💸",
    title: "Budget",
    desc: "Spend less, travel more",
  },
  {
    id: 2,
    icon: "💳",
    title: "Moderate",
    desc: "Vibe Check, so do Wallet",
  },
  {
    id: 3,
    icon: "💎",
    title: "Luxury",
    desc: "I don't care about money",
  },
];

export const SelectTravelList = [
  {
    id: 1,
    title: "Solo",
    desc: "Solo Traveler",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Traveling with Partner",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Traveling with Family",
    icon: "👨‍👩‍👧‍ ",
    people: "3-5 people",
  },
  {
    id: 4,
    title: "Group",
    desc: "Traveling with Friends",
    icon: "🤘",
    people: "5+ people",
  },
];

export const AI_PROMPT =
  "Generate travel plan for Location: {destination}, for {totalDays} " +
  "Days for {noOfPeople} people with a {budget} budget, give me the hotel list with Hotel name, address, " +
  "price, hotel img url, geo coordinates, rating, description, suggest iternary placeName, place details, " +
  "place img url, geo coordinates, ticket price, rating, time to travel each of the locations for {totalDays} with each day plan with best time to visit in JSON format";
