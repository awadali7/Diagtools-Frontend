import React from "react";
import {
    Wrench,
    Cog,
    Radio,
    Key,
    Battery,
    Hammer,
    Signal,
    Zap,
    Laptop,
} from "lucide-react";

export interface Video {
    title: string;
    videoUrl: string;
    description?: string;
    pdfs?: { name: string; url: string }[];
    markdown?: string;
}

export interface CourseItem {
    name: string;
    slug: string;
    icon: React.ComponentType<{ className?: string }>;
    videos: Video[];
    price: number;
    coverImage?: string;
}

export const courses: CourseItem[] = [
    // 1️⃣ Diagnostic Tools
    {
        name: "Diagnostic Tools",
        slug: "diagnostic-tools",
        icon: Wrench,
        price: 49.99,
        coverImage:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Intro to OBD Scanners",
                videoUrl:
                    "https://www.youtube.com/embed/4dVDuy0JPpE?si=DW4pGh-KrTItgC3E",
                description:
                    "Learn the fundamentals of OBD (On-Board Diagnostics) scanners, including how they work, different types available, and how to use them effectively for vehicle diagnostics.",
                pdfs: [
                    {
                        name: "OBD Scanner User Guide.pdf",
                        url: "/pdfs/obd-scanner-guide.pdf",
                    },
                    {
                        name: "Diagnostic Codes Reference.pdf",
                        url: "/pdfs/diagnostic-codes.pdf",
                    },
                ],
                markdown: `## Key Learning Points

- Understanding OBD-II protocols
- Reading and clearing diagnostic trouble codes
- Interpreting live data streams
- Common diagnostic procedures

### Equipment Needed

1. OBD-II Scanner
2. Vehicle with OBD-II port
3. Laptop or mobile device (for advanced scanners)

### Safety Reminders

Always ensure the vehicle is in a safe location and the engine is off before connecting diagnostic equipment.`,
            },
            {
                title: "Full System Diagnostic Walkthrough",
                videoUrl:
                    "https://www.youtube.com/embed/3eD_1jYWfCw?si=IXbYRqQZRldpMeD6",
            },
            {
                title: "Live Data & Freeze Frame Explained",
                videoUrl:
                    "https://www.youtube.com/embed/VmpUzKU8Sp4?si=DTqOIfEPSQnoDCRD",
            },
        ],
    },

    // 2️⃣ TPMS Service
    {
        name: "TPMS Service",
        slug: "tpms-service",
        icon: Cog,
        price: 39.99,
        coverImage:
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=400&fit=crop",
        videos: [
            {
                title: "What is TPMS? Basics Explained",
                videoUrl:
                    "https://www.youtube.com/embed/9VbYE5qFjqs?si=ULjzseXq9AOKp465",
            },
            {
                title: "Sensor Replacement Procedure",
                videoUrl:
                    "https://www.youtube.com/embed/wjn8dQUg3H0?si=6jleoLPAYj1-_Q6C",
            },
            {
                title: "Relearn Process for Common Cars",
                videoUrl:
                    "https://www.youtube.com/embed/4dVDuy0JPpE?si=DW4pGh-KrTItgC3E",
            },
        ],
    },

    // 3️⃣ ADAS Calibration
    {
        name: "ADAS Calibration",
        slug: "adas-calibration",
        icon: Radio,
        price: 59.99,
        coverImage:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Introduction to ADAS",
                videoUrl:
                    "https://www.youtube.com/embed/3eD_1jYWfCw?si=IXbYRqQZRldpMeD6",
            },
            {
                title: "Front Camera Calibration",
                videoUrl:
                    "https://www.youtube.com/embed/VmpUzKU8Sp4?si=DTqOIfEPSQnoDCRD",
            },
            {
                title: "Radar Sensor Alignment Basics",
                videoUrl:
                    "https://www.youtube.com/embed/9VbYE5qFjqs?si=ULjzseXq9AOKp465",
            },
        ],
    },

    // 4️⃣ Key Programming
    {
        name: "Key Programming",
        slug: "key-programming",
        icon: Key,
        price: 44.99,
        coverImage:
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Key Programming Basics",
                videoUrl:
                    "https://www.youtube.com/embed/4dVDuy0JPpE?si=DW4pGh-KrTItgC3E",
            },
            {
                title: "Programming New Keys",
                videoUrl:
                    "https://www.youtube.com/embed/3eD_1jYWfCw?si=IXbYRqQZRldpMeD6",
            },
        ],
    },

    // 5️⃣ Battery Service
    {
        name: "Battery Service",
        slug: "battery-service",
        icon: Battery,
        price: 34.99,
        coverImage:
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Battery Testing & Diagnosis",
                videoUrl:
                    "https://www.youtube.com/embed/VmpUzKU8Sp4?si=DTqOIfEPSQnoDCRD",
            },
            {
                title: "Battery Replacement Guide",
                videoUrl:
                    "https://www.youtube.com/embed/9VbYE5qFjqs?si=ULjzseXq9AOKp465",
            },
        ],
    },

    // 6️⃣ Specialty Tools
    {
        name: "Specialty Tools",
        slug: "specialty-tools",
        icon: Hammer,
        price: 29.99,
        coverImage:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Essential Specialty Tools",
                videoUrl:
                    "https://www.youtube.com/embed/wjn8dQUg3H0?si=6jleoLPAYj1-_Q6C",
            },
        ],
    },

    // 7️⃣ Radar Sensor
    {
        name: "Radar Sensor",
        slug: "radar-sensor",
        icon: Signal,
        price: 39.99,
        coverImage:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Radar Sensor Overview",
                videoUrl:
                    "https://www.youtube.com/embed/4dVDuy0JPpE?si=DW4pGh-KrTItgC3E",
            },
        ],
    },

    // 8️⃣ EV Chargers
    {
        name: "EV Chargers",
        slug: "ev-chargers",
        icon: Zap,
        price: 54.99,
        coverImage:
            "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop",
        videos: [
            {
                title: "EV Charger Installation",
                videoUrl:
                    "https://www.youtube.com/embed/3eD_1jYWfCw?si=IXbYRqQZRldpMeD6",
            },
        ],
    },

    // 9️⃣ Software Updates
    {
        name: "Software Updates",
        slug: "software-updates",
        icon: Laptop,
        price: 49.99,
        coverImage:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
        videos: [
            {
                title: "Software Update Procedures",
                videoUrl:
                    "https://www.youtube.com/embed/VmpUzKU8Sp4?si=DTqOIfEPSQnoDCRD",
            },
        ],
    },
];
