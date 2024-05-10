$(function () {
    // Обработчик JSON
    $.getJSON("./json/data.json", function (data) {

        $.each(data, function (key, value) {
            $(".list-group").append(`
            <li class="list-group-item">
                <div class="personData__container">
                    <div class="personData">
                        <img src="`+ (value.foto ? value.foto : "./content/nofoto.png") + `"
                            class="img-fluid rounded personFoto" alt="...">
                    </div>
                </div>
                <svg class="arrow arrow_item" width="30" height="30" class="bi bi-chevron-double-down"
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
                    <div class="personInfo `+ (value.length > 3 ? "infoPointer" : "") + `">
                        <span class="personTitle">${key}:</span>
                    </div>
                </div>
                `)
                $.each(value, function (key, value) {
                    $(".personInfo:last").append(`
                        <p class="personGen `+ (key > 2 ? "hideElement" : "") + `">${value}</p>
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
            $(this).css("left", `${50 - ($(this).width() * 100) / (2 * $("html").width())}%`)
            $(this).css("top", `${50 - ($(this).height() * 100) / (2 * $("html").height())}%`)
            $(".backgroundFone").css("display", "block")
        } else {
            $(this).css("left", `0`)
            $(this).css("top", `0`)
            $(".backgroundFone").css("display", "none")
        }
    })
    $(".backgroundFone").click(function () {
        $(".fotoWidth").css("left", `0`)
        $(".fotoWidth").css("top", `0`)
        $(".fotoWidth").removeClass("fotoWidth")
        $(".backgroundFone").css("display", "none")
    })

    // 

    // Обработчик открытия более 4 li data
    $(".list-group").on("click", ".personInfo__container", function (e) {
        if (!e.target.classList.contains('personInfo__container')) {
            // Обработчик появления
            $(this).children(".personInfo").children(".hideElement").toggleClass("noHideElement")
            $(this).children(".personInfo").children(".lastPersonGen").toggle()
            // Обработик стрелки
            $(this).children(".personInfo").toggleClass("rotateArrow")
            if ($(this).children(".personInfo").hasClass("rotateArrow")) {
                $(this).children(".arrow").css("rotate", "180deg")
            } else {
                $(this).children(".arrow").css("rotate", "0deg")
            }
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
    $("body").click(function (e) {
        if (e.target.tagName == "BODY") {
            $(".personData__containerHelpclass + .arrow").css("rotate", "0deg")
            $(".personData__containerHelpclass").removeClass("personData__containerHelpclass")
        }
    })


})