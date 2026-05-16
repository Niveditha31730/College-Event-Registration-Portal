// Sample Data
const eventsData = [
    {
        id: 1,
        title: "Hackathon 2026",
        category: "technical",
        description: "24-hour coding challenge to build innovative solutions for real-world problems.",
        icon: "laptop-outline",
        date: "Oct 15",
        prize: "$1000"
    },
    {
        id: 2,
        title: "Robo Wars",
        category: "technical",
        description: "Design, build, and battle with your custom robots in the ultimate arena.",
        icon: "hardware-chip-outline",
        date: "Oct 16",
        prize: "$800"
    },
    {
        id: 3,
        title: "Battle of Bands",
        category: "non-technical",
        description: "Showcase your musical talent and rock the stage in front of thousands.",
        icon: "musical-notes-outline",
        date: "Oct 15",
        prize: "$500"
    },
    {
        id: 4,
        title: "Standup Comedy",
        category: "non-technical",
        description: "Make the audience roar with laughter in our open mic comedy night.",
        icon: "mic-outline",
        date: "Oct 17",
        prize: "$300"
    },
    {
        id: 5,
        title: "Inter-College Cricket",
        category: "sports",
        description: "T20 cricket tournament featuring top teams from across the state.",
        icon: "baseball-outline",
        date: "Oct 15-17",
        prize: "Trophy"
    },
    {
        id: 6,
        title: "E-Sports Championship",
        category: "sports",
        description: "Valorant and BGMI tournaments with massive prize pools.",
        icon: "game-controller-outline",
        date: "Oct 16",
        prize: "$600"
    }
];

const scheduleData = [
    {
        time: "Day 1 - 09:00 AM",
        title: "Opening Ceremony",
        description: "Inauguration of Nexus '26 by the Chief Guest."
    },
    {
        time: "Day 1 - 11:00 AM",
        title: "Hackathon Begins",
        description: "24-hour hackathon kick-off at the Main Auditorium."
    },
    {
        time: "Day 2 - 10:00 AM",
        title: "Robo Wars Prelims",
        description: "Initial rounds of robot combat at the Engineering Block."
    },
    {
        time: "Day 2 - 06:00 PM",
        title: "Battle of Bands",
        description: "Live performances at the Open Air Theatre."
    },
    {
        time: "Day 3 - 02:00 PM",
        title: "E-Sports Finals",
        description: "Grand finals for Valorant at the Computer Center."
    },
    {
        time: "Day 3 - 07:00 PM",
        title: "Closing Ceremony & DJ Night",
        description: "Prize distribution followed by an electrifying DJ performance."
    }
];

// DOM Elements
const eventsContainer = document.getElementById('events-container');
const scheduleContainer = document.getElementById('schedule-container');
const eventSelect = document.getElementById('eventSelect');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section-view');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');
const form = document.getElementById('registration-form');
const modal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

// Initialize App
function init() {
    renderEvents('all');
    renderSchedule();
    populateEventDropdown();
}

// Render Events
function renderEvents(filter) {
    eventsContainer.innerHTML = '';
    
    const filteredEvents = filter === 'all' 
        ? eventsData 
        : eventsData.filter(event => event.category === filter);

    filteredEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-icon">
                <ion-icon name="${event.icon}"></ion-icon>
            </div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-meta">
                <span><ion-icon name="calendar-outline"></ion-icon> ${event.date}</span>
                <span><ion-icon name="trophy-outline"></ion-icon> ${event.prize}</span>
            </div>
        `;
        eventsContainer.appendChild(card);
    });
}

// Event Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Filter
        renderEvents(btn.dataset.filter);
    });
});

// Render Schedule
function renderSchedule() {
    scheduleContainer.innerHTML = '';
    
    scheduleData.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${side}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-time">${item.time}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        scheduleContainer.appendChild(timelineItem);
    });
}

// Populate Event Dropdown in Registration Form
function populateEventDropdown() {
    eventsData.forEach(event => {
        const option = document.createElement('option');
        option.value = event.title;
        option.textContent = `${event.title} (${event.category})`;
        eventSelect.appendChild(option);
    });
}

// Navigation Logic (SPA)
function navigateTo(sectionId) {
    // Update Nav Links
    navLinks.forEach(link => {
        if(link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update Sections
    sections.forEach(section => {
        if(section.id === sectionId) {
            section.classList.add('active-section');
        } else {
            section.classList.remove('active-section');
        }
    });

    // Close mobile menu if open
    navLinksContainer.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Attach click events to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        navigateTo(sectionId);
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Form Submission & Local Storage
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Form Values
    const fullName = document.getElementById('fullName').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const branch = document.getElementById('branch').value;
    const selectedEvent = document.getElementById('eventSelect').value;

    // Create Registration Object
    const registration = {
        id: Date.now(),
        fullName,
        studentId,
        email,
        branch,
        selectedEvent,
        date: new Date().toLocaleDateString()
    };

    // Save to Local Storage
    let registrations = JSON.parse(localStorage.getItem('nexusRegistrations')) || [];
    registrations.push(registration);
    localStorage.setItem('nexusRegistrations', JSON.stringify(registrations));

    // Show Success Modal
    modal.classList.add('show');
    form.reset();
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    navigateTo('home');
});

// Run Init
document.addEventListener('DOMContentLoaded', init);
