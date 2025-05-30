// ===== DATA & CONFIGURATION =====
const EXAM_DATE = new Date('2025-06-26T08:00:00');
const START_DATE = new Date('2025-01-01');

const MOTIVATION_QUOTES = [
    "Thành công là kết quả của sự chuẩn bị, chăm chỉ và học hỏi từ thất bại! 💪",
    "Mỗi ngày học tập hôm nay là một bước tiến gần hơn đến ước mơ của bạn! 🌟",
    "Không có gì là không thể nếu bạn có đủ quyết tâm và nỗ lực! 🔥",
    "Hãy tin vào bản thân - bạn mạnh mẽ hơn những gì bạn nghĩ! 💫",
    "Kiến thức là sức mạnh, hãy trang bị cho mình vũ khí mạnh nhất! 📚",
    "Mỗi phút học hôm nay sẽ tạo nên thành công ngày mai! ⏰",
    "Đừng ngại thất bại, hãy ngại không cố gắng hết mình! 🚀",
    "Ước mơ không có hạn sử dụng, bắt đầu theo đuổi từ hôm nay! ✨",
    "Bạn có thể làm được điều này! Hãy kiên trì và không bao giờ từ bỏ! 🎯",
    "Học tập không phải là chuẩn bị cho cuộc sống - học tập chính là cuộc sống! 🌱"
];

const ENCOURAGEMENT_MESSAGES = [
    {
        icon: "🌟",
        title: "Xuất sắc!",
        message: "Bạn vừa hoàn thành một phiên học tập tuyệt vời! Sự kiên trì của bạn thật đáng ngưỡng mộ."
    },
    {
        icon: "🔥",
        title: "Tuyệt vời!",
        message: "Tinh thần học tập của bạn thật phi thường! Hãy tiếp tục duy trì động lực này."
    },
    {
        icon: "💪",
        title: "Thật ấn tượng!",
        message: "Bạn đã chứng minh rằng mình có thể tập trung cao độ. Đây là bước tiến quan trọng!"
    },
    {
        icon: "🎯",
        title: "Hoàn hảo!",
        message: "Mỗi phút học tập đều đưa bạn gần hơn đến thành công. Bạn đang làm rất tốt!"
    },
    {
        icon: "⭐",
        title: "Tài giỏi!",
        message: "Khả năng tự kỷ luật của bạn thật đáng khen. Thành công đang ở phía trước!"
    },
    {
        icon: "🚀",
        title: "Siêu tốt!",
        message: "Với tinh thần học tập như thế này, không có gì có thể cản bước bạn!"
    },
    {
        icon: "💎",
        title: "Quý giá!",
        message: "Thời gian bạn đầu tư cho việc học là khoản đầu tư tốt nhất cho tương lai!"
    },
    {
        icon: "🏆",
        title: "Chiến thắng!",
        message: "Bạn đã chiến thắng sự lười biếng và phân tâm. Đó là chiến thắng lớn nhất!"
    },
    {
        icon: "🌅",
        title: "Tỏa sáng!",
        message: "Như ánh bình minh, kiến thức của bạn đang dần lan tỏa và chiếu sáng tương lai!"
    },
    {
        icon: "🎊",
        title: "Chúc mừng!",
        message: "Mỗi phiên học hoàn thành là một bước tiến trên con đường thành công của bạn!"
    }
];

const MUSIC_PLAYLIST = [
    "./nhac/bai1.mp3",
    "./nhac/bai2.mp3",
    "./nhac/bai3.mp3",
    "./nhac/bai4.mp3",
    "./nhac/bai5.mp3"
];

const THEMES = [
    'theme-gradient',
    'theme-ocean', 
    'theme-sunset',
    'theme-forest',
    'theme-night',
    'theme-aurora'
];

