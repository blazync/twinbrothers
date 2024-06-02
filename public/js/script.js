//  Initialize Swiper
let swiper = new Swiper(".mySwiper", {
  effect: "cards",
  zoom:true,
 grabCursor: true,
 cubeEffect: {
   shadow: true,
   slideShadows: true,
   shadowOffset: 20,
   shadowScale: 0.94,
 },
 pagination: {
   el: ".swiper-pagination",
 },
});


// For Gallary Section Model
document.addEventListener('DOMContentLoaded', () => {
        const gridItems = document.querySelectorAll('.grid-item img, .grid-item iframe');
        gridItems.forEach(item => {
            item.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = ''; // Clear previous content
                if (item.tagName === 'IMG') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    modalContent.appendChild(img);
                } else if (item.tagName === 'IFRAME') {
                    const iframe = document.createElement('iframe');
                    iframe.src = item.src;
                    modalContent.appendChild(iframe);
                }
                modal.style.display = 'flex';
            });
        });
    });

    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }