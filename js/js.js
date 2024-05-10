$(function () {
    // Обработчик JSON
    $.getJSON("./json/data.json", function (data) {

        $.each(data, function (key, value) {
            $(".list-group").append(`
            <li class="list-group-item">
                <div class="personData__container">
                    <div class="personData">
                        <img src="`+ (value.foto ? value.foto : "./content/nofoto.png") + `"
                            class="personFoto" alt="...">
                    </div>
                </div>
                <svg class="arrow arrow_item" width="40" height="40" class="bi bi-chevron-double-down"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    <path fill-rule="evenodd"
                        d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
            </li>
            `)
            $.each(value.data, function (key, value) {
                $(".personData:last").append(`
                <div class="personInfo__container">
                `+ (value.length > 3 ?
                        `<svg class="arrow arrow_data" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>`: ""
                    ) + `
                    <div class="personInfo">
                        <span class="personTitle">${key}:</span>
                    </div>
                </div>
                `)
                $.each(value, function (key, value) {
                    $(".personInfo:last").append(`
                        <p class="personGen `+ (key > 2 ? "hideElement" : "") + `">&nbsp;&bull; ${value}</p>
                    `)
                })
                if (value.length > 3) {
                    $(".personInfo:last").append(`
                        <p class="lastPersonGen">...</p>
                    `)
                }
            })

        })
    })

    // Обработчик увеличения фото
    $(".list-group").on("click", ".personFoto", function () {
        $(this).toggleClass("fotoWidth")
        if ($(this).hasClass("fotoWidth")) {
            $(this).css("left", `${50 - ($(this).width()*100) / (2*document.documentElement.clientWidth)}vw`)
            $(this).css("top", `calc(${50 - ($(this).height()*100) / (2*document.documentElement.clientHeight)}vh + ${window.scrollY}px)`)
            $("body").css("overflow", "hidden")
            $(".backgroundFone").css("display", "block")
        } else {
            $(this).css("left", `0`)
            $(this).css("top", `0`)
            $("body").css("overflow", "unset")
            $(".backgroundFone").css("display", "none")
        }
    })
    $(".backgroundFone").click(function () {
        $(".fotoWidth").css("left", `0`)
        $(".fotoWidth").css("top", `0`)
        $(".fotoWidth").removeClass("fotoWidth")
        $("body").css("overflow", "unset")
        $(".backgroundFone").css("display", "none")
    })

    $(".list-group").on("click", ".arrow_data", function () {
        // Обработчик появления
        $(this).parent().children(".personInfo").children(".hideElement").toggleClass("noHideElement")
        $(this).parent().children(".personInfo").children(".lastPersonGen").toggle()
        // Обработик стрелки
        $(this).parent().children(".personInfo").toggleClass("rotateArrow")
        if ($(this).parent().children(".personInfo").hasClass("rotateArrow")) {
            $(this).parent().children(".arrow").css("rotate", "180deg")
        } else {
            $(this).parent().children(".arrow").css("rotate", "0deg")
        }

    })

    // Обработчик стрелки item
    $(".list-group").on("click", ".arrow_item", function () {
        $(this).parent().children(".personData__container").toggleClass("personData__containerHelpclass")
        if ($(this).parent().children(".personData__container").hasClass("personData__containerHelpclass")) {
            $(this).parent().children(".arrow").css("rotate", "180deg")
        } else {
            $(this).parent().children(".arrow").css("rotate", "0deg")
        }
    })
    // Обработчик стрелок по body
    $("body").click(function (e) {
        if (e.target.tagName == "BODY") {
            $(".hideElement").removeClass("noHideElement")
            $(".lastPersonGen").show()
            $(".personInfo").removeClass("rotateArrow")
            $(".arrow_data").css("rotate", "0deg")
            $(".arrow_item").css("rotate", "0deg")
            $(".personData__containerHelpclass").removeClass("personData__containerHelpclass")
        }
    })


})