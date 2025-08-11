// Дополнительные эффекты для терминала
document.addEventListener('DOMContentLoaded', () => {
  // Эффект печатающегося текста для первых строк
  const initialLines = document.querySelectorAll('.terminal-line');
  
  initialLines.forEach((line, index) => {
    if (index < 3) { // Первые 3 строки
      const text = line.textContent;
      line.textContent = '';
      
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 50 + Math.random() * 50);
    }
  });
  
  // Эффект наведения на кнопки терминала
  const terminalButtons = document.querySelectorAll('.terminal-btn');
  
  terminalButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.2)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });
});