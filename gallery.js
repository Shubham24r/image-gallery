document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const localImagesInput = document.getElementById('local-images');
    const gallery = document.querySelector('.gallery');

    let currentIndex = 0;
    let galleryItems = [];

    function showLightbox(index) {
        currentIndex = index;
        lightbox.style.display = 'block';
        lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    }

    function updateGalleryItems() {
        galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    }

    function createGalleryItem(src, alt, category = 'all') {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.setAttribute('data-category', category);
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        div.appendChild(img);
        div.addEventListener('click', () => {
            updateGalleryItems();
            const index = galleryItems.indexOf(div);
            if (index !== -1) {
                showLightbox(index);
            }
        });
        return div;
    }

    localImagesInput.addEventListener('change', (event) => {
        const files = Array.from(event.target.files);
        gallery.innerHTML = ''; // Clear existing images
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                const galleryItem = createGalleryItem(url, file.name);
                gallery.appendChild(galleryItem);
            }
        });
        updateGalleryItems();
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
