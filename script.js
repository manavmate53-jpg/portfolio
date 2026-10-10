document.addEventListener('DOMContentLoaded', function () {
  // Toggle All Teardowns
  const toggleBtn = document.getElementById('toggleTeardownsBtn');
  const toggleText = document.getElementById('toggleTeardownsText');
  const toggleChevron = document.getElementById('toggleChevron');
  const allTeardownsGrid = document.getElementById('allTeardownsGrid');

  if (toggleBtn && allTeardownsGrid) {
    toggleBtn.addEventListener('click', function () {
      const isHidden = allTeardownsGrid.classList.contains('hidden');

      if (isHidden) {
        allTeardownsGrid.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleText.textContent = 'Hide teardowns list';
        if (toggleChevron) {
          toggleChevron.style.transform = 'rotate(180deg)';
        }
      } else {
        allTeardownsGrid.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleText.textContent = 'View all 13 teardowns (Spotify, Netflix, Slack, Duolingo, Superhuman, Airbnb, and more)';
        if (toggleChevron) {
          toggleChevron.style.transform = 'rotate(0deg)';
        }
      }
    });
  }

  // Toast Helper
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(function () {
      toast.classList.add('hidden');
    }, 2800);
  }

  // Copy Portfolio Link
  function copyPortfolioUrl() {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () {
        showToast('Portfolio link copied to clipboard!');
      }).catch(function () {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showToast('Portfolio link copied to clipboard!');
    } catch (err) {
      showToast('Could not copy automatically. Link: ' + text);
    }

    document.body.removeChild(textArea);
  }

  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', copyPortfolioUrl);
  }

  const copyPortfolioUrlBtn = document.getElementById('copyPortfolioUrlBtn');
  if (copyPortfolioUrlBtn) {
    copyPortfolioUrlBtn.addEventListener('click', copyPortfolioUrl);
  }
});
