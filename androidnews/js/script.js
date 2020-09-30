document.addEventListener('DOMContentLoaded', () => {

    //ready
    document.querySelector('body').classList.remove('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    const fakeLinks = document.querySelectorAll('a[href="#"]');

    for (let value of fakeLinks) {
        value.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    //------------------------------------------------------------------------//

}); //DOMContentLoaded