// ===== GLOBAL VARIABLES =====
let currentTheme = 0;
let studyTimer = null;
let studyTime = 25 * 60; // 25 minutes in seconds
let currentStudyTime = studyTime;
let isTimerRunning = false;
let currentMusic = null;
let isMusicPlaying = false;
let currentQuoteIndex = 0;
let currentSongIndex = 0;
let studySessionsToday = 0;
let totalStudyTime = 0;
let notificationPermissionRequested = false;
let isYouthBackground = true; // Track current background mode

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeYouthBackground();
    initializeBackgroundElements();
    initializeMusic();
    initializeQuotes();
    startExamCountdown();
    updateProgressBar();
    
    // Update every second
    setInterval(() => {
        updateExamCountdown();
        updateProgressBar();
    }, 1000);
    
    // Change quote every 30 seconds
    setInterval(changeMotivationQuote, 30000);
});

// ===== YOUTH BACKGROUND MANAGEMENT =====
function initializeYouthBackground() {
    // Set initial youth background
    document.getElementById('body').className = 'initial-background';
    isYouthBackground = true;
    
    // Show youth background elements
    const youthBg = document.getElementById('youthBackground');
    if (youthBg) {
        youthBg.style.display = 'block';
    }
}

function toggleBackground() {
    const body = document.getElementById('body');
    const youthBg = document.getElementById('youthBackground');
    
    if (isYouthBackground) {
        // Switch to theme background
        isYouthBackground = false;
        youthBg.style.display = 'none';
        currentTheme = Math.floor(Math.random() * THEMES.length);
        body.className = THEMES[currentTheme];
        
        // Enable auto theme changing
        if (!window.themeChangeInterval) {
            window.themeChangeInterval = setInterval(changeTheme, 120000);
        }
    } else {
        // Switch back to youth background
        isYouthBackground = true;
        youthBg.style.display = 'block';
        body.className = 'initial-background';
        
        // Disable auto theme changing
        if (window.themeChangeInterval) {
            clearInterval(window.themeChangeInterval);
            window.themeChangeInterval = null;
        }
    }
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    // Theme will be initialized when toggling from youth background
    currentTheme = 0;
}

function changeTheme() {
    if (!isYouthBackground) {
        currentTheme = (currentTheme + 1) % THEMES.length;
        document.getElementById('body').className = THEMES[currentTheme];
    }
}

// ===== BACKGROUND ELEMENTS =====
function initializeBackgroundElements() {
    createStars();
    createFloatingShapes();
}

function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function createFloatingShapes() {
    const shapesContainer = document.getElementById('shapes');
    const shapes = ['📚', '✏️', '🎓', '⭐', '💪', '🎯', '🔥', '💡', '📖', '🏆'];
    
    setInterval(() => {
        // Only create floating shapes when not in youth background
        if (!isYouthBackground) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            shape.style.left = Math.random() * 100 + '%';
            shape.style.fontSize = Math.random() * 15 + 20 + 'px';
            shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
            shapesContainer.appendChild(shape);
            
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.remove();
                }
            }, 25000);
        }
    }, 4000);
}

// ===== MUSIC MANAGEMENT =====
function initializeMusic() {
    try {
        currentMusic = new Audio();
        currentMusic.loop = false;
        currentMusic.volume = 0.3;
        
        // Load first song
        if (MUSIC_PLAYLIST.length > 0) {
            currentMusic.src = MUSIC_PLAYLIST[currentSongIndex];
            
            // Auto play next song when current ends
            currentMusic.addEventListener('ended', function() {
                nextSong();
            });
            
            // Update display when song loads
            currentMusic.addEventListener('loadeddata', function() {
                updateMusicDisplay();
            });
        }
    } catch (error) {
        console.log('Không thể tải nhạc');
    }
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!isMusicPlaying) {
        // Start music
        try {
            if (currentMusic && currentMusic.src) {
                currentMusic.play();
                isMusicPlaying = true;
                musicToggle.textContent = '🔊';
                updateMusicDisplay();
            }
        } catch (error) {
            console.log('Không thể phát nhạc');
            musicToggle.textContent = '🔇';
        }
    } else {
        // Pause music
        try {
            currentMusic.pause();
            isMusicPlaying = false;
            musicToggle.textContent = '🔇';
            document.getElementById('currentSong').textContent = '♪ Tạm dừng';
        } catch (error) {
            console.log('Không thể dừng nhạc');
        }
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % MUSIC_PLAYLIST.length;
    if (currentMusic) {
        currentMusic.src = MUSIC_PLAYLIST[currentSongIndex];
        if (isMusicPlaying) {
            currentMusic.play();
        }
        updateMusicDisplay();
    }
}

function updateMusicDisplay() {
    const currentSongElement = document.getElementById('currentSong');
    const songName = MUSIC_PLAYLIST[currentSongIndex].split('/').pop().replace('.mp3', '');
    currentSongElement.textContent = `♪ ${songName}`;
}

function setVolume(value) {
    try {
        if (currentMusic) {
            currentMusic.volume = value / 100;
        }
    } catch (error) {
        console.log('Không thể điều chỉnh âm lượng');
    }
}

// ===== QUOTES MANAGEMENT =====
function initializeQuotes() {
    currentQuoteIndex = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
    document.getElementById('motivationQuote').textContent = MOTIVATION_QUOTES[currentQuoteIndex];
}

function changeMotivationQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % MOTIVATION_QUOTES.length;
    const quoteElement = document.getElementById('motivationQuote');
    
    // Fade out
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        quoteElement.textContent = MOTIVATION_QUOTES[currentQuoteIndex];
        // Fade in
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
    }, 500);
}

// ===== EXAM COUNTDOWN =====
function startExamCountdown() {
    updateExamCountdown();
}

function updateExamCountdown() {
    const now = new Date();
    const timeLeft = EXAM_DATE - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse effect when less than 30 days
        if (days < 30) {
            document.getElementById('countdown').classList.add('pulse');
        }
        
    } else {
        document.getElementById('countdown').innerHTML = 
            '<div class="time-unit glow"><span class="time-value">🎉</span><span class="time-label">Đã Đến Ngày Thi!</span></div>';
    }
}

function updateProgressBar() {
    const now = new Date();
    const totalTime = EXAM_DATE - START_DATE;
    const elapsedTime = now - START_DATE;
    const progress = Math.min((elapsedTime / totalTime) * 100, 100);
    
    document.getElementById('progressFill').style.width = progress + '%';
    
    const daysLeft = Math.ceil((EXAM_DATE - now) / (1000 * 60 * 60 * 24));
    document.getElementById('progressText').textContent = 
        `Còn ${daysLeft} ngày | Tiến độ: ${progress.toFixed(1)}%`;
}

// ===== NAVIGATION =====
function showSection(section) {
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Hide all sections
    document.getElementById('examSection').style.display = 'none';
    document.getElementById('studySection').style.display = 'none';
    
    if (section === 'exam') {
        document.getElementById('examSection').style.display = 'block';
        document.querySelector('[onclick="showSection(\'exam\')"]').classList.add('active');
    } else if (section === 'study') {
        document.getElementById('studySection').style.display = 'block';
        document.querySelector('[onclick="showSection(\'study\')"]').classList.add('active');
    }
}

// ===== STUDY TIMER =====
function setPresetTime(minutes, seconds) {
    studyTime = minutes * 60 + seconds;
    currentStudyTime = studyTime;
    updateTimerDisplay();
    
    // Update active preset
    document.querySelectorAll('.time-preset').forEach(preset => preset.classList.remove('active'));
    event.target.classList.add('active');
}

