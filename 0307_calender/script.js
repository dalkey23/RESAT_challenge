let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYearElement = document.getElementById('month-year');
const daysElement = document.querySelector('.days');

function generateCalendar(month, year) {
    daysElement.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    monthYearElement.textContent = `${year}년 ${month + 1}월`;

    // 요일 헤더 생성
    const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];
    dayHeaders.forEach(day => {
        const dayHeaderElement = document.createElement('div');
        dayHeaderElement.textContent = day;
        dayHeaderElement.classList.add('day-header');
        daysElement.appendChild(dayHeaderElement);
    });

    // 첫째 주의 빈 칸 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDayElement = document.createElement('div');
        emptyDayElement.classList.add('day', 'empty');
        daysElement.appendChild(emptyDayElement);
    }

    // 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        daysElement.appendChild(dayElement);
    }
}


function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);
