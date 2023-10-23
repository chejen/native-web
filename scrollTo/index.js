window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 150 });

    // The layout won't shift even if the new elements are added from now on.
    const topAtTimeA = document.body.getBoundingClientRect().top;
    const div = document.createElement('div');
    div.classList.add('base', 'b-blue', 'm-20');
    document.querySelector('.b-red').appendChild(div);
    const topAtTimeB = document.body.getBoundingClientRect().top;
    // topAtTimeA & topAtTimeB won't be the same.
    console.log({ topAtTimeA, topAtTimeB });
  }, 50);
});
