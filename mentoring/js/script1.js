var swiper1 = new Swiper("#list1", {
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
        nextEl: "#btnN1",
        prevEl: "#btnP1",
    },
    pagination: {
        el: "#btn1",
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