function setCustomTime() {
    const minutes = parseInt(document.getElementById('customMinutes').value) || 25;
    const seconds = parseInt(document.getElementById('customSeconds').value) || 0;
    
    studyTime = minutes * 60 + seconds;
    currentStudyTime = studyTime;
    updateTimerDisplay();
    
    // Remove active from presets
    document.querySelectorAll('.time-preset').forEach(preset => preset.classList.remove('active'));
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentStudyTime / 60);
    const seconds = currentStudyTime % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isTimerRunning && currentStudyTime > 0) {
        // Request notification permission only when user starts studying
        requestNotificationPermission();
        
        isTimerRunning = true;
        document.getElementById('timerDisplay').classList.add('pulse');
        
        studyTimer = setInterval(() => {
            currentStudyTime--;
            updateTimerDisplay();
            
            if (currentStudyTime <= 0) {
                // Timer finished
                clearInterval(studyTimer);
                isTimerRunning = false;
                document.getElementById('timerDisplay').classList.remove('pulse');
                document.getElementById('timerDisplay').classList.add('glow');
                
                // Complete study session
                completeStudySession();
                
                // Reset timer
                currentStudyTime = studyTime;
                updateTimerDisplay();
                document.getElementById('timerDisplay').classList.remove('glow');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(studyTimer);
        isTimerRunning = false;
        document.getElementById('timerDisplay').classList.remove('pulse');
    }
}

function resetTimer() {
    clearInterval(studyTimer);
    isTimerRunning = false;
    currentStudyTime = studyTime;
    updateTimerDisplay();
    document.getElementById('timerDisplay').classList.remove('pulse', 'glow');
}

// ===== STUDY METHODS =====
function showMethod(methodId) {
    // Remove active class from all tabs
    document.querySelectorAll('.method-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.method-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(methodId).classList.add('active');
}

// ===== NOTIFICATION SYSTEM =====
function requestNotificationPermission() {
    if ('Notification' in window && !notificationPermissionRequested) {
        notificationPermissionRequested = true;
        Notification.requestPermission();
    }
}

function showBrowserNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: '🎓',
            badge: '⭐'
        });
    }
}

function showInPageNotification(encouragement) {
    // Update notification content
    document.getElementById('notificationIcon').textContent = encouragement.icon;
    document.getElementById('notificationTitle').textContent = encouragement.title;
    document.getElementById('notificationMessage').textContent = encouragement.message;
    
    // Update stats
    const completedMinutes = Math.floor(studyTime / 60);
    const completedSeconds = studyTime % 60;
    const timeText = completedSeconds > 0 ? `${completedMinutes} phút ${completedSeconds} giây` : `${completedMinutes} phút`;
    
    document.getElementById('completedTime').textContent = timeText;
    document.getElementById('sessionCount').textContent = studySessionsToday;
    document.getElementById('totalTime').textContent = `${Math.floor(totalStudyTime / 60)} phút`;
    
    // Show notification overlay
    document.getElementById('notificationOverlay').style.display = 'flex';
    
    // Also show browser notification if permission granted
    showBrowserNotification(encouragement.title, encouragement.message);
}

function closeNotification() {
    document.getElementById('notificationOverlay').style.display = 'none';
}

function continueStudying() {
    document.getElementById('notificationOverlay').style.display = 'none';
    // Auto start new session
    setTimeout(() => {
        startTimer();
    }, 1000);
}

function completeStudySession() {
    // Track session
    studySessionsToday++;
    totalStudyTime += studyTime;
    
    // Show random encouragement
    const randomEncouragement = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    showInPageNotification(randomEncouragement);
    
    console.log(`Phiên học hôm nay: ${studySessionsToday}, Tổng thời gian: ${Math.floor(totalStudyTime/60)} phút`);
}

// ===== ADDITIONAL EFFECTS =====
// Mouse movement effect for floating shapes
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index % 3 + 1) * 0.01;
        const x = (e.clientX * speed) % window.innerWidth;
        const y = (e.clientY * speed) % window.innerHeight;
        
        shape.style.transform += ` translate(${x * 0.01}px, ${y * 0.01}px)`;
    });
});

console.log('🎓 Hệ thống học tập THPT đã sẵn sàng!'); 