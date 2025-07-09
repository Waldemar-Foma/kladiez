document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const terminal = document.getElementById('terminal');
  
  // Simulate terminal output
  const terminalLines = [
    "> Проверка подключения... УСПЕШНО",
    "> Загрузка модулей...",
    "> Модуль 1: Загружен",
    "> Модуль 2: Загружен",
    "> Готово к работе"
  ];
  
  let currentProgress = 0;
  const targetProgress = 40;
  const progressInterval = setInterval(() => {
    currentProgress += 1;
    progressFill.style.width = `${currentProgress}%`;
    progressText.textContent = `${currentProgress}%`;
    
    // Add new terminal lines at certain progress points
    if (currentProgress === 20) {
      addTerminalLine(terminalLines[0]);
    } else if (currentProgress === 35) {
      addTerminalLine(terminalLines[1]);
    } else if (currentProgress === 50) {
      addTerminalLine(terminalLines[2]);
      addTerminalLine(terminalLines[3]);
      addTerminalLine(terminalLines[4]);
    } else if (currentProgress === 70) {
      addTerminalLine(terminalLines[5]);
    }
    
    if (currentProgress >= targetProgress) {
      clearInterval(progressInterval);
      setTimeout(() => {
        addTerminalLine(terminalLines[6]);
      }, 500);
    }
  }, 50);
  
  function addTerminalLine(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    terminal.insertBefore(line, terminal.lastElementChild);
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Blinking cursor effect
  setInterval(() => {
    const cursor = document.querySelector('.blink');
    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }, 500);
});