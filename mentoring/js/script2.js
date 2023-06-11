var swiper2 = new Swiper("#list2", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 10,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: "#btnN2",
        prevEl: "#btnP2",
    },
    pagination: {
        el: "#btn2",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
        1500: {
            slidesPerView: 4,
        },
        2000: {
            slidesPerView: 5,
        }
    },
    });