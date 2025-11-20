
export interface WellnessTip {
  id: number;
  text: string;
}

export interface HealthBite {
  id: number;
  fact: string;
}

export interface DailyBenefit {
  id: number;
  name: string;
  // imageUrl removed as per request
  benefits: string[];
}

export const wellnessTips: WellnessTip[] = [
  { id: 1, text: "Practice deep breathing exercises for 5 minutes daily to reduce stress and improve mental clarity." },
  { id: 2, text: "Drink at least 8 glasses of water today to keep your body hydrated and maintain high energy levels." },
  { id: 3, text: "Take a 15-minute brisk walk after lunch to aid digestion and clear your mind for the afternoon." },
  { id: 4, text: "Aim for 7-9 hours of quality sleep tonight to allow your body to repair and fully recharge." },
  { id: 5, text: "Try a digital detox for one hour before bed to improve sleep quality and reduce eye strain." },
  { id: 6, text: "Start your day with a simple stretch routine to wake up your muscles and improve blood flow." },
  { id: 7, text: "Eat a mindful meal without distractions like phones or TV to improve digestion and satisfaction." }
];

export const healthBites: HealthBite[] = [
  { id: 1, fact: "Green tea contains antioxidants called catechins that may help boost metabolism and protect against heart disease." },
  { id: 2, fact: "Dark chocolate with 70% cocoa is rich in antioxidants and flavanols that can improve brain function." },
  { id: 3, fact: "Blueberries are one of the most antioxidant-dense foods, helping to protect your body from oxidative stress." },
  { id: 4, fact: "Almonds are packed with vitamin E, magnesium, and fiber, making them a perfect heart-healthy snack." },
  { id: 5, fact: "Apples are rich in fiber and vitamin C, and they also contain antioxidants like vitamin E and polyphenols." },
  { id: 6, fact: "Spinach is loaded with vitamins A, C, and K, as well as iron and calcium for strong bones and immunity." },
  { id: 7, fact: "Turmeric contains curcumin, a powerful anti-inflammatory compound that can help fight chronic inflammation." }
];

export const dailyBenefits: DailyBenefit[] = [
  { 
    id: 1, 
    name: "Avocados", 
    benefits: [
      "Rich in heart-healthy monounsaturated fats",
      "Contains more potassium than bananas",
      "High in fiber to aid digestion"
    ]
  },
  { 
    id: 2, 
    name: "Blueberries", 
    benefits: [
      "Packed with antioxidants to fight aging",
      "Boosts brain function and memory",
      "Low in calories but high in nutrients"
    ]
  },
  { 
    id: 3, 
    name: "Spinach", 
    benefits: [
      "Excellent source of Iron for energy",
      "High in Calcium for bone health",
      "Supports healthy vision with Vitamin A"
    ]
  },
  { 
    id: 4, 
    name: "Oranges", 
    benefits: [
      "Excellent source of Vitamin C for immunity",
      "Promotes healthy skin and collagen production",
      "Contains antioxidants that fight inflammation"
    ]
  },
  { 
    id: 5, 
    name: "Sweet Potatoes", 
    benefits: [
      "High in Vitamin A for vision and immunity",
      "Contains fiber for gut health",
      "Provides complex carbs for sustained energy"
    ]
  },
  { 
    id: 6, 
    name: "Broccoli", 
    benefits: [
      "Rich in Sulforaphane, a powerful antioxidant",
      "High in Vitamin K for bone health",
      "Supports the body's natural detoxification"
    ]
  },
  { 
    id: 7, 
    name: "Carrots", 
    benefits: [
      "Rich in Beta-carotene for eye health",
      "High in antioxidants for cellular protection",
      "Supports heart health and cholesterol balance"
    ]
  }
];