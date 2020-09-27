document.addEventListener('DOMContentLoaded', function() {
    
    AOS.init();
    smoothie();
    const navbar = this.querySelector(".main__header");
    const landing = this.querySelector(".first__section");
    const burger = this.querySelector(".burger");
    const menu = this.querySelector(".header__nav__cnt")
    const links = this.querySelectorAll(".header__nav a");
    let landingHeight = landing.clientHeight;
    let canHover = window.matchMedia('(hover: hover)').matches; 
    const flipBox = [...this.querySelectorAll(".offers__box")];
    window.addEventListener('resize', () => {
        landingHeight = landing.clientHeight;
        canHover = window.matchMedia('(hover: hover)').matches; 
    });

    window.addEventListener('scroll', function(){
        if(this.pageYOffset >= landingHeight){
            navbar.classList.add("sticky");
        } 
    });

    burger.addEventListener('click', function(){
        menu.classList.toggle("open");
        this.classList.toggle("open");
    });

    if(!canHover){
        flipBox.forEach(el => {
            el.addEventListener('click', function() {
                this.children[0].classList.toggle("flipped");
            })
        })
    }

    links.forEach(el => {
        el.addEventListener('click', () => {
            if(!canHover){
                menu.classList.remove("open");
                burger.classList.remove("open");
            }
        })
    })

    const carousel = this.querySelector('.carousel');
    const instances = M.Carousel.init(carousel, {
        duration: 200,
        numVisible: 5,
        dist: 0,
        padding: 50,
    });
    if(carousel){
        const interval = setInterval(() => instances.next(), 5000);
    }
    let formState = {
        email: false,
        name: false,
        message: false,
        legal: false
    };
    const checkEmail = (e) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regex.test(e.target.value)){
            formState.email = true;
            e.target.parentElement.classList.add("success");
            e.target.parentElement.classList.remove("error");
            e.target.parentElement.nextElementSibling.classList.remove("error__text__shown");
        } else {
            formState.email = false;
            e.target.parentElement.classList.remove("success");
            e.target.parentElement.classList.add("error");
            e.target.parentElement.nextElementSibling.classList.add("error__text__shown");
        }
    }
    const checkInputLength = (e, len, field) => {
        if(e.target.value.length >= len) {
            formState[field] = true;
            e.target.parentElement.classList.add("success");
            e.target.parentElement.classList.remove("error");
            e.target.parentElement.nextElementSibling.classList.remove("error__text__shown");
        } else {
            formState[field] = false;
            e.target.parentElement.classList.remove("success");
            e.target.parentElement.classList.add("error");
            e.target.parentElement.nextElementSibling.classList.add("error__text__shown");
        }
    }
    const isChecked = (el, field) => {
        if(el.checked) {
            formState[field] = true;
            el.parentElement.classList.add("success");
            el.parentElement.classList.remove("error");
            el.parentElement.nextElementSibling.classList.remove("error__text__shown");
        } else {
            formState[field] = false;
            el.parentElement.classList.remove("success");
            el.parentElement.classList.add("error");
            el.parentElement.nextElementSibling.classList.add("error__text__shown");
        }
    }
    const form = this.querySelector("form");
    const inps = form.querySelectorAll("input");
    const txtArea = form.querySelector("textarea");
    inps[0].addEventListener('keypress', function(e){
        checkEmail(e);
    });
    inps[1].addEventListener('keypress', function(e){
        checkInputLength(e, 3, "name");
    });
    txtArea.addEventListener('keypress', function(e){
        checkInputLength(e, 10, "message");
    });
    form.addEventListener('submit', function(event){
        event.preventDefault();
        isChecked(inps[2], "legal");
        if(formState.email && formState.name && formState.message && formState.legal){
            console.log("można wysyłać");
        } else {
            console.log("błędnie wypełniony formularz");
        }
    })
});