let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYearElement = document.getElementById("month-year");
const daysElement = document.querySelector(".days");

function generateCalendar(month, year) {
    daysElement.innerHTML = "";
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    monthYearElement.textContent = `${year}년 ${month + 1}월`;

    // 요일 헤더 생성
    const dayHeaders = ["일", "월", "화", "수", "목", "금", "토"];
    dayHeaders.forEach((day) => {
        const dayHeaderElement = document.createElement("div");
        dayHeaderElement.textContent = day;
        dayHeaderElement.classList.add("day-header");
        daysElement.appendChild(dayHeaderElement);
    });

    // 첫째 주의 빈 칸 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDayElement = document.createElement("div");
        emptyDayElement.classList.add("day", "empty");
        daysElement.appendChild(emptyDayElement);
    }

    // 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        dayElement.classList.add("day");
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

// 모달 열기
function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// 메모 저장
function saveMemo() {
    const memoInput = document.getElementById("memoInput");
    const memo = memoInput.value.trim();
    const activeDay = document.querySelector(".day.active");

    if (memo !== "") {
        
        if (activeDay) {
            const memoData = localStorage.getItem(activeDay.textContent);
            if (memoData) {
                localStorage.removeItem(activeDay.textContent);
            }

            localStorage.setItem(activeDay.textContent, JSON.stringify([memo]));
            activeDay.classList.add("memo");

            closeModal();
        } else {
            alert("날짜를 선택하세요!");
        }
    } else {
        localStorage.removeItem(activeDay.textContent);
        activeDay.classList.remove("memo");
        closeModal();
    }
}

// 날짜 클릭 시 모달 열기
document.addEventListener("DOMContentLoaded", function () {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", function () {
            days.forEach((d) => d.classList.remove("active"));
            this.classList.add("active");
            openModal();
            updateMemoInput(this.textContent);
        });
    });
});

// 모달 내부의 메모 내용 업데이트
function updateMemoInput(date) {
    const memoData = localStorage.getItem(date);
    const memoInput = document.getElementById("memoInput");
    memoInput.value = memoData ? JSON.parse(memoData).join("\n") : "";
}

// 달력에 메모가 있는 날짜에 배경색 적용
function highlightMemoDates() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        const memoData = localStorage.getItem(day.textContent);
        if (memoData) {
            day.classList.add("memo");
        } else {
            day.classList.remove("memo");
        }
    });
}

// 페이지 로드 시 메모가 있는 날짜에 배경색 적용
document.addEventListener('DOMContentLoaded', function() {
    highlightMemoDates();
});
