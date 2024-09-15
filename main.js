/**
 * Check if string is a number
 * @param {string} value
 * @returns {boolean}
 */
function isNumber(value) {
  return /^([0-9]*)(\.\d+)?$/.test(value);
}

window.onload = () => {
  const progress = document.querySelector(".progress");
  const progIndicator = document.querySelector(".progress__indicator");
  const valueInput = document.querySelector(".value-input");
  const animateInput = document.querySelector(".animate-input");
  const hideInput = document.querySelector(".hidden-input");

  /**
   * Set attributes to show progress indicator
   * @param {number} value
   */
  function setIndicatorAttrs(value) {
    const strokeLength = progIndicator.getTotalLength();

    progIndicator.setAttribute(
      "stroke-dasharray",
      `${(strokeLength * value) / 100} ${(strokeLength * (100 - value)) / 100}`
    );
  }

  /**
   * @param {InputEvent} e
   */
  function handleInput(e) {
    const value = +e.target.value;

    if (!isNumber(e.target.value)) {
      e.target.value = 0;
    } else if (value < 0) {
      e.target.value = 0;
    } else if (value > 100) {
      e.target.value = 100;
    } else {
      e.target.value = value;
    }

    progress.dataset.value = +e.target.value;
  }

  /**
   * @param {InputEvent} e
   */
  function handleAnimate(e) {
    if (e.target.checked) {
      progress.dataset.state = "animate";
      hideInput.checked = false;
    } else {
      progress.dataset.state = "normal";
    }
  }

  /**
   * @param {InputEvent} e
   */
  function handleHide(e) {
    if (e.target.checked) {
      progress.dataset.state = "hidden";
      animateInput.checked = false;
    } else {
      progress.dataset.state = "normal";
    }
  }

  // Register event listeners
  if (progress && progIndicator && valueInput && animateInput && hideInput) {
    valueInput.addEventListener("input", handleInput);
    animateInput.addEventListener("input", handleAnimate);
    hideInput.addEventListener("input", handleHide);

    const value = progress.dataset.value;

    if (value && isNumber(value)) {
      setIndicatorAttrs(+value);
      valueInput.value = +value;
    } else {
      setIndicatorAttrs(0);
      valueInput.value = 0;
    }

    if (animateInput.checked) {
      progress.dataset.state = "animate";
    } else if (hideInput.checked) {
      progress.dataset.state = "hidden";
    }

    new MutationObserver((mutationRecords) => {
      const value = mutationRecords[0].target.dataset.value;

      if (value && isNumber(value)) {
        setIndicatorAttrs(+value);
      } else {
        setIndicatorAttrs(0);
      }
    }).observe(progress, {
      attributes: true,
    });
  } else {
    console.error("Элементы не найдены!");
  }
};
